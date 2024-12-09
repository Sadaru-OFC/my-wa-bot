const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
    
SESSION_ID: process.env.SESSION_ID || "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=uipClADK#TopMVXyrDmHa5OBfsn95a4Rsl-86_6NU_Us593uv72E",
MONGODB: process.env.MONGODB || "mongodb://mongo:ZNQtexHcMQJddDjdpPnBYThOBsYzEjDr@junction.proxy.rlwy.net:55587",
    
};
