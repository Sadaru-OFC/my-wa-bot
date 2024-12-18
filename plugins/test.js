const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "test",
    desc: "test",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

const url = 'https://www.imdb.com/chart/top/';

const moviesData = {};

async function getHTML () {
  const { data: html } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    }
  });
  return html;
};

getHTML().then((res) => {
const $ = cheerio.load(res);
$('#__next > main > div > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.ipc-page-grid.ipc-page-grid--bias-left > div > ul').each((i, movie) => {
  const title = $(movie).find('.ipc-title__text').text().trim();
  const rating = $(movie).find('.ipc-rating-star--rating').text().trim();
  moviesData[title] = rating;
});
reply(JSON.stringify(moviesData))
});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
