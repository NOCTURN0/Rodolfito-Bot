module.exports = {
    name: 'skip',
    description: 'Skip the song',
    guildOnly: true,
    async execute(client, interaction) {
        const player = client.manager.get(interaction.guild.id);
        player.stop();
        await interaction.reply('Se ha saltado la canción')
    }
}