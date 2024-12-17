const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')
const {readEnv} = require('../lib/database')
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js')


//=====audio-dl=====

cmd({
    pattern: "song",
    alias: ["mp3", "ytmp3", "audio"],
    desc: "Download songs",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

    const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
    
if(!q) return reply ("*_Please give me a title or url._*")

    if(q.startsWith("https://") && q.includes("watch?v=")) {

const data = await ytmp3(q)

let desc = `*_INFINITY WA BOT AUDIO DOWNLOADER_* 📥

┌───────────────────
├ ℹ️ *Title:* ${data.result.title}
├ 👤 *Author:* ${data.result.author.name}
├ 👁️‍🗨️ *Views:* ${data.result.views}
├ 🕘 *Duration:* ${data.result.timestamp}
├ 📌 *Upload on:* ${data.result.ago}
├ 🖇️ *Link:* ${data.result.url}
└───────────────────

🔢 Reply Below Number :

1 || Audio
2 || Document

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
            image : { url : data.result.image },
            caption : desc,
            contextInfo: contextMsg
          };
         let inf = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

//==========number reply==========

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {
                switch (selectedOption) {
                    case '1':

                        await conn.sendMessage(from,{audio: {url: data.result.download.url },mimetype:"audio/mpeg"},{quoted: inf})

                        break; 
                    case '2':

                        await conn.sendMessage(from,{document: {url: data.result.download.url },mimetype:"audio/mpeg",fileName: data.result.title + ".mp3",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: inf})

                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*");
                }

            }
        })
        
//================================
        
} else if(q.startsWith("https://") && q.includes("?si=")) {

let a = q.split("?si=")
let b = a[0]

const data = await ytmp3(b)

let desc = `*_INFINITY WA BOT AUDIO DOWNLOADER_* 📥

┌───────────────────
├ ℹ️ *Title:* ${data.result.title}
├ 👤 *Author:* ${data.result.author.name}
├ 👁️‍🗨️ *Views:* ${data.result.views}
├ 🕘 *Duration:* ${data.result.timestamp}
├ 📌 *Upload on:* ${data.result.ago}
├ 🖇️ *Link:* ${data.result.url}
└───────────────────

🔢 Reply Below Number :

1 || Audio
2 || Document

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
            image : { url : data.result.image },
            caption : desc,
            contextInfo: contextMsg
          };
         let inf = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

//==========number reply==========

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {
                switch (selectedOption) {
                    case '1':

                        await conn.sendMessage(from,{audio: {url: data.result.download.url },mimetype:"audio/mpeg"},{quoted: inf})

                        break; 
                    case '2':

                        await conn.sendMessage(from,{document: {url: data.result.download.url },mimetype:"audio/mpeg",fileName: data.result.title + ".mp3",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: inf})

                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*");
                }

            }
        })
        
//================================

} else if(!q.startsWith("https://")){

const yt = await ytsearch(q)
        
    if(yt.results.length < 1) return reply("*_Can't find anything._*")
    
const yts = yt.results[0]
const ytdl = await ytmp3(yts.url)
    
let desc = `
*_INFINITY WA BOT AUDIO DOWNLOADER_* 📥

┌───────────────────
├ ℹ️ *Title:* ${yts.title}
├ 👤 *Author:* ${yts.author.name}
├ 👁️‍🗨️ *Views:* ${yts.views}
├ 🕘 *Duration:* ${yts.timestamp}
├ 📌 *Upload on:* ${yts.ago}
├ 🖇️ *Link:* ${yts.url}
└───────────────────

🔢 Reply Below Number :

1 || Audio
2 || Document

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
            image : { url : yts.image },
            caption : desc,
            contextInfo: contextMsg
          };
         let inf = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

//==========number reply==========

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {
                switch (selectedOption) {
                    case '1':

                        await conn.sendMessage(from,{audio: {url: ytdl.result.download.url },mimetype:"audio/mpeg"},{quoted: inf})

                        break; 
                    case '2':

                        await conn.sendMessage(from,{document: {url: ytdl.result.download.url },mimetype:"audio/mpeg",fileName: yts.title + ".mp3",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: inf})

                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*");
                }

            }
        })
        
//================================       
        
}
}catch(e){
console.log(e)
reply(`${e}`)
}
})

//=====video-dl=====

cmd({
    pattern: "video",
    alias: ["mp4", "ytmp4", "ytv"],
    desc: "Download videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
    
if(!q) return reply ("*_Please give me a title or url._*")

if(q.startsWith("https://") && q.includes("watch?v=")) {

const quality = "360p";
const data = await ytmp4(q, quality);

let desc = `*_INFINITY WA BOT VIDEO DOWNLOADER_* 📥

┌───────────────────
├ ℹ️ *Title:* ${data.result.title}
├ 👤 *Author:* ${data.result.author.name}
├ 👁️‍🗨️ *Views:* ${data.result.views}
├ 🕘 *Duration:* ${data.result.timestamp}
├ 📌 *Upload on:* ${data.result.ago}
├ 🖇️ *Link:* ${data.result.url}
└───────────────────

🔢 Reply Below Number :

1 || Video
2 || Document

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
            image : { url : data.result.image },
            caption : desc,
            contextInfo: contextMsg
          };
         let inf = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

//==========number reply==========

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {
                switch (selectedOption) {
                    case '1':

                        await conn.sendMessage(from,{video: {url: data.download.url },mimetype:"video/mp4"},{quoted: inf})
                        
                        break; 
                    case '2':

                        await conn.sendMessage(from,{document: {url: data.download.url },mimetype:"video/mp4",fileName:data.result.title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted:inf })

                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*");
                }

            }
        })
        
//================================

    
} else if(q.startsWith("https://") && q.includes("?si=")) {

let a = q.split("?")[0]

    const quality = "360p";
const data = await ytmp4(a, quality);

let desc = `*_INFINITY WA BOT VIDEO DOWNLOADER_* 📥

┌───────────────────
├ ℹ️ *Title:* ${data.result.title}
├ 👤 *Author:* ${data.result.author.name}
├ 👁️‍🗨️ *Views:* ${data.result.views}
├ 🕘 *Duration:* ${data.result.timestamp}
├ 📌 *Upload on:* ${data.result.ago}
├ 🖇️ *Link:* ${data.result.url}
└───────────────────

🔢 Reply Below Number :

1 || Video
2 || Document

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
            image : { url : data.result.image },
            caption : desc,
            contextInfo: contextMsg
          };
         let inf = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

//==========number reply==========

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {
                switch (selectedOption) {
                    case '1':

                        await conn.sendMessage(from,{video: {url: data.download.url },mimetype:"video/mp4"},{quoted: inf})
                        
                        break; 
                    case '2':

                        await conn.sendMessage(from,{document: {url: data.download.url },mimetype:"video/mp4",fileName:data.result.title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted:inf })

                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*");
                }

            }
        })
        
//================================
    
} else if(!q.startsWith("https://")){

const yt = await ytsearch(q)
if(yt.results.length < 1) return reply("*_Can't find anything._*")
    
const yts = yt.results[0]
const quality = "360p"
const ytdl = await ytmp4(yts.url, quality)

let desc = `*_INFINITY WA BOT VIDEO DOWNLOADER_* 📥

┌───────────────────
├ ℹ️ *Title:* ${yts.title}
├ 👤 *Author:* ${yts.author.name}
├ 👁️‍🗨️ *Views:* ${yts.views}
├ 🕘 *Duration:* ${yts.timestamp}
├ 📌 *Upload on:* ${yts.ago}
├ 🖇️ *Link:* ${yts.url}
└───────────────────

🔢 Reply Below Number :

1 || Video
2 || Document

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
            image : { url : yts.image },
            caption : desc,
            contextInfo: contextMsg
          };
         let inf = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

//==========number reply==========

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {
                switch (selectedOption) {
                    case '1':

                        await conn.sendMessage(from,{video: {url: ytdl.download.url },mimetype:"video/mp4"},{quoted: inf})
                        
                        break; 
                    case '2':

                        await conn.sendMessage(from,{document: {url: ytdl.download.url },mimetype:"video/mp4",fileName:yts.title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted:inf })

                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*");
                }

            }
        })
        
//================================
    
}
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
