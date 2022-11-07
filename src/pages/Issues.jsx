import { useState } from 'react';
import { IssuesList, LabelList } from '../components';

export default function Issues() {
  const [labels, setLabels] = useState([]);

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={labels} />
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
        </aside>
      </main>
    </div>
  );
}
