import { generateGoldPrice } from "../utils/generateGoldPrice.js"
import { sendResponse } from "../utils/sendResponse.js"


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