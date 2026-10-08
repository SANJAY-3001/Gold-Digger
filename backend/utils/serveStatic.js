import path from "node:path"
import fs from "node:fs/promises"
import mimeType from  "mime-types"
import { sendResponse } from "./sendResponse.js"


export const serveStatic = async(req , res , baseDir) => {

    try {
        const filePathForHtml = path.join(baseDir , '../frontend' ,  req.url === '/' ? 'index.html' : req.url)
        const htmlPage = await fs.readFile(filePathForHtml)

        const extName = path.extname(filePathForHtml)

        const contentType = mimeType.lookup(extName)

        sendResponse(res , 200 , contentType , htmlPage)
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            const filePathFor404Html = path.join(baseDir , '../frontend' , '404.html')

            const html404Page = await fs.readFile(filePathFor404Html)
            sendResponse(res , 404 , 'text/html' , html404Page)
        }
    }
}
