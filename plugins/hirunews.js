const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "hirunews",
    desc: "Get hirunews",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

const response = await axios.get('https://www.hirunews.lk/')
const $ = cheerio.load(response.data)

const url = $('#article-phara > p > a').attr('href')

console.log(url)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
