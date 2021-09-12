module.exports = {
    name: 'loop',
    description: 'Loop command',
    guildOnly: true,
    async execute(client, interaction) {
        const player = client.manager.get(interaction.guild.id);
        const voiceChannel = member.voice.channel;
        if(!player) return await interaction.reply('No está sonando nada por ahora')
        if (!member.voice.channel) return await interaction.reply("❌ | You must be in a voice channel to use this command.");
        if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return await interaction.reply(":x: | **You must be in the same voice channel as me to use this command!**");
        if(player.trackRepeat){
            player.setTrackRepeat(false)
            await interaction.reply(interaction, `🔂 \`Disabled\``);
        }else{
            player.setTrackRepeat(true)
            await interaction.reply(interaction, `🔂 \`Enabled\``);
        }
    }
}