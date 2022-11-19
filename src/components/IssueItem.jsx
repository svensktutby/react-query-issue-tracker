import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { GoIssueClosed, GoIssueOpened, GoComment } from 'react-icons/go';

import { fetchWithError, relativeDate, useUserData } from '../helpers';
import { Label } from '.';

export function IssueItem({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) {
  const queryClient = useQueryClient();
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);

  return (
    <li
      onMouseEnter={() => {
        queryClient.prefetchQuery(['issues', number.toString()], () =>
          fetchWithError(`/api/issues/${number}`),
        );
        queryClient.prefetchQuery(['issues', number.toString(), 'comments'], () =>
          fetchWithError(`/api/issues/${number}/comments`),
        );
      }}
    >
      <div>
        {status === 'done' || status === 'cancelled' ? (
          <GoIssueClosed style={{ color: 'crimson' }} />
        ) : (
          <GoIssueOpened style={{ color: 'mediumseagreen' }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <Label key={label} label={label} />
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{' '}
          {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : ''}
        </small>
      </div>
      {assignee ? (
        <img
          src={assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : ''}
          className="assigned-to"
          alt={`Assigned to ${assigneeUser.isSuccess ? assigneeUser.data.name : 'avatar'}`}
        />
      ) : null}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment />
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
}
