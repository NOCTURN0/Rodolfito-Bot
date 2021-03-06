module.exports = {
    name: 'skip',
    description: 'Skip the song',
    guildOnly: true,
    async execute(client, interaction) {
        const player = client.manager.get(interaction.guild.id);
        const voiceChannel = member.voice.channel;
        if(!player) return await interaction.reply('No está sonando nada por ahora')
        if (!member.voice.channel) return await interaction.reply("❌ | You must be in a voice channel to use this command.");
        if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return await interaction.reply(":x: | **You must be in the same voice channel as me to use this command!**");
        player.stop();
        await interaction.reply('Se ha saltado la canción')
    }
}