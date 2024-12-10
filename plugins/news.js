const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "news",
    desc: "Get news",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

let response = await axios.get('https://www.ada.lk/')
let $ = cheerio.load(response.data)
let url = $('#breakingnewsads > div:nth-child(1) > a').attr('href')
let result = await axios.get(`${url}`)
$ = cheerio.load(result.data)

const title = $('#main > div > div.row.mainrow.ng-scope > div.inner-special.col-lg-8.col-md-12.col-12.col-sm-12.ng-scope > div > div > div.single-left-grid > h1').text()
const date = $('#main > div > div.row.mainrow.ng-scope > div.inner-special.col-lg-8.col-md-12.col-12.col-sm-12.ng-scope > div > div > div.single-left-grid > div.reco-detail > span.sr-date').text()
const time = $('#main > div > div.row.mainrow.ng-scope > div.inner-special.col-lg-8.col-md-12.col-12.col-sm-12.ng-scope > div > div > div.single-left-grid > div.reco-detail > span.sr-time').text()
const desc = $('#main > div > div.row.mainrow.ng-scope > div.inner-special.col-lg-8.col-md-12.col-12.col-sm-12.ng-scope > div > div > div.single-left-grid > div.single-body-wrap > p:nth-child(2)').text()
const img = $('#main > div > div.row.mainrow.ng-scope > div.inner-special.col-lg-8.col-md-12.col-12.col-sm-12.ng-scope > div > div > div.single-left-grid > div.single-body-wrap > p:nth-child(8) > img').attr('src');

let msg = `*${title}*

${date}${time}

${desc}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

await conn.sendMessage(from, {text:msg},{quoted:mek})

console.log(img)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
