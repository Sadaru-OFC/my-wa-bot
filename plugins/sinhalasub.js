const { fetchJson } = require('../lib/functions')
const { cmd, commands } = require('../command')
const {readEnv} = require('../lib/database')

const apilink = 'https://www.dark-yasiya-api.site'

cmd({
    pattern: "sinsend",
    desc: "movie send to grp jid",
    category: "owner",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

const config = await readEnv()
const id = config.MV_SEND_JID
const code = await conn.groupInviteCode('120363355439809658@g.us')
if(config.BLOCK_JID.includes(from)) return
if(!isOwner) return reply("*_This is an owner cmd._*")

if(!q) return reply("*_Please give me a movie name and send jid._*\n\n*Ex :- .sinsend <movie name> & <jid>*")

        const inputParts = q.split(" & ")
        const movieName = inputParts[0]
        const sendJid = inputParts[1]

let MvId
if (!sendJid) {
    MvId = id
} else {
    MvId = sendJid
}

const search = await fetchJson(`${apilink}/movie/sinhalasub/search?text=${q}`)
const array = search.result.data

const movieDetails = array.map((movie, index) => {
           return `${index + 1}. *Movie Name :* ${movie.title}\n*Type :* ${movie.type}\n*Year :* ${movie.year}\n*Link :* ${movie.link}`
        }).join("\n\n")

let searchMsg = `*_INFINITY WA BOT Sinhalasub.lk SEND 🔎_*

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

*Send jid :* ${MvId}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

${movieDetails}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

let inf = await conn.sendMessage(from, {image: {url: `https://raw.githubusercontent.com/Sadarulk/QueenMatheeDB/refs/heads/main/botlogos/sinhalasub.png`},caption:searchMsg}, {quoted: mek})

conn.ev.on('messages.upsert', async (msgUpdate) => {
            let msg = msgUpdate.messages[0]
            if (!msg.message || !msg.message.extendedTextMessage) return

            let selectedOption = msg.message.extendedTextMessage.text.trim()

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {

		    let index = parseInt(selectedOption)

			const info = await fetchJson(`${apilink}/movie/sinhalasub/movie?url=${array[index-1].link}`)

			const filteredLinks = info.result.data.dl_links.filter((link) => link.link.includes("pixeldrain.com"))

if(filteredLinks.length === 0) return reply("*_No download links._*")
		    
const downloadLinks = filteredLinks.map((link, index) => {
            return `${index + 1} || ${link.quality} ( ${link.size} )` 
        }).join("\n")

let infoMsg = `*_INFINITY WA BOT Sinhalasub.lk SENDER 📥_*

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

*Send jid :* ${MvId}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

*Movie Name :* ${info.result.data.title}

*Release Date :* ${info.result.data.date}

*Category :* ${info.result.data.category}

*Country :* ${info.result.data.country}

*Duration :* ${info.result.data.runtime}

*IMDB Rate :* ${info.result.data.imdbRate}

🔢 Reply Below Number :

0 || Send movie info

${downloadLinks}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`
//==========================================================

let send = await conn.sendMessage(from, { image : { url : info.result.data.images[0] }, caption : infoMsg}, { quoted : inf})

conn.ev.on('messages.upsert', async (msgUpdate) => {
            let msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            let selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {

		    const number = parseInt(selectedOption)
			
                if(number > 0) {
			
const downloadUrl = filteredLinks[number-1].link.replace('/u/', '/api/file/')
		   
if(!downloadUrl) {
	return reply("*_Can't send your movie in this quality.Please try another quality._*")
}	    

let caption = `${info.result.data.title} ( ${filteredLinks[number-1].quality} )
      
> ɪɴꜰɪɴɪᴛʏ ᴍᴏᴠɪᴇ ᴡᴏʀʟᴅ`

			if(!sendJid) {
await conn.sendMessage(id, {document: { url: downloadUrl }, mimetype: "video/mp4", fileName: info.result.data.title + ".mp4", caption: caption})
			} else {
await conn.sendMessage(sendJid, {document: { url: downloadUrl }, mimetype: "video/mp4", fileName: info.result.data.title + ".mp4", caption: caption})
			}
			
} else {

let sendInfomsg = `🍟 *${info.result.data.title}*

🧿 *Release Date :* ${info.result.data.date}

🌍 *Country :* ${info.result.data.country}

⏱ *Duration :* ${info.result.data.runtime}

🎀 *Categories :* ${info.result.data.category}

⭐ *IMDB Rate :* ${info.result.data.imdbRate}

🤵‍♂ *Director* : ${info.result.data.director}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

● ɢʀᴏᴜᴘ ʟɪɴᴋ : https://chat.whatsapp.com/${code}

> ɪɴꜰɪɴɪᴛʏ ᴍᴏᴠɪᴇ ᴡᴏʀʟᴅ`

if(!sendJid) {
await conn.sendMessage(id ,{image:{url: info.result.data.images[0]},caption: sendInfomsg})	
			} else {
await conn.sendMessage(sendJid ,{image:{url: info.result.data.images[0]},caption: sendInfomsg})	
			}
			
}
}
})
}
})     
}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "sinsearch",
    desc: "search movies in sinhalasub.lk",
    category: "search",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
let premNb = await fetchJson(`https://github.com/Sadarulk/QueenMatheeDB/raw/refs/heads/main/database/premium.json`)
	    
	let premMsg = `★ You are not a premium user.

★  Please contact owner and purchase the movie download feature.

★ 1 month : Rs.300

★ WhatsApp - https://wa.me/94701814946?text=Buy+movie+premium`
	    
	if(!premNb.includes(senderNumber)) return reply(premMsg)
const mv = await fetchJson(`${apilink}/movie/sinhalasub/search?text=${q}`)

let array = mv.result.data

        if(array.length === 0) {
return reply(`*_Can't find this movie !_*`);
        }       

let result = array.map((movie, index) => `${index + 1}. *Movie Name :* ${array[index].title}\n*Type :* ${array[index].type}\n*Year :* ${array[index].year}\n*Link :* ${array[index].link}`).join("\n\n");

let msg = `*_INFINITY WA BOT Sinhalasub.lk SEARCH 🔎_*

${result}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`
            
await conn.sendMessage(from, { text : msg }, {quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
