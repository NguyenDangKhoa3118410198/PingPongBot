import 'dotenv/config';
import express from 'express';
import { Client, GatewayIntentBits } from 'discord.js';
import { registerSlashCommands, handleSlashCommand } from './slashes.js';
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

  const GUILD_IDS = process.env.GUILD_IDS.split(',');
  for (const GUILD_ID of GUILD_IDS) {
    await registerSlashCommands(GUILD_ID);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  await handleSlashCommand(interaction);
});

client.login(TOKEN);

app.get('/', (req, res) => {
  res.send('Discord bot is running');
});

export default app;
