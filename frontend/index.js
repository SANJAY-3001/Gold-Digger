
const priceDisplay = document.getElementById("price-display")
const dialog = document.getElementById("outputs")

async function start() {
    // SSE
    getLiveGoldPrice()

    // Post
    const investBtn = document.getElementById("invest-btn")
    investBtn.addEventListener('click' , investGold)

    const okBtn = document.getElementById("ok-btn")
    okBtn.addEventListener('click' , () => dialog.close())
}


function getLiveGoldPrice() {
    const eventSource = new EventSource('/api')
    const connectionStatus = document.getElementById("connection-status")

    eventSource.onmessage = (event) => {
        
        const data = JSON.parse(event.data)
        const goldPrice = data.goldPrice
        priceDisplay.textContent = goldPrice
        connectionStatus.textContent = `Live Price 🟢`
    }

    eventSource.onerror = () => {
        priceDisplay.textContent = `----.--`
        connectionStatus.textContent = `Disconnected 🔴`
        console.log("Connection lost...")
    }

   
}

async function investGold() {
    console.log("submitted")
    const investmentAmount = Number(document.getElementById("investment-amount").value)
    const currentPrice = Number(priceDisplay.textContent)

    const payload = {
        currentTimeAndDate : new Date(),
        amountPaid : `₹ ${investmentAmount}`,
        pricePerGram : `₹ ${currentPrice}`,
        goldSold : `${calulateGrams(investmentAmount , currentPrice)} grams`
    }

    try {
        const res = await fetch("/api" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({payload})
        })

        const data = await res.json()

        console.log(data)

        if (!res.ok) {
            throw new Error("Failed to invest")
        }

        dialog.showModal()
        document.getElementById("grams").textContent = `${payload.goldSold} `
        document.getElementById("amount").textContent = payload.amountPaid
    }
    catch(err) {
        console.error(err)
    }
}


function calulateGrams(investmentAmount , currentPrice) {
    const grams = investmentAmount / currentPrice

    return grams.toFixed(4)
}



start()