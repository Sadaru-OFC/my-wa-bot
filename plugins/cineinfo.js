const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios');
const cheerio = require('cheerio');

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

const response = axios.get('https://cinesubz.co/movies/time-cut-2024-sinhala-subtitles/')
  
    const $ = cheerio.load(response.data)
    const title = $('#single > div.content.right > div.sheader > div.data > h1').text()
    console.log(title)
 
}catch(e){
console.log(e)
reply(`${e}`)
}
})
