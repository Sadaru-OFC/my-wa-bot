const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "cineinfo",
    desc: "cinesubz.co info",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!isOwner) return reply("*_This is an owner cmd._*")
if(!q && !q.startsWith('https://cinesubz.co/')) return reply("*_Please give me a cinesubz.co url._*")
let code = await conn.groupInviteCode('120363355439809658@g.us')

const response = await axios.get(`${q}`)
const $ = cheerio.load(response.data)

const title = $('#single > div.content.right > div.sheader > div.data > h1').text()
const date = $('#single > div.content.right > div.sheader > div.data > div.extra > span.date').text()
const country = $('#single > div.content.right > div.sheader > div.data > div.extra > span.country').text()
const time = $('#single > div.content.right > div.sheader > div.data > div.extra > span.runtime').text()
const rate = $('#repimdb > strong').text()
const director = $('#cast > div:nth-child(2) > div > div.data > div.name > a').text()
const img = $('#info > div:nth-child(2) > span > p:nth-child(1) > img').attr('src')

let msg = `🍟 ${title}

🧿 *Release Date :* ${date}

🌍 *Country :* ${country}

⏱ *Duration :* ${time}

⭐ *IMDB Rate :* ${rate}

🤵‍♂ *Director :* ${director}

🖇 *Link :* ${q}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

● ɢʀᴏᴜᴘ ʟɪɴᴋ : https://chat.whatsapp.com/${code}

> ɪɴꜰɪɴɪᴛʏ ᴍᴏᴠɪᴇ ᴡᴏʀʟᴅ`

await conn.sendMessage(from, {image:{url: img},caption:msg},{quoted:mek})
       
}catch(e){
console.log(e)
reply(`${e}`)
}
})
