const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "sindl",
    desc: "test",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
let emptyMsg = `*_Please give me a sinhalasub url._*

.sindl https://sinhalasub.lk/links/0ufiu8bbt9/`
if(!q) return reply(emptyMsg)
let response = await axios.get(q)
let $ = cheerio.load(response.data)

const url = $('#link > a').attr('href')

reply(url)
console.log(url)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

