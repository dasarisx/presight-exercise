import { PeopleExplorer } from "./features/people/PeopleExplorer";
import { StreamReader } from "./features/stream/StreamReader";
import { WorkerJobs } from "./features/jobs/WorkerJobs";


export function App() {
  return (
    <>
      <PeopleExplorer />
      <div className="lower-grid">
        <StreamReader />
        <WorkerJobs />
      </div>
    </>
  );
}

