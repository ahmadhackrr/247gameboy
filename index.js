const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 🌐 Web server for UptimeRobot
app.get('/', (req, res) => res.send('🟢 Bot is online'));
app.listen(3000, () => console.log('🌐 Web server running on port 3000...'));

// 🤖 Bot Function
function createBot() {
  const bot = mineflayer.createBot({
    host: 'blockbricks.sdlf.fun',
    port: 25565,
    username: '247gameboy',
    version: false, // auto-detect
    auth: 'offline'
  });

  bot.on('spawn', () => {
    // 🔐 Login command (register already done)
    setTimeout(() => {
      bot.chat('/login Pattoki42@@');
    }, 3000);

    // 💬 Auto Chat every 2 minutes
    setInterval(() => {
      bot.chat('My life is gaming');
    }, 120000); // 2 minutes

    // 🕴️ Anti-AFK movement
    let jumping = false;
    setInterval(() => {
      bot.setControlState('jump', jumping);
      bot.setControlState('forward', jumping);
      jumping = !jumping;
    }, 15000); // every 15s
  });

  // 🔁 Auto Reconnect
  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => {
    console.log('❌ Bot error:', err);
  });
}

createBot();
