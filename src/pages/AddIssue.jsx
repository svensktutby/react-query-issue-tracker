import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { fetchWithError } from '../helpers';

export default function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addIssue = useMutation(
    (issueBody) =>
      fetchWithError(`/api/issues/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(issueBody),
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['issues'], { exact: true });
        queryClient.setQueryData(['issues', data.number.toString()], data);
        navigate(`/issue/${data.number}`);
      },
    },
  );

  return (
    <div className="add-issue">
      <h2>Add Issue</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const { value: title } = event.target.title;
          const { value: comment } = event.target.comment;

          if (addIssue.isLoading || !title || !comment) return;

          addIssue.mutate({ title, comment });
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Title" name="title" />
        <label htmlFor="comment">Comment</label>
        <textarea placeholder="Comment" id="comment" name="comment" />
        <button type="submit" disabled={addIssue.isLoading}>
          {addIssue.isLoading ? 'Adding Issue...' : 'Add Issue'}
        </button>
      </form>
    </div>
  );
}
