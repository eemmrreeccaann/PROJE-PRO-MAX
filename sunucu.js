const TelegramBot = require('node-telegram-bot-api');

// Vercel Gizli Kasasından Verileri Çek
const token = process.env.BOT_TOKEN;

// Botu Daha Kararlı Bir Ayarla Başlat
const bot = new TelegramBot(token, { 
    polling: {
        interval: 300,
        autoStart: true,
        params: { timeout: 10 }
    } 
});

console.log("🚀 Sunucu başlatıldı, bot sinyal bekliyor...");

// Birisi mesaj attığında çalışacak ana motor
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const isim = msg.from.first_name || "Değerli Kullanıcı";

    try {
        // Kullanıcıya şık bir karşılama ve kod gönder
        const cevap = `Merhaba ${isim}! 👋\n\n✅ **PRO-MAX Sistemi Aktif Edildi**\n\n🔑 Eşleştirme Kodunuz: \`6760722119\`\n\n⚠️ Bu kodu sisteme girerek oturumunuzu başlatabilirsiniz.`;
        
        await bot.sendMessage(chatId, cevap, { parse_mode: 'Markdown' });
        console.log(`✅ Kod gönderildi: ${isim} (${chatId})`);
        
    } catch (error) {
        console.error("❌ Mesaj gönderme hatası:", error.message);
    }
});

// Arka planda bir hata olursa sunucuyu çökertme, hatayı yazdır
bot.on('polling_error', (error) => {
    // Sadece çok kritik hataları logla (Gereksiz kalabalığı önler)
    if (error.code !== 'EFATAL') {
        console.log("Bağlantı tazelemeye çalışılıyor...");
    } else {
        console.error("Kritik Bot Hatası:", error);
    }
});