const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "test2",
    desc: "test",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

let x = q.replace('https://www.youtube.com/watch?v=', '')
let y = `https://www.youtubepp.com/watch?v=${x}`
    
let response = await axios.get(`${y}`)
let $ = cheerio.load(response.data)

const title = $('#result > div > div.col-xs-12.col-sm-5.col-md-5 > div > div > b').text()

console.log(title)

}catch(e){
console.log(e)
reply(`${e}`)
}
})
