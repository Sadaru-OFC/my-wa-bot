const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "test",
    desc: "AI chat feature",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

const url = "https://09.cscloud12.online/cscloud?file=Nzg0xFED5800B537160029B3B9325981d92d1Ab8727A3Vltk4xOyZPINkil%2FMsEMg4xVwez&expiry=zNHD%2Bf85JywTzoM%2FiTG6Pg%3D%3D&mac=cb825d4db6e8be1ed8074bb76cafa04ad227c6668b49ca8131e36773f0992a34&acc=5";

function getFileNameFromUrl(url) {
    const indexOfLastSlash = url.lastIndexOf("/");
    const urlWithoutSlash = url.substring(0, indexOfLastSlash);
    const fileNameWithQueryParams = urlWithoutSlash.substring(urlWithoutSlash.lastIndexOf("/") + 1);
    const fileName = fileNameWithQueryParams.split("?")[0];
    
    return fileName;
}

const fileName = getFileNameFromUrl(url);
console.log(fileName);

}catch(e){
console.log(e)
reply(`${e}`)
}
})
