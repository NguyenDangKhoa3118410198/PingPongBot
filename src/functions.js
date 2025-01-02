import { AttachmentBuilder } from 'discord.js';

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
  - /rock-paper-scissors : Trò chơi Oẳn Tù Xì.
  - /happy-new-year : Chúc mừng năm mới.
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

  if (!['keo', 'bua', 'bao'].includes(userChoice)) {
    return interaction.reply('❌ Vui lòng chọn giữa "kéo", "búa", hoặc "bao"');
  }

  const botChoice = ['keo', 'bua', 'bao'][Math.floor(Math.random() * 3)];
  const result = getResult(userChoice, botChoice);

  await interaction.reply(
    `🎮 **Kết quả trò chơi Oẳn Tù Xì** 🎮\n\n
    🙋 Bạn chọn: **${convertChoice(userChoice)}**\n
    🤖 Bot chọn: **${convertChoice(botChoice)}**\n\n
    📢 **Kết quả:** **${result}**`
  );
};

export const happyNewYear = async (interaction) => {
  try {
    const gifAttachment = new AttachmentBuilder('src/imgs/firework.gif');
    await interaction.reply({
      content:
        '🎉 Chúc mừng năm mới! Chúc bạn một năm tràn đầy hạnh phúc và thành công! 🎆',
      files: [gifAttachment],
    });

    setTimeout(() => {
      interaction.followUp(
        '✨ Năm mới rực rỡ, may mắn tràn đầy! Chúc mọi điều tốt lành đến với bạn! ✨'
      );
    }, 2000);
  } catch (error) {
    console.error('Lỗi Happy New Year:', error);
    await interaction.followUp(
      '❌ Có lỗi xảy ra khi gửi lời chúc mừng năm mới!'
    );
  }
};

export const clear = async (interaction) => {
  if (!interaction.member.permissions.has('ADMINISTRATOR')) {
    return interaction.reply({
      content: '❌ Bạn cần quyền **Quản trị viên** để sử dụng lệnh này!',
      ephemeral: true,
    });
  }

  const amount = interaction.options.getInteger('amount');

  if (amount < 1 || amount > 100) {
    return interaction.reply({
      content: '❌ Vui lòng nhập số lượng tin nhắn từ 1 đến 100!',
      ephemeral: true,
    });
  }

  try {
    await interaction.channel.bulkDelete(amount, true);
    return interaction.reply(`✅ Đã xóa ${amount} tin nhắn trong kênh!`);
  } catch (error) {
    console.error('Lỗi khi xóa tin nhắn:', error);
    return interaction.reply('❌ Có lỗi xảy ra khi xóa tin nhắn!');
  }
};
