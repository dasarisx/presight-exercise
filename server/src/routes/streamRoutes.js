const express = require("express");
const { createLongText } = require("../services/streamService");

function createStreamRouter() {
  const router = express.Router();

  router.get("/", (req, res) => {
    const text = createLongText();
    let index = 0;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");

    const interval = setInterval(() => {
      if (index >= text.length) {
        clearInterval(interval);
        res.end();
        return;
      }

      res.write(text.slice(index, index + 48));
      index += 48;
    }, 45);

    req.on("close", () => clearInterval(interval));
  });

  return router;
}

module.exports = {
  createStreamRouter,
};
