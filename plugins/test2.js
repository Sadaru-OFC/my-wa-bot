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
    
let response = await axios.get('https://utomp3.com/youtube-converter/youtube/0geqOYqwL0s')
let $ = cheerio.load(response.data)

const title = $('#content-box > div > div.right > h2').text()

console.log(title)

}catch(e){
console.log(e)
reply(`${e}`)
}
})
