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
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply('Ping Ping Pong! I am a bot.');
  }

  if (message.content === 'hello') {
    message.reply(`Hello ${message.author.globalName || message.author.username}!`);
  }

  if (message.content === '!list-users') {
    const guild = message.guild;
    if (!guild) {
      return message.reply('Lệnh này chỉ có thể dùng trong server!');
    }

    try {
      const members = await guild.members.fetch();

      const memberList = members.map(member => member.user.tag).join('\n');

      if (memberList.length > 2000) {
        return message.reply('Danh sách quá dài, không thể gửi đầy đủ!');
      }

      message.reply(`Danh sách thành viên:\n${memberList}`);
    } catch (error) {
      console.error(error);
      message.reply('Có lỗi khi lấy danh sách thành viên.');
    }
  }
});

client.login(TOKEN);

app.get('/', (req, res) => {
  res.send('Discord bot is running');
});

module.exports = app;
