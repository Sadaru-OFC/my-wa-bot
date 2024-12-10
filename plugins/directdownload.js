const { fetchJson } = require('../lib/functions');
const { cmd, commands } = require('../command');
const {readEnv} = require('../lib/database');

const apilink = 'https://www.dark-yasiya-api.site'

//============== download links command & direct link send command ===============

cmd({
    pattern: "downlink",
    desc: "get movie download links",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
if(!isOwner) return reply("*_This is an owner cmd._*")
        
    if (!q.startsWith("https://sinhalasub.lk/")) return reply("*_Please give me a sinhalasub.lk url._*")

const mv = await fetchJson(`${apilink}/movie/sinhalasub/movie?url=${q}`)

const array = mv.result.data.dl_links;

let dt = `*_${mv.result.data.title} All Download Links ⬇️_*\n\n`
let cap = `\n\n> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

if (!array || array.length === 0) {
            return reply("*_No download links in this movie._*");
        }
        
const result = array.map((movie, index) => `${index + 1}. *Quality :* ${array[index].quality}\n*Size :* ${array[index].size}\n*Link :* ${array[index].link}`).join("\n\n");
            
await conn.sendMessage(from, { text: `${dt} ${result} ${cap}` }, {quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)

}
})

cmd({
    pattern: "dirsend",
    desc: "download direct url",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
if(!isOwner) return reply("*_This is an owner cmd._*")

const id = config.MV_SEND_JID
    
let a = q
	
let b = a.split(" & ")

let c = b[0]
let d = b[1]

if(!a) return reply(`*_Please give me a direct link & file name. Ex :- .dirsend <direct link> & <file name>_*`)
if(!d) return reply("*_Please give me a file name._*")

await conn.sendMessage( id ,{document: {url: c },mimetype:"video/mp4",fileName: d + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴍᴏᴠɪᴇ ᴡᴏʀʟᴅ"})

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "dirdl",
    desc: "download direct url",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
if(!isOwner) return reply("*_This is an owner cmd._*")
    
if(!q) return reply(`*_Please give me a direct link._*`)

await conn.sendMessage(from ,{document: {url: q },mimetype:"video/mp4",fileName: "🎬 INFINITY WA BOT 🎬" + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"})
  
}catch(e){
console.log(e)
reply(`${e}`)
}
})
