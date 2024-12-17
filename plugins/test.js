const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "test",
    desc: "test",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
let emptyMsg = `*_Please give me a sinhalasub url._*`
    
let response = await axios.get('https://webtor.io/48dd61a1ca0572a7941a499de12bab7f057a3d12')
let $ = cheerio.load(response.data)

const title = $('#file > h1').text().trim()
    
console.log(title)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

