module.exports = {
    name: 'resume',
    description: 'Resume the paused music',
    cooldown: 3,
    guildOnly: true,
    async execute(client, interaction) {
        const player = client.manager.get(interaction.guild.id);
        
        if(!interaction.member.voice.channel) {
            return await interaction.reply('No estas en un canal de voz')
        }

        player.pause(false)
        await interaction.reply('Se ha reanudado la musica')
    }
}