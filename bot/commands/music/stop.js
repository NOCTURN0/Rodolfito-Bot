module.exports = {
    name: 'stop',
    description: 'Stop the music and end the queue',
    guildOnly: true,
    async execute(client, interaction) {
        const player = client.manager.get(interaction.guild.id);
        player.destroy();
        await interaction.reply('Se ha parado la musica y se ha eliminado la cola')
    }
}