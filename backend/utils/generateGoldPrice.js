
let goldPrice = 7500
export const generateGoldPrice = async() => {
    const change = (Math.random() * 20) - 10

    goldPrice += change

    goldPrice = Math.round(goldPrice * 100) / 100

    return goldPrice
}