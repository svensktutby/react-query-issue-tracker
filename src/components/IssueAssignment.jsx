import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GoGear } from 'react-icons/go';

import { fetchWithError, useUserData } from '../helpers';

export function IssueAssignment({ assignee, issueNumber }) {
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useUserData(assignee);
  const usersQuery = useQuery(['users'], () => fetchWithError('/api/users'));

  const assigneeQueryKey = ['issues', issueNumber];
  const setAssignment = useMutation(
    (assignee) => {
      fetchWithError(`/api/issues/${issueNumber}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ assignee }),
      });
    },
    {
      onMutate: (assignee) => {
        const oldAssignee = queryClient.getQueryData(assigneeQueryKey).assignee;

        queryClient.setQueryData(assigneeQueryKey, (data) => ({ ...data, assignee }));

        return function rollback() {
          queryClient.setQueryData(assigneeQueryKey, (data) => ({
            ...data,
            assignee: oldAssignee,
          }));
        };
      },
      onError: (error, variables, rollback) => {
        rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries(assigneeQueryKey, { exact: true });
      },
    },
  );

  return (
    <div className="issue-options">
      <div>
        <span>Assignment</span>
        {user?.isSuccess && (
          <div>
            <img src={user.data.profilePictureUrl} />
            {user.data.name}
          </div>
        )}
      </div>
      <GoGear onClick={() => !usersQuery.isLoading && setMenuOpen((open) => !open)} />
      {menuOpen && (
        <div className="picker-menu">
          {usersQuery.data?.map((user) => (
            <div key={user.id} onClick={() => setAssignment.mutate(user.id)}>
              <img src={user.profilePictureUrl} />
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
