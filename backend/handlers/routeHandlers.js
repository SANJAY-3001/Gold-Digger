import { generateGoldPrice } from "../utils/generateGoldPrice.js"
import { sendResponse } from "../utils/sendResponse.js"
import { writeTransaction } from '../utils/writeTransaction.js'


export const handleGet = async(res) => {
    try {
       res.statusCode = 200
       res.setHeader("Content-Type" , "text/event-stream")
       res.setHeader("Cache-Control" , "no-cache")
       res.setHeader("Connection" , "keep-alive")

       setInterval(async() => {
        const randomGoldPrice = await generateGoldPrice()
        
        res.write(`data: ${JSON.stringify(
            {
                event : "gold-price" ,
                goldPrice : randomGoldPrice
            }
            )}\n\n`)

       } , 3000)
    }
    catch (err) {
        console.log(err)
    }
}


export const handlePost = async(req , res) => {
    try {
        let body =''
        for await (const chunk of req) {
            body += chunk
        }
        console.log(body)

        await writeTransaction(body)

        sendResponse(res , 201 , 'application/json' , body)
    }
    catch (err) {
        console.error(err)
    }
}