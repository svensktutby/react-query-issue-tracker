import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { fetchWithError, relativeDate, useUserData } from '../helpers';
import { IssueAssignment, IssueHeader, IssueStatus } from '.';

function useIssueData(issueNumber) {
  return useQuery(['issues', issueNumber], ({ signal }) => {
    return fetchWithError(`/api/issues/${issueNumber}`, { signal });
  });
}

function useIssueComments(issueNumber) {
  return useQuery(['issues', issueNumber, 'comments'], ({ signal }) => {
    return fetchWithError(`/api/issues/${issueNumber}/comments`, { signal });
  });
}

function Comment({ comment, createdBy, createdDate }) {
  const userQuery = useUserData(createdBy);

  if (userQuery.isLoading)
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="comment">
      <img src={userQuery.data.profilePictureUrl} alt="Commenter Avatar" />
      <div>
        <div className="comment-header">
          <span>{userQuery.data.name}</span> commented <span>{relativeDate(createdDate)}</span>
        </div>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  );
}

export function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueData(number);
  const commentsQuery = useIssueComments(number);

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader {...issueQuery.data} />

          <main>
            <section>
              {commentsQuery.isLoading ? (
                <p>Loading...</p>
              ) : (
                commentsQuery.data?.map((comment) => <Comment key={comment.id} {...comment} />)
              )}
            </section>
            <aside>
              <IssueStatus
                status={issueQuery.data.status}
                issueNumber={issueQuery.data.number.toString()}
              />
              <IssueAssignment
                assignee={issueQuery.data.assignee}
                issueNumber={issueQuery.data.number.toString()}
              />
            </aside>
          </main>
        </>
      )}
    </div>
  );
}
