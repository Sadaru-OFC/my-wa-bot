const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const axios = require('axios');
const cheerio = require('cheerio');

cmd({
  pattern: "test2",
  desc: "test",
  category: "owner",
  filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const config = await readEnv();
    if (config.BLOCK_JID.includes(from)) return;

    const url = `https://cinesubz.co/?s=${q}`;
    const moviesData = {};

    async function getHTML() {
      const { data: html } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        },
      });
      return html;
    }

    getHTML().then((res) => {
      const $ = cheerio.load(res);
      let results = ''; // String to store formatted results

      $('#contenedor > div.module > div.content.rigth.csearch > div.search-page').map((i, movie) => {
        const title = $(movie).find('.title > a').text().trim();
        const rating = $(movie).find('.meta > span:nth-child(1)').text().trim();

        // Build the formatted result string
        results += `${title} : ${rating}\n`; // Use newline character for each entry
      });

      // Check if any results were found
      if (results) {
        reply(results); // Send the formatted results
      } else {
        reply('No search results found.'); // Inform user if no movies found
      }
    });
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});
