const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "gpt",
    desc: "AI chat feature",
    category: "ai",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a text._*")

let data = await fetchJson(`https://www.dark-yasiya-api.site/ai/chatgpt?q=${q}`)

return reply(`${data.result}\n\n> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "toolbot",
    desc: "AI chat feature",
    category: "ai",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a text._*")

let data = await fetchJson(`https://www.dark-yasiya-api.site/ai/toolbotai?q=${q}`)

return reply(`${data.data.result}\n\n> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "lepton",
    desc: "AI chat feature",
    category: "ai",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a text._*")

let data = await fetchJson(`https://www.dark-yasiya-api.site/ai/leptonai?q=${q}`)

return reply(`${data.result}\n\n> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "goody",
    desc: "AI chat feature",
    category: "ai",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a text._*")

let data = await fetchJson(`https://www.dark-yasiya-api.site/ai/goodyai?q=${q}`)

return reply(`${data.result}\n\n> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "codeai",
    desc: "AI chat feature",
    category: "ai",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a text._*")

let data = await fetchJson(`https://www.dark-yasiya-api.site/ai/useadrenaline?q=${q}`)

return reply(`${data.result}\n\n> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "t2img",
    desc: "AI chat feature",
    category: "ai",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

const apiKey = 'sk-proj-t4zK5846mB-K1leChkDuzlZlm8l7LRZdHPhh0PtYtftzkOFzFO52-AF9v606oGJ0xFED5800B537160029B3B9325981d92d1Ab8727A3W3KDSOTM1LFoVAs0u56PQLfuuQFsmYBARUxbH96cpx5Eleeux1ChR3YcA0A';

async function generateImage(prompt) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    })
  });

  const data = await response.json();
  const imageUrl = data.data[0].url;
  return imageUrl;
}

// Example usage:
const prompt = 'A cat playing chess';
const imageUrl = await generateImage(prompt);
console.log(imageUrl); // Use the URL to display the image

}catch(e){
console.log(e)
reply(`${e}`)
}
})
