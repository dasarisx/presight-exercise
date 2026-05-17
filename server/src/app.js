const express = require("express");
const cors = require("cors");
const { createFacetsRouter } = require("./routes/facetsRoutes");
const { createPeopleRouter } = require("./routes/peopleRoutes");
const { createStreamRouter } = require("./routes/streamRoutes");
const { createJobRouter } = require("./routes/jobRoutes");

function createApp({ clientOrigin }) {
  const app = express();

  app.use(cors({ origin: clientOrigin }));
  app.use(express.json());

  app.use("/api/people", createPeopleRouter());
  app.use("/api/facets", createFacetsRouter());
  app.use("/api/stream", createStreamRouter());
  app.use("/api/jobs", createJobRouter());

  return app;
}

module.exports = {
  createApp,
};
