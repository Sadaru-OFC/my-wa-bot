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

let response = axios.get('https://wabetainfo.com/android/')
let $ = cheerio.load(response.data)

const time = $('#post-35897 > div > div.entry-metas.mb-half-gutter.last\:mb-0 > span.meta-item.posted-on > span > time').text()

console.log(time)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
