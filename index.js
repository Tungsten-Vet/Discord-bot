const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Lệnh
const commands = {
    'ping': {
        note: 'Kiểm tra độ phản hồi của bot',
        handler: (message) => message.channel.send('🏓 Pong!'),
    },
    'hello': {
        note: 'Chào lại người dùng',
        handler: (message) => message.channel.send(`Chào chào cái maulon, ${message.author.username} ngu vl!`),
    },
    'ditnhau' : {
        note: '???',
        handler: (message) => message.channel.send('ăn rau'),
    },
    'tung' : {
        note: '???',
        handler: (message) => message.channel.send('tung tung tung tung tung sahur'),
    },
    'bot' : {
        note: 'Gọi bot',
        handler: (message) => message.channel.send('Xìn chào, tôi là ' + client.user.bot),
    },
};
// Thêm lệnh help
commands['help'] = {
    note: 'Hiển thị danh sách lệnh',
    handler: (message) => {
        const commandList = Object.entries(commands)
            .map(([name, obj]) => `• /${name} – ${obj.note}`)
            .join('\n');
        message.channel.send(`📃 Danh sách lệnh:\n${commandList}`);
    },
};

client.once('ready', () => {
    console.log(`🤖 Bot đã sẵn sàng với tên: ${client.user.tag}`);
    message.channel.send("Bot đang hoạt động");
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('/')) return;
    
    const command = message.content.slice(1);
    const cmdObj = commands[command];

    if (cmdObj && typeof cmdObj.handler === 'function') {
        cmdObj.handler(message);
    }
});

// ⚠️ THAY TOKEN dưới bằng token thật của bot bạn
client.login(process.env.DISCORD_BOT_TOKEN);
