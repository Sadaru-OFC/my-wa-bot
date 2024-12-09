const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "cineinfo",
    desc: "AI chat feature",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!isOwner) return reply("*_This is an owner cmd._*")
if(!q) return reply("*_Please give me a cinesubz.co url._*")

const response = await axios.get(`${q}`)
const $ = cheerio.load(response.data)

const title = $('#single > div.content.right > div.sheader > div.data > h1').text()
const date = $('#single > div.content.right > div.sheader > div.data > div.extra > span.date').text()
const cnt = $('#single > div.content.right > div.sheader > div.data > div.extra > span.country').text()
const dur = $('#single > div.content.right > div.sheader > div.data > div.extra > span.runtime').text()
const rate = $('#repimdb > strong').text()
const img = $('#link-94804 > td:nth-child(1) > a[href=""]').text()

let msg = `🍟 ${title}

🧿 Release Date : ${date}

🌍 Country : ${cnt}

⏱ Duration : ${dur}

⭐ IMDB Rate : ${rate}`    
        
await conn.sendMessage(from, {text : msg } , {quoted : mek} )

console.log(img)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

a[href=""]
