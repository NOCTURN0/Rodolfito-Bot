module.exports = {
  name: "queue",
  description: "Cola de música",
  cooldown: 7,
  guildOnly: true,
  async execute(client, interaction){
    await interaction.reply("Queue")
  }
}