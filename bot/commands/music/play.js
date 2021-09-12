module.exports = {
    name: 'play',
    description: 'Play command',
    cooldown: 3,
    options: [
        {
            name: 'title',
            type: 'STRING',
            description: 'The song title',
            required: true
        },
    ],
    guildOnly: true,
    async execute(client, interaction) {
        if(!interaction.member.voice.channel) {
            return await interaction.reply('Debes estar en un canal de voz')
        }
        const title = interaction.options.get('title').value;
        const res = await client.manager.search(
            title,
            interaction.user
        );
        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
        });

        player.connect();

        player.queue.add(res.tracks[0]);
        interaction.reply(`Enqueuing track ${res.tracks[0].title}.`);

        if (!player.playing && !player.paused && !player.queue.size) player.play();
    }
}