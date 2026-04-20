const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3001;

// GÜNCEL TOKEN BURADA
const BOT_TOKEN = '8629686439:AAGyQzBfMENfEwIfWV9TyO7vPbfXo2IkPKw';
const CHAT_ID = '6760722119';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const startBot = async () => {
  let lastUpdateId = 0;
  setInterval(async () => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${lastUpdateId + 1}`);
      const data = await response.json();
      if (data.result && data.result.length > 0) {
        for (const update of data.result) {
          lastUpdateId = update.update_id;
          const chatId = update.message.chat.id;
          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `✅ PRO-MAX Sistemi Aktif!\n\nEşleştirme Kodunuz: ${chatId}`,
            }),
          });
        }
      }
    } catch (err) {}
  }, 3000);
};

startBot();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});