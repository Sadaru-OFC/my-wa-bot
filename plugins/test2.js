const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js')

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

const ytdl = await ytmp3(q)
    
console.log(ytdl.length)
console.log(ytdl)

}catch(e){
console.log(e)
reply(`${e}`)
}
})
