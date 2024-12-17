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
    
let response = await axios.get(`https://www.saveporn.net/view_video.php?viewkey=65804ef33f460`)
let $ = cheerio.load(response.data)
    
const title = $('body > main > section.e.j.d2.dsection > h2').text()
    
console.log(title)

}catch(e){
console.log(e)
reply(`${e}`)
}
})
