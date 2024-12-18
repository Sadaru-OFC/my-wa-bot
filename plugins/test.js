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
  const { data: html } = await axios.get(url);
  return html;
};

getHTML().then((res) => {
const $ = cheerio.load(res);
$('.ipc-metadata-list ipc-metadata-list--dividers-between sc-a1e81754-0 iyTDQy compact-list-view ipc-metadata-list--base').each((i, movie) => {
  const title = $(movie).find('.ipc-title ipc-title--base ipc-title--title ipc-title-link-no-icon ipc-title--on-textPrimary sc-a69a4297-2 bqNXEn cli-title with-margin > a > h3').text().trim();
  const rating = $(movie).find('.ipc-rating-star--rating').text().trim();
  moviesData[title] = rating;
});
  fs.writeFile('moviesData.json', JSON.stringify(moviesData), (err) => {
    if (err) throw err;
    console.log('file saved!');
  });
});
  
}catch(e){
console.log(e)
reply(`${e}`)
}
})
