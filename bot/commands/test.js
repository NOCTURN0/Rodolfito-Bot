const Discord = require('discord.js');

module.exports = {
    name: 'test',
    description: 'Test command',
    async execute(client, interaction) {
        interaction.reply('Test command')
    }
}