const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "sintest",
    desc: "cinesubz.co info",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
let emptyMsg = `*_Please give me a sinhalasub url._*`
if(!q) return reply(emptyMsg)
    
let response = await axios.get(q)
let $ = cheerio.load(response.data)

const title = $('#single > div.content.right > div.sheader > div.data > div.head > h1').text().trim()
const date = $('#single > div.content.right > div.sheader > div.data > div.extra > span.date').text().trim()
const rtime = $('#single > div.content.right > div.sheader > div.data > div.extra > span.runtime').text().trim()
const country = $('#single > div.content.right > div.sheader > div.data > div.extra > span.country').text().trim()
const rate = $('#repimdb > strong').text().trim()
const img = $('#dt_galery > div.owl-wrapper-outer > div > div:nth-child(1) > div > a > img').attr('src')
    
let msg = `*Name :* ${title}

*Date :* ${date}

*Runtime :* ${rtime}

*Country :* ${country}

*IMDB Rating :* ${rate}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

await conn.sendMessage(from, {image : {url: img} , caption: msg}, {quoted:mek})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
