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

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content === '!ping') {
    message.reply('Ping Ping Pong! I am a bot.');
  }

  if (message.content === 'hello') {
    message.reply(`Hello ${message.author.globalName}!`);
  }
});

client.login(TOKEN);

app.get('/', (req, res) => {
  res.send('Discord bot is running');
});

module.exports = app;
