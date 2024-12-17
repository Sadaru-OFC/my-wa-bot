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
    
let title = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page > div:nth-child(2) > article > div.details > div.title > a').text()

let image = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page > div:nth-child(2) > article > div.image > div > a > img').attr('src')

let link = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page > div:nth-child(2) > article > div.image > div > a').attr('href')

let rating = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page > div:nth-child(2) > article > div.details > div.meta > span:nth-child(1)').text()

let year = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page > div:nth-child(2) > article > div.details > div.meta > span.year').text()
    
    console.log(title)
    console.log(image)
    console.log(year)
    console.log(rating)
    console.log(link)
       
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
