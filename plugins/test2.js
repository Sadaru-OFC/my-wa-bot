const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "test2",
    desc: "cinesubz.co info",
    category: "search",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
    
const url = `https://cinesubz.co/?s=${q}`;

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract the data you need from the search results
    $('#contenedor > div.module > div.content.rigth.csearch > div.search-page').each((index, element) => {
      const title = $(element).find('article > div.details > div.title > a').text();
      const link = $(element).find('article > div.image > div > a').attr('href');
      
      console.log(`Link: ${link}\n`);
    });
  })
  .catch(error => {
    console.error('Error fetching search results:', error);
  });


}catch(e){
console.log(e)
reply(`${e}`)
}
})
