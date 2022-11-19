import { useMutation, useQueryClient } from 'react-query';

import { fetchWithError } from '../helpers';
import { StatusSelect } from '.';

export function IssueStatus({ status, issueNumber }) {
  const queryClient = useQueryClient();

  const statusQueryKey = ['issues', issueNumber];
  const setStatus = useMutation(
    () => {
      fetchWithError(`/api/issues/${issueNumber}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    },
    {
      onMutate: (status) => {
        const oldStatus = queryClient.getQueryData(statusQueryKey).status;

        queryClient.setQueryData(statusQueryKey, (data) => ({ ...data, status }));

        return function rollback() {
          queryClient.setQueryData(statusQueryKey, (data) => ({ ...data, status: oldStatus }));
        };
      },
      onError: (error, variables, rollback) => {
        rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries(statusQueryKey, { exact: true });
      },
    },
  );

  return (
    <div className="issue-options">
      <span>Status</span>
      <StatusSelect
        noEmptyOption
        value={status}
        onChange={(event) => setStatus.mutate(event.target.value)}
      />
    </div>
  );
}
