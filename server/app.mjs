// eslint-disable-next-line no-undef
import express from "express"
import { readFileSync, writeFileSync } from "fs"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())
const port = 3000

app.get("/state/get", async (req, res) => {
    try {
        const result = await readFileSync(`overlay-state.json`, "utf8")
        res.send(JSON.parse(result))
    } catch (err) {
        console.error(err)
        res.status(500).send("Error reading state")
    }
})

app.post("/state/post", async (req, res) => {
    try {
        await writeFileSync(`overlay-state.json`, JSON.stringify(req.body, null, 2))

        const result = await readFileSync(`overlay-state.json`, "utf8")
        res.send(JSON.parse(result))
    } catch (err) {
        console.error(err)
        res.status(500).send("Error saving state")
    }
})

app.listen(port, () => {
    console.log(`Overlay state server listening on port ${port}`)
})
