import http from "node:http"
import { serveStatic } from "./utils/serveStatic.js"

const PORT = 3001
const __dirname = import.meta.dirname

const server = http.createServer(async(req , res) => {
    if (!req.url.startsWith('/api')) {
        console.log("hello")
        return await serveStatic(req , res , __dirname)
    }
})

server.listen(PORT , () => console.log(`Server is running on port ${PORT}`)) 