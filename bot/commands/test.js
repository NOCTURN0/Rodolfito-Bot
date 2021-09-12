const Discord = require('discord.js');

module.exports = {
    name: 'test',
    description: 'Test command',
    cooldown: 10,
    async execute(client, interaction) {
        await interaction.reply('Test command')
    }
}