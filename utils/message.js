const config = require("../config.json");
module.exports = {
  giveaway:
    (config.everyoneMention ? "<@&1104207863292887191>\n\n" : "") +
    "🎉 **GIVEAWAY** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "<@&1104207863292887191>\n\n" : "") +
    "🎉 **GIVEAWAY ENDED** 🎉",
  drawing: `Ends: **{timestamp}**`,
  inviteToParticipate: `React with 🎉 to participate!`,
  winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "{this.winnerCount} winner(s)",
  noWinner: "Giveaway cancelled, no valid participations.",
  hostedBy: "Hosted by: {this.hostedBy}",
  winners: "winner(s)",
  endedAt: "Ended at",
};
