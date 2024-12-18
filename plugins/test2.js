const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "test2",
    desc: "test",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

const url = `https://cinesubz.co/?s=${q}`;

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
  
const titles = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page')
  .find('.title > a')
  .map((i, el) => $(el).text().trim())
  .get()
  .join('\n');

const ratings = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page')
  .find('.meta > span:nth-child(1)')
  .map((i, el) => $(el).text().trim())
  .get()
  .join('\n');

const dates = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page')
  .find('.meta > span.year')
  .map((i, el) => $(el).text().trim())
  .get()
  .join('\n');

const imgs = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page')
  .find('.image > div > a > img')
  .map((i, el) => $(el).attr('src'))
  .get()
  .join('\n');

const urls = $('#contenedor > div.module > div.content.rigth.csearch > div.search-page')
  .find('.image > div > a')
  .map((i, el) => $(el).attr('href'))
  .get()
  .join('\n');

let nTitle = JSON.stringify(titles)
  
console.log(nTitle[0]);

});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
