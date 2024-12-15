const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')
const {readEnv} = require('../lib/database')
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js')

cmd({
    pattern: "song2",
    desc: "Download songs",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
    
if(!q) return reply ("*_Please give me a title or url._*")

const yt = await ytsearch(q)
        
if(yt.results.length < 1) return reply("*_Can't find anything._*")
    
const yts = yt.results[0]
const ytdl = await ytmp3(yts.url)

const msg = {
            newsletterJid: "120363352976453510@newsletter",
            newsletterName: "INFINITY WA BOT",
            serverMessageId: 999
          };
          const msg2 = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: msg,
            externalAdReply: { 
		    		title: yts.title,
				body: yts.author.name,
				mediaType: 1,
				sourceUrl: yts.url ,
                		thumbnailUrl: yts.image ,
				renderLargerThumbnail: false,
          			showAdAttribution: true
	    		}
          };

const msg3 = {
		document: {url: ytdl.download.url },
		mimetype: "audio/mpeg",
		fileName: yts.title + ".mp3",
		caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
		contextInfo: msg2
            };
         const inf =  await conn.sendMessage(from, msg3, {
              'quoted': mek
            });


}catch(e){
console.log(e)
reply(`${e}`)
}
})
