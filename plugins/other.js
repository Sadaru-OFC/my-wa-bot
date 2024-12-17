const {cmd , commands} = require('../command')
const {readEnv} = require('../lib/database')
const { fetchJson } = require('../lib/functions')
const axios = require('axios')
const cheerio = require('cheerio')

const apilink = 'https://www.dark-yasiya-api.site'

cmd({
    pattern: "lyrics",
    alias: ["lyric"],
    desc: "get lyrics",
    category: "other",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a song name_*")

const data = await fetchJson(`${apilink}/other/lyrics?text=${q}`)
	    
const msg = `*_INFINITY WA BOT SONG LYRICS_*

*Song :* ${data.result.album}

*Artist :* ${data.result.artists}

${data.result.lyric}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

          const contextMsg = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
          }
          const msgBody = {
            text: msg,
            contextInfo: contextMsg
          }
         await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })
      
}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "textstyle",
    alias: ["fancytext", "fancy"],
    desc: "get fancy text",
    category: "other",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a text._*")

const data = await fetchJson(`${apilink}/other/font?text=${q}`)
	    
const array = data.result
      
const fancyStyle = array.map((fancy, index) => {
            return `${index + 1} || ${array[index].result}` 
        }).join("\n\n")
      
let msg = `*_INFINITY WA BOT TEXT STYLES_*

*Text :* ${q}

${fancyStyle}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

const fdChannel = {
            newsletterJid: "120363352976453510@newsletter",
            newsletterName: "INFINITY WA BOT",
            serverMessageId: 999
          };
          const contextMsg = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: fdChannel
          };
          const msgBody = {
            text: msg,
            contextInfo: contextMsg
          };
         let inf = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

conn.ev.on('messages.upsert', async (msgUpdate) => {
            let msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            let selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {

		    let index = parseInt(selectedOption)

    reply(`${array[index-1].result}`)
	    
}
})
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "ttinfo",
    desc: "Get tiktok user info",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a tiktok user name._*")

let response = await axios.get(`https://urlebird.com/user/${q}/`)
let $ = cheerio.load(response.data)

const errMsg = $('body > div.main > div > h2').text()
const img = $('body > div.main > div.container-fluid.mt-4.mt-md-2 > div > div.col-md-auto.justify-content-center.text-center > img').attr('src')
const likes = $('body > div.main > div.container-fluid.mt-4.mt-md-2 > div > div.col-md-auto.text-center.text-md-left.pl-0 > div > div > div > div:nth-child(1)').text()
const followers = $('body > div.main > div.container-fluid.mt-4.mt-md-2 > div > div.col-md-auto.text-center.text-md-left.pl-0 > div > div > div > div.col-7.col-md-auto.text-truncate').text()
const following = $('body > div.main > div.container-fluid.mt-4.mt-md-2 > div > div.col-md-auto.text-center.text-md-left.pl-0 > div > div > div > div.col-auto.d-none.d-sm-block.text-truncate').text()
const bio = $('body > div.main > div.container-fluid.mt-4.mt-md-2 > div > div.col-md-auto.text-center.text-md-left.pl-0 > div > p').text()
const username = $('body > div.main > div.container-fluid.mt-4.mt-md-2 > div > div.col-md-auto.text-center.text-md-left.pl-0 > h1').text()
const name = $('body > div.main > div.container-fluid.mt-4.mt-md-2 > div > div.col-md-auto.text-center.text-md-left.pl-0 > div > h5').text()

let msg = `*_INFINITY WA BOT TIKTOK USER INFO_*

*Name :* ${name}

*Username :* ${username}

*Bio :* ${bio}

*Follownig :* ${following}

*Followers :* ${followers}

*Likes :* ${likes}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

const fdChannel = {
            newsletterJid: "120363352976453510@newsletter",
            newsletterName: "INFINITY WA BOT",
            serverMessageId: 999
          };
          const contextMsg = {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: fdChannel
          };
          const msgBody = {
	    image: {url: img},
            caption: msg,
            contextInfo: contextMsg
          };
         await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

}catch(e){
console.log(e)
reply(`${errMsg}`)
}
})

cmd({
    pattern: "ipinfo",
    desc: "Get ip info",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a ip address to get info._*")

const IP = "IP :"
const CONTINENT = "Continent :"
const COUNTRY = "Country :"
const COUNTRYCODE = "Country Code :"
const REGIONNAME = "Region Name :"
const CITY = "City :"
const ZIP = "ZIP :"
const CURRENCY = "Currency :"
const TIMEZ = "Time Zone :"
const ISP = "ISP :"
const MOBILE = "Mobile :"

let data = await fetchJson(`https://api.techniknews.net/ipgeo/${q}`)

let msg = `*_INFINITY WA BOT IP INFO_*

` +
'*🔴 ' + IP +'* ' + data.ip + '\n' +
    '*🌐' + CONTINENT +'* ' + data.continent+ '\n' +
    '*🗺' + COUNTRY +'* ' + data.country+ '\n' +
    '*🔢' + COUNTRYCODE +'* ' + data.countryCode+ '\n' +
    '*🌍' + REGIONNAME +'* ' + data.regionName+ '\n' +
    '*🚩' + CITY +'* ' + data.city+ '\n' +
    '*🏛' + ZIP +'* ' + data.zip+ '\n' +
    '*🕐' + TIMEZ +'* ' + data.timezone+ '\n' +
    '*💸' + CURRENCY +'* ' + data.currency+ '\n' +
    '*📡' + ISP +'* ' + data.isp+ '\n' +
    '*📱' + MOBILE +'* ' + data.mobile+ '\n\n'
    + "> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ"

await conn.sendMessage(from, {text:msg}, {quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "myip",
    desc: "Get ip address",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

let response = await axios.get(`https://api.techniknews.net/ip/`)
let $ = cheerio.load(response.data)

const ip = $('body').text()

reply(ip)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "npm",
    desc: "Get npm info",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
let emptyMsg = `*_Please give me a npm package name._*

.npm axios

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`
if(!q) return reply(emptyMsg)
    
let response = await axios.get(`https://www.npmjs.com/package/${q}`)
let $ = cheerio.load(response.data)

const name = $('#top > div.w-100.ph0-l.ph3.ph4-m > h2 > span').text().trim()
const version = $('#top > div.w-100.ph0-l.ph3.ph4-m > span:nth-child(2)').text().trim()
const date = $('#top > div.w-100.ph0-l.ph3.ph4-m > span:nth-child(4) > time').text().trim()
const ghlink = $('#repository-link').text().trim()
    
let msg = `*_INFINITY WA BOT NPM INFO_*

*Package :* ${name}

*Version :* ${version}

*Published :* ${date}

*Repository :* ${ghlink}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

await reply(msg)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
