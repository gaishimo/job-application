import express from "express"
import cors from "cors"
const app = express()

app.use(cors({ origin: true }))
app.use(express.json())

app.post("/", (req, res) => {
  console.log(JSON.stringify(req.body))
  res.send("ok")
})

export default app
