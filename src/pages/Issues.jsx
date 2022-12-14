import { useState } from 'react';
import { Link } from 'react-router-dom';

import { IssuesList, LabelList, StatusSelect } from '../components';

export default function Issues() {
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState('');

  return (
    <div>
      <main>
        <section>
          <IssuesList labels={labels} status={status} />
        </section>
        <aside>
          <LabelList
            selected={labels}
            toggle={(label) =>
              setLabels((currentLabels) =>
                currentLabels.includes(label)
                  ? currentLabels.filter((currentLabel) => currentLabel !== label)
                  : currentLabels.concat(label),
              )
            }
          />
          <h3>Status</h3>
          <StatusSelect value={status} onChange={(event) => setStatus(event.target.value)} />
          <hr />
          <Link className="button" to="/add">
            Add Issue
          </Link>
        </aside>
      </main>
    </div>
  );
}
