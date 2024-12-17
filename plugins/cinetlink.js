const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "cinetlink",
    desc: "cinesubz.co info",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
let emptyMsg = `*_Please give me a cinesubz.co dl url._*

.cinetlink https://ima04.cskinglk.xyz/server4/new/Deadpool.and.Wolverine.2024.WEBRip-%5BCineSubz.co%5D-720p?ext=mp4

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`
if(!q) return reply(emptyMsg)
    
let response = await axios.get(q)
let $ = cheerio.load(response.data)

const fileName = $('#box > div.download-section > p:nth-child(2) > span').text().trim()
const size = $('#box > div.download-section > p:nth-child(3) > span').text().trim()
const teleDl = $('#link7 > a').attr('href')
const megaDl = $('#link4 > a').attr('href')
    
let msg = `*File name :* ${fileName}

*Size :* ${size}

*Telegram DL :* ${teleDl}

*Mega.nz DL :* ${teleDl}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

console.log(msg)
await reply(msg)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
