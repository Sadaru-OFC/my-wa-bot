const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')

cmd({
    pattern: "cinelink",
    desc: "cinesubz.co info",
    category: "search",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return
if(!q) return reply("*_Please give me a movie name._*")

let response = await axios.get(`https://cinesubz.co/?s=${q}`)
let $ = cheerio.load(response.data)
let url = $('#contenedor > div.module > div.content.rigth.csearch > div > div:nth-child(2) > article > div.details > div.title > a').attr('href')
    if(!url) {
        let errr = $('#contenedor > div.module > div.content.rigth.csearch > div > div.no-result.animation-2 > h2 > span').text()
        return reply(`No results to show with *${errr}*`)
    }
let result = await axios.get(`${url}`)
$ = cheerio.load(result.data)

const title = $('#single > div.content.right > div.sheader > div.data > h1').text()
const date = $('#single > div.content.right > div.sheader > div.data > div.extra > span.date').text()
const country = $('#single > div.content.right > div.sheader > div.data > div.extra > span.country').text()
const time = $('#single > div.content.right > div.sheader > div.data > div.extra > span.runtime').text()
const rate = $('#repimdb > strong').text()
const director = $('#cast > div:nth-child(2) > div > div.data > div.name > a').text()
const img = $('#single > div.content.right > div.sheader > div.poster > img').attr('src') 

const dd1 = $('#directdownloadlinks > div > div > table > tbody > tr')
const dd2 = $('#directandtgdownload > div > div > table > tbody > tr')
const dd3 = $('#download > div > div > table > tbody > tr')

let allids = []
    
dd1.each((index, element) => {
    const dlink = $(element).attr('id')
    allids.push(dlink)
})

dd2.each((index, element) => {
    const dlink2 = $(element).attr('id')
    allids.push(dlink2)
})

dd3.each((index, element) => {
    const dlink3 = $(element).attr('id')
    allids.push(dlink3)
})
    
let results = []

allids.forEach((id) => {
    const DlLinks = $(`#${id} > td:nth-child(1) > a`).attr('href') || 'No link found'
    const quality = $(`#${id} > td:nth-child(1) > a > strong`).text() || 'No quality found'
    
    results.push({ quality, DlLinks })
})

const details = results.map((link, index) => {
            return `${index + 1}. ${link.quality} : ${link.DlLinks}` 
        }).join("\n\n")

let msg = `*Movie name :* ${title}

*Date :* ${date}

*Runtime :* ${time}

*Link :* ${url}

*_Download Links_*

${details}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

reply(msg)
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
