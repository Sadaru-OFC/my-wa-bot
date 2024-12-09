const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "hirunews",
    desc: "Get hirunews",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

let response = await axios.get('https://www.hirunews.lk/');
let $ = cheerio.load(response.data);
let url = $('#article-phara > p > a').attr('href');
let result = await axios.get(`${url}`);
$ = cheerio.load(result.data);

const title = $('body > div:nth-child(17) > center > h1').text()
const date = $('body > div:nth-child(17) > center > p').text()
const desc = $('#article-phara2').text()
const img = $('body > div:nth-child(17) > div.row > div.col-sm-12.col-md-9.col-lg-9.section > div.main-article-section > div.main-article-banner > img').attr('src')

let msg = `*${title}*

${date}

${desc}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

await conn.sendMessage(from, {image:{url: img},caption:msg},{quoted:mek})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
