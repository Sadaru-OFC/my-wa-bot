const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "cineinfo",
    desc: "cinesubz.co info",
    category: "search",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a movie name._*")

let response = await axios.get(`https://cinesubz.co/?s=${q}`);
let $ = cheerio.load(response.data);
let url = $('#contenedor > div.module > div.content.rigth.csearch > div > div:nth-child(2) > article > div.details > div.title > a').attr('href');
    if(!url) {
        let errr = $('#contenedor > div.module > div.content.rigth.csearch > div > div.no-result.animation-2 > h2 > span').text()
        return reply(`No results to show with *${errr}*`)
    }
let result = await axios.get(`${url}`);
$ = cheerio.load(result.data)

const title = $('#single > div.content.right > div.sheader > div.data > h1').text()
const date = $('#single > div.content.right > div.sheader > div.data > div.extra > span.date').text()
const country = $('#single > div.content.right > div.sheader > div.data > div.extra > span.country').text()
const time = $('#single > div.content.right > div.sheader > div.data > div.extra > span.runtime').text()
const rate = $('#repimdb > strong').text()
const director = $('#cast > div:nth-child(2) > div > div.data > div.name > a').text()
const img = $('#single > div.content.right > div.sheader > div.poster > img').attr('src')

let msg = `🍟 *${title}*

🧿 *Release Date :* ${date}

🌍 *Country :* ${country}

⏱ *Duration :* ${time}

⭐ *IMDB Rate :* ${rate}

🤵‍♂ *Director :* ${director}

🖇 *Link :* ${url}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

await conn.sendMessage(from, {image:{url: img},caption:msg},{quoted:mek})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "cineinfosend",
    desc: "cinesubz.co info",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
const id = config.MV_SEND_JID
if(!isOwner) return reply("*_This is an owner cmd._*")
if(!q && !q.startsWith('https://cinesubz.co/')) return reply("*_Please give me a cinesubz.co url._*")
let code = await conn.groupInviteCode('120363355439809658@g.us')

let a = q.split(" & ")
let b = a[0]
let c = a[1]
    
let response = await axios.get(`https://cinesubz.co/?s=${b}`);
let $ = cheerio.load(response.data);
let url = $('#contenedor > div.module > div.content.rigth.csearch > div > div:nth-child(2) > article > div.details > div.title > a').attr('href');
    if(!url) {
        let errr = $('#contenedor > div.module > div.content.rigth.csearch > div > div.no-result.animation-2 > h2 > span').text()
        return reply(`No results to show with *${errr}*`)
    }
let result = await axios.get(`${url}`);
$ = cheerio.load(result.data)

const title = $('#single > div.content.right > div.sheader > div.data > h1').text()
const date = $('#single > div.content.right > div.sheader > div.data > div.extra > span.date').text()
const country = $('#single > div.content.right > div.sheader > div.data > div.extra > span.country').text()
const time = $('#single > div.content.right > div.sheader > div.data > div.extra > span.runtime').text()
const rate = $('#repimdb > strong').text()
const director = $('#cast > div:nth-child(2) > div > div.data > div.name > a').text()
const img = $('#single > div.content.right > div.sheader > div.poster > img').attr('src')

let msg = `🍟 *${title}*

🧿 *Release Date :* ${date}

🌍 *Country :* ${country}

⏱ *Duration :* ${time}

⭐ *IMDB Rate :* ${rate}

🤵‍♂ *Director :* ${director}

🖇 *Link :* ${url}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

● ɢʀᴏᴜᴘ ʟɪɴᴋ : https://chat.whatsapp.com/${code}

> ɪɴꜰɪɴɪᴛʏ ᴍᴏᴠɪᴇ ᴡᴏʀʟᴅ`

if(!c) {
await conn.sendMessage(id, {image:{url: img},caption:msg})
} else {
await conn.sendMessage(c, {image:{url: img},caption:msg})
}
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
