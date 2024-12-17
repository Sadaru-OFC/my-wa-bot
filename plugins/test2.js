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
    
if(!q) return reply("*_Please give me a title._*")

const yt = await ytsearch(q)
const yts = yt.results[0]
const ytdl = await ytmp3(yts.url)
    
let result = yt.results  
let length = yt.results.length
let ytdlLength = ytdl.download.length
    
console.log(ytdlLength)
console.log(ytdl)

}catch(e){
console.log(e)
reply(`${e}`)
}
})
