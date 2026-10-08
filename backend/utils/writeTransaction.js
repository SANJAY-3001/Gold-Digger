import fs from "node:fs/promises"
import path from "node:path"


export const writeTransaction = async(payload) => {

    const data = JSON.parse(payload)
    const text = Object.entries(data.payload)
                .map(([key , value]) => {
                    return `${key} : ${value}`
                }).join(" , ")

    try {
        const filePath = path.join('data' , 'transactions.txt')
        await fs.appendFile(filePath , text + "\n" , 'utf-8')
    }
    catch(err) {
        console.error(err)
    }
}