const path = require("path")
const express = require("express")
const cors = require("cors")

const app = express()
const mockCandidates = require("../test-utils/mock-candidates")

const data = mockCandidates(process.env.CANDIDATE_COUNT || 50000)

app.use(cors())

app.get("/data", (req, res) => {
  res.send(data)
})

app.use("/images", express.static(path.join(__dirname, "../images")))

app.use((req, res) => res.status(404).send("404 Not Found"))

app.use((req, res, err) => {
  res.status(500).send({
    status: 500,
    name: err.name,
    message: err.message,
    stack: err.stack
  })
})

app.listen(3003, () => {
  console.log("Listening on http://localhost:3003")
})
