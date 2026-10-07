
function start() {
    const eventSource = new EventSource('/api')
    const priceDisplay = document.getElementById("price-display")

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const goldPrice = data.goldPrice

        priceDisplay.textContent = goldPrice
    }

    eventSource.onerror = () => {
        console.log("Connection lost...")
    }
}

start()
