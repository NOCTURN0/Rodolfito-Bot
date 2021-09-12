module.exports = {
    name: 'pause',
    description: 'Pause the music',
    cooldown: 3,
    guildOnly: true,
    async execute(client, interaction) {
        const player = client.manager.get(interaction.guild.id);
        
        if(!interaction.member.voice.channel) {
            return await interaction.reply('No estas en un canal de voz')
        }

        if(!player) {
            return await interaction.reply('No se está reproduciendo musica')
        }

        player.pause(true)
        await interaction.reply('Se ha pausado la musica')
    }
}