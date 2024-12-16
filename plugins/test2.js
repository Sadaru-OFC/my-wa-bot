const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "test2",
    desc: "hiru news",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

let response = await axios.get(`https://www.hirunews.lk/`)
let $ = cheerio.load(response.data)

const newsUrl = $('body > div:nth-child(18) > div.row > div.col-sm-12.col-md-12.col-lg-6.section.order-lg-2.order-md-1.order-sm-1.order-1 > div > div.today-video > div.main-article-banner > a').attr('href')

let newResponse = await axios.get('newsUrl')
$ = cheerio.load(newResponse.data)

const title = $('body > div:nth-child(18) > center > h1').text()

console.log(title)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
