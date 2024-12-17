const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

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
const size = $('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > div:nth-child(9) > p').text().trim()
const files = $('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > div:nth-child(10) > p').text().trim()
const ghlink = $('#repository-link').text().trim()
    
let msg = `*_INFINITY WA BOT NPM INFO_*

*Package :* ${name}

*Version :* ${version}

*Published :* ${date}

*Unpacked Size :* ${size}

*Total Files :* ${files}

*Repository :* ${ghlink}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

await reply(msg)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
