const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const mime = require('mime-types')

cmd({
    pattern: "test",
    desc: "AI chat feature",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

function getMimeType(url) {
    const type = mime.lookup(url)
    return type
}

const url = 'https://09.cscloud12.online/cscloud?file=Nzg0xFED5800B537160029B3B9325981d92d1Ab8727A3Vltk4xOyZPINkil%2FMsEMg4xVwez&expiry=zNHD%2Bf85JywTzoM%2FiTG6Pg%3D%3D&mac=cb825d4db6e8be1ed8074bb76cafa04ad227c6668b49ca8131e36773f0992a34&acc=5'
const mimeType = getMimeType(url);

console.log(`MIME type of url is: ${mimeType}`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})
