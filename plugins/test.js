const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "test",
    desc: "Test",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return
if(!isOwner) return
    
let response = await axios.get(`https://www.pornhub.com/`)
let $ = cheerio.load(response.data)
const url = $('#v459721591 > div > div.phimage > a').text()

console.log(url)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
