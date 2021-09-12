const Discord = require('discord.js');

module.exports = {
    name: 'test',
    description: 'Test command',
    cooldown: 10,
    async execute(client, interaction) {
        interaction.reply('Test command')
    }
}