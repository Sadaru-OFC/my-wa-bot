const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const puppeteer = require('puppeteer')

cmd({
    pattern: "test2",
    desc: "test",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv()
if(config.BLOCK_JID.includes(from)) return

const browser = await puppeteer.launch()
const page = await browser.newPage()

// Navigate the page to a URL.
await page.goto('https://www.google.com/')

// Set screen size.
await page.setViewport({width: 1080, height: 1024})

// Type into search box.
await page.locator('.emcav textarea.gLFyf').fill('whatsapp')

// Wait and click on first result.
const fullTitle = await page.locator('element.style').click()

console.log(fullTitle)

await browser.close()
  
}catch(e){
console.log(e)
reply(`${e}`)
}
})
