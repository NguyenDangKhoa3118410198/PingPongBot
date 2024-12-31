export const listUsers = async (interaction) => {
  const guild = interaction.guild;
  if (!guild) {
    return interaction.reply('Lệnh này chỉ có thể dùng trong server!');
  }

  try {
    const members = await guild.members.fetch();
    const memberList = members.map((member) => member.user.tag).join('\n');

    if (memberList.length > 100) {
      return interaction.reply('Danh sách quá dài, không thể gửi đầy đủ!');
    }

    interaction.reply(`Danh sách thành viên:\n${memberList}`);
  } catch (error) {
    console.error(error);
    interaction.reply('Có lỗi khi lấy danh sách thành viên.');
  }
};

export const help = async (interaction) => {
  return interaction.reply(`
\`\`\`
Danh sách lệnh:
  - /ping : Kiểm tra bot có hoạt động.
  - /hello : Chào bot.
  - /list-users : Liệt kê danh sách thành viên trong server.
  - /help : Hiển thị hướng dẫn sử dụng.
\`\`\`
    `);
};

export const ping = async (interaction) => {
  return interaction.reply('Ping Ping Pong! I am a bot.');
};

export const hello = async (interaction) => {
  return interaction.reply(
    `Hello ${interaction.user.globalName || interaction.user.username}!`
  );
};

const getResult = (userChoice, botChoice) => {
  if (userChoice === botChoice) return 'Hòa!';
  if (
    (userChoice === 'keo' && botChoice === 'bao') ||
    (userChoice === 'bua' && botChoice === 'keo') ||
    (userChoice === 'bao' && botChoice === 'bua')
  ) {
    return 'Bạn thắng!';
  }
  return 'Bot thắng!';
};

const convertChoice = (choice) => {
  if (choice === 'keo') return 'Kéo';
  if (choice === 'bua') return 'Búa';
  if (choice === 'bao') return 'Bao';
};

export const rockPaperScissors = async (interaction) => {
  const userChoice = interaction.options.getString('choice');
  const botChoice = ['keo', 'bua', 'bao'][Math.floor(Math.random() * 3)];
  const result = getResult(userChoice, botChoice);

  await interaction.reply(
    `🎮 **Kết quả trò chơi Oẳn Tù Xì** 🎮\n\n
    🙋 Bạn chọn: **${convertChoice(userChoice)}**\n
    🤖 Bot chọn: **${convertChoice(botChoice)}**\n\n
    📢 **Kết quả:** **${result}**`
  );
};
