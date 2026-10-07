import http from "node:http"


const PORT = 3001

const server = http.createServer((req , res) => {
    res.end("Server is running..")
})

server.listen(PORT , () => console.log(`Server is running on port ${PORT}`)) 