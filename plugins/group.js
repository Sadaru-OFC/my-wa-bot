const { cmd, commands } = require('../command')
const {readEnv} = require('../lib/database')

cmd({
    pattern: "join",
    desc: "join groups",
    category: "group",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        
const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
        
        if(!isOwner) return reply(`*_This is an owner cmd._*`)
        
if(!q.startsWith('https://chat.whatsapp.com/')) return reply(`*_Invalid group link._*`)
        
        const result = q.split('https://chat.whatsapp.com/')[1]
        
 const response = await conn.groupAcceptInvite(result)
        
      
reply(`*_Successfully joined ✅_*`)
      
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "left",
    desc: "left groups",
    category: "group",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        
        if(!isOwner) return reply(`*_This is an owner cmd._*`)
        if(!isGroup) return
          
        await conn.groupLeave(from)
  
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "link",
    desc: "get group link",
    category: "group",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

const config = await readEnv();
if(config.BLOCK_JID.includes(from)) return
        
        if(!isGroup) return
        if(!isBotAdmins) return reply("*_Please give bot admin._*")
        
        const code = await conn.groupInviteCode(from)
                                        
        reply("https://chat.whatsapp.com/" + code)
  
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "mute",
    desc: "Group mute",
    category: "group",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        
        if(!isOwner) return reply(`*_This is an owner cmd._*`)
        if(!isGroup) return
        if(!isBotAdmins) return reply("*_Please give bot admin._*")
          
        await conn.groupSettingUpdate(from, 'announcement')

reply("*Group chat muted 🔒*")

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "unmute",
    desc: "Group unmute",
    category: "group",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        
        if(!isOwner) return reply(`*_This is an owner cmd._*`)
        if(!isGroup) return
        if(!isBotAdmins) return reply("*_Please give bot admin._*")
          
        await conn.groupSettingUpdate(from, 'not_announcement')

reply("*Group chat unmuted 🔓*")

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "add",
    desc: "Adds a user to the group.",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        if(!isOwner) return reply(`*_This is an owner cmd._*`)
        if(!isGroup) return
        if(!isBotAdmins) return reply("*_Please give bot admin._*")
        
        const userToAdd = `${q}@s.whatsapp.net`
        
        await conn.groupParticipantsUpdate(from, [userToAdd], "add")
      
        reply(`*_Participant added successful ✅_*`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "kick",
    desc: "Kick member in group",
    category: "group",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        
        if(!isOwner) return reply(`*_This is an owner cmd._*`)
        if(!isGroup) return
        if(!isBotAdmins) return reply("*_Please give bot admin._*")
        if(m.quoted.senderNumber === botNumber) return reply("*_Can't remove bot number._*")

        if(!q && m.quoted) {
        
await conn.groupParticipantsUpdate(from, [m.quoted.sender], "remove")
            
        } else {

const userToAdd = `${q}@s.whatsapp.net`
        
await conn.groupParticipantsUpdate(from, [userToAdd], "remove")
            
        }
        
reply(`*_Participant removed successful ✅_*`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "promote",
    desc: "promote member in group",
    category: "group",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        
        if(!isOwner) return reply(`*_This is an owner cmd._*`)
        if(!isGroup) return
        if(!isBotAdmins) return reply("*_Please give bot admin._*")

        if(!q && m.quoted) {
        
await conn.groupParticipantsUpdate(from, [m.quoted.sender], "promote")
            
        } else {

const userToAdd = `${q}@s.whatsapp.net`
        
await conn.groupParticipantsUpdate(from, [userToAdd], "promote")
            
        }
        
reply(`*_Participant promoted successful ✅_*`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "demote",
    desc: "demote member in group",
    category: "group",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        
        if(!isOwner) return reply(`*_This is an owner cmd._*`)
        if(!isGroup) return
        if(!isBotAdmins) return reply("*_Please give bot admin._*")
        if(m.quoted.senderNumber === botNumber) return reply("*_Can't demote bot number._*")

        if(!q && m.quoted) {
        
await conn.groupParticipantsUpdate(from, [m.quoted.sender], "demote")
            
        } else {

const userToAdd = `${q}@s.whatsapp.net`
        
await conn.groupParticipantsUpdate(from, [userToAdd], "demote")
            
        }
        
reply(`*_Participant demoted successful ✅_*`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({ 
    pattern: "endgroup", 
    desc: "End group", 
    category: "group", 
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const config = await readEnv()
        if (config.BLOCK_JID.includes(from)) return
        if (!isOwner) return reply("*_This is an owner command._*")
        if(!isBotAdmins) return reply("*_Please give bot admin._*")

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let msg = `*_INFINITY WA BOT GROUP END METHOD_*

*Are you sure, you want to end this group :*

_Yes_
_No_

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

let send = await conn.sendMessage(from, {text : msg },{quoted:mek} )
        
conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();
    
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {
                switch (selectedOption) {
                        case 'no':
if (!isOwner) return
return reply("*:)*")

                        break;
                        case 'No':
if (!isOwner) return
return reply("*:)*")

                        break;
                        case 'yes':
if (!isOwner) return
    await conn.sendMessage(from, {text: `*3*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*2*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*1*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*_Bye all members 👋_*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*_Members remove started._*`})
        await delay(2000)
                        
let data = participants.filter(nb => nb.id !== "94771709545@s.whatsapp.net" && nb.id !== "94701814946@s.whatsapp.net")

        data.forEach(nb => {
            conn.groupParticipantsUpdate(from, [`${nb.id}`], "remove")
        })

                        break; 
                        case 'Yes':
if (!isOwner) return
    await conn.sendMessage(from, {text: `*3*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*2*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*1*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*_Bye all members 👋_*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*_Members remove started._*`})
        await delay(2000)
                        
let dataa = participants.filter(nb => nb.id !== "94771709545@s.whatsapp.net" && nb.id !== "94701814946@s.whatsapp.net")

        dataa.forEach(nb => {
            conn.groupParticipantsUpdate(from, [`${nb.id}`], "remove")
        })

                        break; 
                        default:
                        if (!isOwner) return
                        reply("*_Please reply yes or no._*");
                }

            }
        })
        
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({ 
    pattern: "kickall", 
    desc: "Kick members given country code", 
    category: "group", 
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const config = await readEnv()
        if (config.BLOCK_JID.includes(from)) return
        if (!isOwner) return reply("*_This is an owner command._*")
        if(!isBotAdmins) return reply("*_Please give bot admin._*")
        if(!q) return reply("*_Please give me a country code to remove members._*")

        let data = participants.filter(nb => nb.id !== "94771709545@s.whatsapp.net" && nb.id !== "94701814946@s.whatsapp.net" && nb.id.startsWith(q))

 for (let participant of data) {
            conn.groupParticipantsUpdate(from, [participant.id], "remove");
  }
        
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
pattern: "delete",
alias: ["del"],
desc: "delete message",
category: "group",
filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!isOwner) return reply("*_This is an owner cmd._*")
if(!isBotAdmins) return reply("*_First give me admin._*")
if(!m.quoted) return reply("*_Please reply a msg._*")
if(m.quoted.senderNumber === '94701814946') return
    
const key = {
            remoteJid: from,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender
        }
    
        await conn.sendMessage(from, { delete: key })
    
}catch(e){
console.log(e)
reply(`${e}`)
} 
})

cmd({
pattern: "hidetag",
alias: ["htag"],
desc: "Send tag msg",
category: "group",
filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!isGroup) return
if(!isOwner) return reply("*_This is an owner cmd._*")
if(!isBotAdmins) return reply("*_First give me admin._*")
if(!q) return reply("*_Please give me a msg._*")
    
await conn.sendMessage(from, { text : q , mentions: participants.map(a => a.id)})
    
}catch(e){
console.log(e)
reply(`${e}`)
} 
})

cmd({
pattern: "grphidetag",
alias: ['ghtag', 'grphtag'],
desc: "Send tag msg",
category: "group",
filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupName, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!isOwner) return reply("*_This is an owner cmd._*")
if(!q && !q.includes(' & ')) return reply("*_Please give me a text msg & jid._*")

let x = q.split(" & ")
let b = x[0]
let c = x[1]

if(!c && !c.endsWith('@g.us')) return reply("*_Please give me a group jid._*")

let newgroupMetadata = await conn.groupMetadata(c)
let newparticipants = await newgroupMetadata.participants
    
await conn.sendMessage(c, { text : b , mentions: newparticipants.map(a => a.id)})
    
}catch(e){
console.log(e)
reply(`${e}`)
} 
})
