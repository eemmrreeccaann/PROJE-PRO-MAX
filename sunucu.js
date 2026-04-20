const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const token = process.env.BOT_TOKEN;

// Polling ayarlarını Vercel'in uyku moduna göre optimize ettik
const bot = new TelegramBot(token, { 
    polling: {
        autoStart: true,
        interval: 100, // Daha sık kontrol etmesi için
        params: { timeout: 10 }
    } 
});

app.get('/', (req, res) => {
    res.send('PRO-MAX Sistemi Arka Planda Aktif!');
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    try {
        await bot.sendMessage(chatId, "✅ **Sistem Yanıt Veriyor!**\n\n🔑 Eşleştirme Kodunuz: `6760722119` \n\nŞu an her şey tıkırında çalışıyor.");
    } catch (e) {
        console.log("Mesaj gönderilemedi:", e.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda uyandırıldı.`);
});