const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const token = process.env.BOT_TOKEN;
// Polling'i kapatıyoruz çünkü Vercel'de Webhook veya Express daha sağlıklı çalışır
const bot = new TelegramBot(token, { polling: true });

app.use(express.json());

// Tarayıcıdan siteye girince "Sistem Aktif" yazacak (Uyandırma servisi)
app.get('/', (req, res) => {
    res.send('PRO-MAX Sunucusu 7/24 Aktif!');
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    try {
        await bot.sendMessage(chatId, "✅ PRO-MAX Sistemi Aktif! \n\nEşleştirme Kodunuz: `6760722119` \n\nŞu an her şey yolunda!");
    } catch (e) {
        console.log("Hata:", e.message);
    }
});

// Vercel'in istediği port ayarı
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda hazır.`);
});