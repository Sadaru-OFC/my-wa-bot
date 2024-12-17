const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "test2",
    desc: "cinesubz.co info",
    category: "search",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
    
let response = await axios.get(q)
let $ = cheerio.load(response.data)

const title = $('title').text()
const size = $('#box > div.download-section > p:nth-child(3) > span').text()
    
let msg = `*Name :* ${title}

*Size :* ${size}`

console.log(msg)
await reply(msg)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
