const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs-extra')

cmd({
    pattern: "test",
    desc: "test",
    category: "download",
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
  const title = $(movie).find('.div.ipc-title.ipc-title--base.ipc-title--title.ipc-title-link-no-icon.ipc-title--on-textPrimary.sc-a69a4297-2.bqNXEn.cli-title.with-margin > a > h3').text().trim();
  const rating = $(movie).find('.span > div > span > span.ipc-rating-star--rating').text().trim();
  if (title && rating) {
          moviesData[title] = rating;
        }
      });

      console.log('Scraped movie data:', moviesData);
    }
  })
  .catch((error) => {
    console.error('Error scraping data:', error);
  });
  
}catch(e){
console.log(e)
reply(`${e}`)
}
})
