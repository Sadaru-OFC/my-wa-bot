const { cmd, commands } = require('../command')
const { fetchJson } = require('../lib/functions')
const { readEnv } = require('../lib/database')

const apilink = 'https://rest-api-dark-shan.vercel.app/'

cmd({
    pattern: "cinesearch",
    desc: "Search movies in Cinesubz.co",
    category: "search",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

	let code = await conn.groupInviteCode('120363355439809658@g.us')
        const config = await readEnv();
        if (config.BLOCK_JID.includes(from)) return
	let premNb = await fetchJson(`https://github.com/SadarulkOfficial/INFINITY-DATABASE/raw/refs/heads/main/premium.json`)
	    
	let premMsg = `★ You are not a premium user.

★  Please contact owner and purchase the movie download feature.

★ 1 month : Rs.300

★ WhatsApp - https://wa.me/94701814946?text=Buy+movie+premium`
	    
	if(!premNb.includes(senderNumber)) return reply(premMsg)
        if (!q) return reply("*_Please give me a movie name._*")
        
        const search = await fetchJson(`${apilink}download/cinesubz-search?q=${q}`)
        const array = search.data

        if (array === 'No results found.') {
            return reply("*_Can't find your movie._*")
        }

 const movieDetails = array.map((movie, index) => {
           return `${index + 1}. *Movie Name :* ${movie.title}\n*Type :* ${movie.category}\n*Year :* ${movie.year}\n*Link :* ${movie.link}`
        }).join("\n\n")
        
let searchMsg = `*_INFINITY WA BOT Cinesubz.co SEARCH 🔎_*

${movieDetails}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`
        
        const fdChannel = {
            newsletterJid: "120363352976453510@newsletter",
            newsletterName: "INFINITY WA BOT",
            serverMessageId: 999
          };
          const contextMsg = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: fdChannel
          };
          const msgBody = {
	    image: { url : `https://github.com/SadarulkOfficial/INFINITY-DATABASE/blob/main/Bot%20Logos/cinesubz.co.jpg?raw=true` },
            caption: searchMsg,
            contextInfo: contextMsg
          };
         let inf = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

//================================================================================================================
	    
conn.ev.on('messages.upsert', async (msgUpdate) => {
            let msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            let selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {

		    let index = parseInt(selectedOption);

		    let info = await fetchJson(`${apilink}download/cinesubz-dl?q=${array[index-1].link}`)
		   
		    let arrays =  info.data.download
        
      if (!arrays || arrays.length === 0) {
            return reply("*_No download links available._*")
        }

        const downloadLinks = arrays.map((link, index) => {
            return `${index + 1} || ${link.quality} ( ${link.size} )` 
        }).join("\n")
	    
let msg = `*_INFINITY WA BOT Cinesubz.co DOWNLOADER 📥_*

🍟 *Movie Name :* ${info.data.title}

🧿 *Release Date :* ${info.data.date}

🌍 *Country :* ${info.data.country}

⏱ *Duration :* ${info.data.duration}

⭐ *IMDB Rate :* ${info.data.rating}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

🔢 Reply Below Number :

${downloadLinks}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

const fdChannel = {
            newsletterJid: "120363352976453510@newsletter",
            newsletterName: "INFINITY WA BOT",
            serverMessageId: 999
          };
          const contextMsg = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: fdChannel,
	        externalAdReply: { 
		                title: 'INFINITY WHATSAPP BOT',
				body: 'ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ',
				mediaType: 1,
				sourceUrl: `https://chat.whatsapp.com/${code}` ,
                		thumbnailUrl:  info.data.image,
				renderLargerThumbnail: true,
          			showAdAttribution: true
	    		}
          };
          const msgBody = {
            text: msg,
            contextInfo: contextMsg
          };
         let send = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

conn.ev.on('messages.upsert', async (msgUpdate) => {
            let msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            let selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {

		    const indexx = parseInt(selectedOption);

		   if(arrays[indexx - 1].downloadDetails.error === 'Failed to fetch download links.') return reply("*Direct download server error.Please try again after few hours :(*")
		    let downloadUrl = arrays[indexx - 1].downloadDetails.DIRECT_LINK
if(!downloadUrl) {
	return reply("*_Can't download your movie in this quality.Please try another quality._*")
}	    
		    let caption = `${info.data.title} ( ${arrays[indexx - 1].quality} )
      
> ɪɴꜰɪɴɪᴛʏ ᴡᴀ ʙᴏᴛ ᴍᴏᴠɪᴇ ᴅʟ`
		    
await conn.sendMessage(from, {document: { url: downloadUrl }, mimetype: "video/mp4", fileName: "🎬 INFINITY WA BOT 🎬" + info.data.title + ".mp4", caption: caption}, { quoted: send })

}
})		    
}
})

//===============================================================================================================
	    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "cinedl",
    desc: "Download movies in Cinesubz.co",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

let code = await conn.groupInviteCode('120363355439809658@g.us')
	    
        const config = await readEnv();
        if (config.BLOCK_JID.includes(from)) return
	let premNb = await fetchJson(`https://github.com/SadarulkOfficial/INFINITY-DATABASE/raw/refs/heads/main/premium.json`)
	let premMsg = `★ You are not a premium user.

★  Please contact owner and purchase the movie download feature.

★ 1 month : Rs.300

★ WhatsApp - https://wa.me/94701814946?text=Buy+movie+premium`
	    
	if(!premNb.includes(senderNumber)) return reply(premMsg)
        if (!q) return reply("*_Please give me a movie name._*")

    const search = await fetchJson(`${apilink}download/cinesubz-search?q=${q}`)
    const searchResult = search.data

        if (searchResult === 'No results found.') {
            return reply("*_Can't find your movie._*")
        }
        
    const info = await fetchJson(`${apilink}download/cinesubz-dl?q=${searchResult[0].link}`)

const array =  info.data.download
        
      if (!array || array.length === 0) {
            return reply("*_No download links available._*")
        }

        const downloadLinks = array.map((link, index) => {
            return `${index + 1} || ${link.quality} ( ${link.size} )` 
        }).join("\n")
	    
let msg = `*_INFINITY WA BOT Cinesubz.co DOWNLOADER 📥_*

🍟 *Movie Name :* ${info.data.title}

🧿 *Release Date :* ${info.data.date}

🌍 *Country :* ${info.data.country}

⏱ *Duration :* ${info.data.duration}

⭐ *IMDB Rate :* ${info.data.rating}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

🔢 Reply Below Number :

${downloadLinks}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

const fdChannel = {
            newsletterJid: "120363352976453510@newsletter",
            newsletterName: "INFINITY WA BOT",
            serverMessageId: 999
          };
          const contextMsg = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: fdChannel,
	        externalAdReply: { 
		                title: 'INFINITY WHATSAPP BOT',
				body: 'ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ',
				mediaType: 1,
				sourceUrl: `https://chat.whatsapp.com/${code}` ,
                		thumbnailUrl:  info.data.image,
				renderLargerThumbnail: true,
          			showAdAttribution: true
	    		}
          };
          const msgBody = {
            text: msg,
            contextInfo: contextMsg
          };
         let send = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {

		    const index = parseInt(selectedOption);

		   if(array[index - 1].downloadDetails.error === 'Failed to fetch download links.') return reply("*Direct download server error.Please try again after few hours :(*")
		    let downloadUrl = array[index - 1].downloadDetails.DIRECT_LINK
if(!downloadUrl) {
	return reply("*_Can't download your movie in this quality.Please try another quality._*")
}	    
		    let caption = `${info.data.title} ( ${array[index - 1].quality} )
      
> ɪɴꜰɪɴɪᴛʏ ᴡᴀ ʙᴏᴛ ᴍᴏᴠɪᴇ ᴅʟ`
		    
await conn.sendMessage(from, {document: { url: downloadUrl }, mimetype: "video/mp4", fileName: "🎬 INFINITY WA BOT 🎬" + info.data.title + ".mp4", caption: caption}, { quoted: send })

    }
})
	    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "cinesend",
    desc: "movie send to grp jid",
    category: "owner",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

        const code = await conn.groupInviteCode('120363355439809658@g.us')
        const id = config.MV_SEND_JID

        if (!isOwner) {
            return reply("*_This is an owner cmd_*")
	}
        
        if (!q) {
            return reply(
                "*_Please give me a movie name and send jid._*\n\n*Ex :- .cinesend <movie name> & <jid>*"
            )
        }

        const inputParts = q.split(" & ")
        const movieName = inputParts[0]
        const sendJid = inputParts[1]

let MvId; 
if (!sendJid) {
    MvId = id;
} else {
    MvId = sendJid;
}
	    
//========================= Movie Search =================================

const search = await fetchJson(`${apilink}download/cinesubz-search?q=${movieName}`)
        const array = search.data

        if (array === 'No results found.') {
            return reply("*_Can't find your movie._*")
        }

 const movieDetails = array.map((movie, index) => {
           return `${index + 1}. *Movie Name :* ${movie.title}\n*Type :* ${movie.category}\n*Year :* ${movie.year}\n*Link :* ${movie.link}`
        }).join("\n\n")
        
let searchMsg = `*_INFINITY WA BOT Cinesubz.co SEND 🔎_*

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

*Send jid :* ${MvId}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

${movieDetails}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`
	    
//======================================================
	    
let inf = await conn.sendMessage(from, {text: searchMsg}, {quoted: mek})
	    
//======================= Get info by serch reuslt ===================================

conn.ev.on('messages.upsert', async (msgUpdate) => {
            let msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            let selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {

		    let index = parseInt(selectedOption);

		    const info = await fetchJson(`${apilink}download/cinesubz-dl?q=${array[index-1].link}`)

            let arrays =  info.data.download
        
      if (!arrays || arrays.length === 0) {
            return reply("*_No download links available._*")
        }

        const downloadLinks = arrays.map((link, index) => {
            return `${index + 1} || ${link.quality} ( ${link.size} )` 
        }).join("\n")

let msg = `*_INFINITY WA BOT Cinesubz.co SENDER 📥_*

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

*Send jid :* ${MvId}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

*Movie Name :* ${info.data.title}

*Release Date :* ${info.data.date}

*Country :* ${info.data.country}

*Duration :* ${info.data.duration}

*IMDB Rate :* ${info.data.rating}

🔢 Reply Below Number :

0 || Send movie info

${downloadLinks}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`
//==========================================================

let send = await conn.sendMessage(from, { image : { url : info.data.image }, caption : msg}, { quoted : inf})
                
//====================== Send info and movie =================

conn.ev.on('messages.upsert', async (msgUpdate) => {
            let msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            let selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {

		    const indexx = parseInt(selectedOption)
			
                if(indexx > 0) {

		   if(arrays[indexx - 1].downloadDetails.error === 'Failed to fetch download links.') return reply("*Direct download server error.Please try again after few hours :(*")
		    let downloadUrl = arrays[indexx - 1].downloadDetails.DIRECT_LINK
if(!downloadUrl) {
	return reply("*_Can't send your movie in this quality.Please try another quality._*")
}	    

		    let caption = `${info.data.title} ( ${arrays[indexx - 1].quality} )
      
> ɪɴꜰɪɴɪᴛʏ ᴍᴏᴠɪᴇ ᴡᴏʀʟᴅ`

			if(!sendJid) {
await conn.sendMessage(id, {document: { url: downloadUrl }, mimetype: "video/mp4", fileName: info.data.title + ".mp4", caption: caption})
			} else {
await conn.sendMessage(sendJid, {document: { url: downloadUrl }, mimetype: "video/mp4", fileName: info.data.title + ".mp4", caption: caption})
			}
} else {

let sendInfomsg = `🍟 *${info.data.title}*

🧿 *Release Date :* ${info.data.date}

🌍 *Country :* ${info.data.country}

⏱ *Duration :* ${info.data.duration}

⭐ *IMDB Rate :* ${info.data.rating}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

● ɢʀᴏᴜᴘ ʟɪɴᴋ : https://chat.whatsapp.com/${code}

> ɪɴꜰɪɴɪᴛʏ ᴍᴏᴠɪᴇ ᴡᴏʀʟᴅ`

			if(!sendJid) {
await conn.sendMessage(id ,{image:{url: info.data.image},caption: sendInfomsg})	
			} else {
await conn.sendMessage(sendJid ,{image:{url: info.data.image},caption: sendInfomsg})	
			}
}
			
}
})		    
}
})
                
//============================================================
                
}catch(e){
console.log(e)
reply(`${e}`)
}
})
