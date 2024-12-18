const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "sindl",
    desc: "test",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
let emptyMsg = `*_Please give me a sinhalasub url._*

.sindl https://sinhalasub.lk/links/0ufiu8bbt9/`
if(!q) return reply(emptyMsg)
let response = await axios.get(q)
let $ = cheerio.load(response.data)

const url = $('#link').attr('href')
const title = $('title').text().trim()
const mUrl = $('body > div > div > div > div.inside > small:nth-child(3) > a').attr('href')
    
let result = await axios.get(`${mUrl}`)
$ = cheerio.load(result.data)

const img = $('#dt_galery > div.owl-wrapper-outer > div > div:nth-child(1) > div > a > img').attr('src')
    
let pmsg = `*_INFINITY WA BOT Sinhalasub.lk DOWNLOADER 📥_*

*Movie name :* ${title}

*Download link :* ${url}

🔢 Reply Below Number :

1 || Download movie

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

let omsg = `*_INFINITY WA BOT Sinhalasub.lk DOWNLOADER 📥_*

*Movie name :* ${title}

*Download link :* ${url}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

if(url.startsWith('https://pixeldrain.com/'))  {

let newUrl = url.replace('/u/', '/api/file/')
let caption = `_${title}_

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ`
    
let send = await conn.sendMessage(from,{image:{url: img},caption:pmsg},{quoted:mek})

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {
                switch (selectedOption) {
                    case '1':

await conn.sendMessage(from,{document: {url: newUrl },mimetype:"video/mp4",fileName: "🎬 INFINITY WA BOT 🎬" + title + ".mp4",caption: caption},{quoted: send})
                        
                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*")
				
}
}
})
    
} else {

await conn.sendMessage(from,{image:{url: img},caption: omsg},{quoted:mek})
    
}
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
