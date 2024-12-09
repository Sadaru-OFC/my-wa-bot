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

axios.get(`${q}`)
  .then(response => {
    const $ = cheerio.load(response.data)
    const title = $('#single > div.content.right > div.sheader > div.data > h1').text()
    const desc = $('#info > div:nth-child(2) > span').text()
    const date = $('#single > div.content.right > div.sheader > div.data > div.extra > span.date').text()
    const cnt = $('#single > div.content.right > div.sheader > div.data > div.extra > span.country').text()
    const dur = $('#single > div.content.right > div.sheader > div.data > div.extra > span.runtime').text()
    const cat = $('#single > div.content.right > div.sheader > div.data > div.sgeneros').text()
let msg = `${title}

${date}

${cnt}

${dur}

${cat}

${desc}`
      reply(msg)
      console.log(title)
      console.log(date)
      console.log(cnt)
      console.log(dur)
      console.log(cat)
      console.log(dasc)
  })
  .catch(error => {
    console.log(error);
  });

    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
