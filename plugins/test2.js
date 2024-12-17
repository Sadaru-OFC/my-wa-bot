const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "test2",
    desc: "cinesubz.co info",
    category: "search",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return
    
let response = await axios.get(`https://cinesubz.co/?s=${q}`)
let $ = cheerio.load(response.data)
    
$('#contenedor > div.module > div.content.rigth.csearch > div.search-page > div:nth-child(2) > article > div.details > div.title > a').each((index, element) => {
    const title = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page > div:nth-child([${index + 2}]) > article > div.details > div.title > a').text()
            console.log(title)
})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
