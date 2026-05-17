const express = require("express");
const { getFacets } = require("../services/peopleService");

function createFacetsRouter() {
  const router = express.Router();

  router.get("/", (_req, res) => {
    res.json(getFacets());
  });

  return router;
}

module.exports = {
  createFacetsRouter,
};
