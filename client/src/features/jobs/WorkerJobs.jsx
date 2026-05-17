import { memo } from "react";
import { SectionHeader } from "../../components/SectionHeader";
import { JobCard } from "./JobCard";
import { useWorkerJobs } from "./useWorkerJobs";

function WorkerJobsComponent() {
  const { jobs, requestCount, createJobs } = useWorkerJobs();
  const action = <button onClick={createJobs}>Send 20 requests</button>;

  return (
    <section className="panel">
      <SectionHeader title="Worker Queue" action={action} />
      <div className="job-grid">
        {Array.from({ length: requestCount }, (_, index) => (
          <JobCard index={index} job={jobs[index]} key={index} />
        ))}
      </div>
    </section>
  );
}

export const WorkerJobs = memo(WorkerJobsComponent);
