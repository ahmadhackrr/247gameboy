const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// ✅ Required for Koyeb health check
app.get('/', (req, res) => res.send('🟢 Bot is online'));
app.listen(3000, () => console.log('🌐 Web server running on port 3000...'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'blockbricks.sdlf.fun',
    port: 25565,
    username: '247gameboy',
    version: false,
    auth: 'offline'
  });

  bot.on('spawn', () => {
    // 🔐 Sirf login (register pehle se ho chuka hai)
    setTimeout(() => {
      bot.chat('/login Pattoki42@@');
    }, 3000);

    // 💬 Auto chat every 2 minutes
    setInterval(() => {
      bot.chat('My life is gaming');
    }, 120000);

    // 🕴️ Anti-AFK movement
    let jumping = false;
    setInterval(() => {
      bot.setControlState('jump', jumping);
      bot.setControlState('forward', jumping);
      jumping = !jumping;
    }, 15000);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => {
    console.log('❌ Bot error:', err);
  });
}

createBot();
