const express = require("express");

function createJobRouter() {
  const router = express.Router();

  router.post("/", (req, res) => {
    const job = req.app.locals.jobs.enqueue(req.body?.label);
    res.status(202).json(job);
  });

  return router;
}

module.exports = {
  createJobRouter,
};
