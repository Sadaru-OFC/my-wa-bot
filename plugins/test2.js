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
  const { data: html } = await axios.get(url);
  return html;
};

getHTML().then((res) => {
const $ = cheerio.load(res);
$('#contenedor > div.module > div.content.rigth.csearch').each((i, movie) => {
  const title = $(movie).find('.div.details > div.title > a').text().trim();
  const year = $(movie).find('.div.details > div.meta > span.year').text().trim();
  moviesData[title] = year;
});
console.log(JSON.stringify(moviesData));
});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

