const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const token = process.env.BOT_TOKEN;
// Polling: false yapıyoruz çünkü artık Webhook kullanacağız
const bot = new TelegramBot(token);

app.use(express.json());

// Telegram'ın mesajları göndereceği yol
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Bot mesaj geldiğinde ne yapacak?
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "✅ **BAĞLANTI BAŞARILI!** \n\n🔑 Eşleştirme Kodunuz: `6760722119` \n\nSistem artık Webhook ile 7/24 aktif.");
});

// Ana sayfa kontrolü
app.get('/', (req, res) => {
  res.send('Bot Webhook Modunda Çalışıyor...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} üzerinde uyanık.`);
});