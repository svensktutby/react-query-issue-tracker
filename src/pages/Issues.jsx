import { IssuesList, LabelList } from '../components';

export default function Issues() {
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList />
        </section>
        <aside>
          <LabelList />
        </aside>
      </main>
    </div>
  );
}
