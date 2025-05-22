const path = require("path");
const express = require("express");
const cors = require("cors");
// const compression = require('compression');
const generateCandidates = require("./generateCandidates.cjs");

const CANDIDATE_COUNT = 100;
const app = express();
const data = generateCandidates(CANDIDATE_COUNT);

app.use(cors());

app.get("/data", (req, res) => {
  res.json(data);
});

app.use("/images", express.static(path.join(__dirname, "./assets")));

app.use((req, res) =>
  res.send("<html><body><pre>FE Challenge API Running</pre></body></html>"),
);

app.use((err, req, res) => {
  res.status(500).send({
    status: 500,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(3003, () => {
  console.log("Listening on http://localhost:3003");
});
