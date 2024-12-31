require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const { registerSlashCommands, handleSlashCommand } = require('./slashes');

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

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const GUILD_ID = process.env.GUILD_ID;
  await registerSlashCommands(GUILD_ID);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  await handleSlashCommand(interaction);
});

client.login(TOKEN);

app.get('/', (req, res) => {
  res.send('Discord bot is running');
});

module.exports = app;
