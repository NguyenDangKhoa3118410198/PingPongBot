require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.TOKEN;

client.on('ready', () => {
  console.log(`Bot đã sẵn sàng, đăng nhập với tên ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content === 'hello') {
    message.reply(`Hello ${message.author.globalName}`);
  }
});

client.login(TOKEN);
