const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "hirunews",
    desc: "Get hiru news",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

const response = await axios.get('https://www.hirunews.lk/')
const $ = cheerio.load(response.data)

const title = $('body > div:nth-child(20) > div.row > div.col-sm-12.col-md-12.col-lg-6.section.order-lg-2.order-md-1.order-sm-1.order-1 > div > div.today-video').text()

console.log(title)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

