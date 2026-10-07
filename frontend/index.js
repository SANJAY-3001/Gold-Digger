
async function start() {
    // SSE
    getLiveGoldPrice()

    // Post
    const investBtn = document.getElementById("invest-btn")
    investBtn.addEventListener('click' , investGold)

}


function getLiveGoldPrice() {
    const eventSource = new EventSource('/api')
    const priceDisplay = document.getElementById("price-display")
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

    try {
        const res = await fetch("/api" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({investmentAmount})
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error("Failed to invest")
        }
    }
    catch(err) {
        console.error(err)
    }
}



start()