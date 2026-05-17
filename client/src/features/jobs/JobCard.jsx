import { memo } from "react";

function JobCardComponent({ index, job }) {
  return (
    <div className="job-card">
      <strong>Request {index + 1}</strong>
      <span className={job?.status === "completed" ? "done" : "pending"}>
        {job?.result || job?.status || "waiting"}
      </span>
    </div>
  );
}

export const JobCard = memo(JobCardComponent);
