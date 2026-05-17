import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { apiBase } from "../../api/client";
import { createJob } from "../../api/jobs";

const requestCount = 20;

export function useWorkerJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const socket = io(apiBase || undefined);

    socket.on("job:result", (result) => {
      setJobs((current) =>
        current.map((job) => (job.id === result.id ? { ...job, ...result } : job)),
      );
    });

    return () => socket.close();
  }, []);

  async function createJobs() {
    setJobs([]);

    const responses = await Promise.all(
      Array.from({ length: requestCount }, (_, index) => createJob(`Request ${index + 1}`)),
    );

    setJobs(responses);
  }

  return {
    jobs,
    requestCount,
    createJobs,
  };
}
