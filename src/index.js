require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();

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

// HTTP server để Vercel không tắt ứng dụng
app.get('/', (req, res) => {
  res.send('Bot Discord đang chạy!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
