const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('🟢 Bot is online'));
app.listen(PORT, () => console.log(`🌐 Web server running on port ${PORT}...`));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'blockbricks.sdlf.fun',
    port: 25565,
    username: '247gameboy',
    version: false,
    auth: 'offline'
  });

  bot.on('spawn', () => {
    setTimeout(() => {
      bot.chat('/login Pattoki42@@');
    }, 3000);

    setInterval(() => {
      bot.chat('My life is gaming');
    }, 120000);

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
