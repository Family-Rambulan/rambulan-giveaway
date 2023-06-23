const ms = require("ms");
const messages = require("../utils/message");
module.exports.run = async (client, message, args) => {
  // If the member doesn't have enough permissions
  if (
    !message.member.permissions.has("ManageMessages") &&
    !message.member.roles.cache.some((r) => r.name === "Giveaways")
  ) {
    return message.reply(
      ":x: You need to have the manage messages permissions to start giveaways."
    );
  }

  // Giveaway channel
  let giveawayChannel = message.mentions.channels.first();
  // If no channel is mentionned
  if (!giveawayChannel) {
    return message.reply(":x: You have to mention a valid channel!");
  }

  // Giveaway duration
  let giveawayDuration = args[1];
  // If the duration isn't valid
  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return message.reply(":x: You have to specify a valid duration!");
  }

  // Number of winners
  let giveawayNumberWinners = parseInt(args[2]);
  // If the specified number of winners is not a number
  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return message.reply(":x: You have to specify a valid number of winners!");
  }

  // Giveaway role
  let giveawayRole = message.guild.roles.cache.get(
    args[3].replace(/[@&\/\\#,+()$~%.'":*?<>{}]/g, "")
  );
  // if the role isn't valid
  if (!giveawayRole) {
    return message.reply(":x: You have to specify a valid role.");
  }

  // Giveaway prize
  let giveawayPrize = args.slice(4).join(" ");
  // If no prize is specified
  if (!giveawayPrize) {
    return message.reply(":x: You have to specify a valid prize!");
  }

  messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Only members having <@&${giveawayRole.id}> are allowed to participate in this giveaway!`;

  // Start the giveaway
  await client.giveawaysManager.start(giveawayChannel, {
    // The giveaway duration
    duration: ms(giveawayDuration),
    // The giveaway prize
    prize: giveawayPrize,
    // The giveaway winner count
    winnerCount: parseInt(giveawayNumberWinners),
    // Who hosts this giveaway
    hostedBy: client.config.hostedBy ? message.author : null,
    // Messages
    messages,
    extraData: {
      server: message.guild.id,
      role: giveawayRole.id,
    },
  });
  message.reply(`Giveaway started in ${giveawayChannel}!`);
};
