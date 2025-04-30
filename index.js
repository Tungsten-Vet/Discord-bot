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

const axios = require('axios'); // Nhớ cài: npm install axios

commands['verify'] = {
    note: 'Xác minh và gửi tên đến webhook',
    handler: (message) => {
        const args = message.content.trim().split(' ');
        if (args.length < 2) {
            return message.channel.send('❌ Bạn phải nhập tên: `/verify <tên>`');
        }

        const name = args.slice(1).join(' ');
        const webhookURL = 'c5tntlbji165dbkyxqe92b0jv8xsi16j@hook.eu2.make.com'; // <-- sửa lại

        axios.post(webhookURL, { name, discord: message.author.username })
            .then(() => {
                message.channel.send(`✅ Đã gửi xác minh với tên: **${name}**`);
            })
            .catch(() => {
                message.channel.send('❌ Gửi webhook thất bại.');
            });
    },
};

client.once('ready', () => {
    console.log(`🤖 Bot đã sẵn sàng với tên: ${client.user.tag}`);
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
