const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')
const axios = require('axios');
const cheerio = require('cheerio');

cmd({
    pattern: "test",
    desc: "AI chat feature",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

axios.get('https://rest-api-dark-shan.vercel.app/')
  .then(response => {
    const $ = cheerio.load(response.data);
    const title = $('title').text();
    console.log(title);
  })
  .catch(error => {
    console.log(error);
  });


}catch(e){
console.log(e)
reply(`${e}`)
}
})
