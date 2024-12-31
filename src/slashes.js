const { REST, Routes } = require('discord.js');
const functions = require('./functions');
const { TOKEN, CLIENT_ID } = process.env;

const commands = [
  { name: 'ping', description: 'Kiểm tra bot có hoạt động không' },
  { name: 'hello', description: 'Chào bot' },
  {
    name: 'list-users',
    description: 'Liệt kê danh sách thành viên trong server',
  },
  { name: 'help', description: 'Hiển thị danh sách lệnh' },
  {
    name: 'rock-paper-scissors',
    description: 'Chơi Oẳn Tù Xì với bot',
    options: [
      {
        name: 'choice',
        type: 3,
        description: 'Chọn Kéo, Búa hoặc Bao',
        required: true,
        choices: [
          { name: '✂️ Kéo', value: 'keo' },
          { name: '🪨 Búa', value: 'bua' },
          { name: '📜 Bao', value: 'bao' },
        ],
      },
    ],
  },
];

const registerSlashCommands = async (guildId) => {
  const rest = new REST({ version: '10' }).setToken(TOKEN);

  try {
    console.log(
      `Đang đăng ký lệnh Slash ${
        guildId ? `cho server: ${guildId}` : 'toàn cục'
      }`
    );
    const route = guildId
      ? Routes.applicationGuildCommands(CLIENT_ID, guildId)
      : Routes.applicationCommands(CLIENT_ID);

    await rest.put(route, { body: commands });
    console.log(`Đã đăng ký lệnh Slash thành công!`);
  } catch (error) {
    console.error('Lỗi khi đăng ký lệnh Slash:', error);
  }
};

const handleSlashCommand = async (interaction) => {
  const { commandName } = interaction;

  const formattedCommandName = commandName
    .split('-')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');

  if (functions[formattedCommandName]) {
    return functions[formattedCommandName](interaction);
  }

  return interaction.reply({ content: 'Lệnh không hợp lệ!', ephemeral: true });
};

module.exports = { registerSlashCommands, handleSlashCommand };
