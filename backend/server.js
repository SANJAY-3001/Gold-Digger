import http from "node:http"
import { serveStatic } from "./utils/serveStatic.js"
import { handleGet } from "./handlers/routeHandlers.js"

const PORT = 3001
const __dirname = import.meta.dirname

const server = http.createServer(async(req , res) => {
    if (req.url === '/api') {
        if (req.method === 'GET') {
            return await handleGet(res)
        }
        else if (req.method === 'POST') {
            console.log("post")
            let body =''
            for await (const chunk of req) {
                body += chunk
            }

            console.log(body)
            return
        }
    }
    else if (!req.url.startsWith('/api')) {
        return await serveStatic(req , res , __dirname)
    }
})

server.listen(PORT , () => console.log(`Server is running on port ${PORT}`)) 