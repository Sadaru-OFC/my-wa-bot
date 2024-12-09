const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios');
const cheerio = require('cheerio');

cmd({
    pattern: "data",
    desc: "AI chat feature",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!isOwner) return reply("*_This is an owner cmd._*")

axios.get('${q}')
  .then(response => {
    const $ = cheerio.load(response.data);
    const title = $('#single > div.content.right > div.sheader > div.data > h1').text();
    const desc = $('#info > div:nth-child(2) > span').text();
    const url = $('#link-94773 > td:nth-child(1) > a').text();
  })
  .catch(error => {
    console.log(error);
  });

let msg = `${title}

${desc}

${url}`

reply(msg)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
