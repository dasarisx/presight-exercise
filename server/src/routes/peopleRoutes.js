const express = require("express");
const { getPeoplePage } = require("../services/peopleService");

function createPeopleRouter() {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json(getPeoplePage(req.query));
  });

  return router;
}

module.exports = {
  createPeopleRouter,
};
