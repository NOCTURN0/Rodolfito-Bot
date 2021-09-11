const Discord = require('discord.js');
const cooldown = new Set();

module.exports = async (client, interaction) => {
    if(interaction.isCommand()){
        if (cooldown.has(interaction.user.id)){
            return interaction.reply({ content: 'Hey, espera a que acabe de ejecutarse este comando!', ephemeral: true });
        }
        const command = client.commands.get(interaction.commandName)
        if (!command) return interaction.reply({ content: "That command doesn't exist", ephemeral: true });
        if (!interaction.guild && command.guildOnly) return interaction.reply("This command only works on servers");
        try {
            cooldown.add(interaction.user.id);
            await command.execute(client, interaction);
        } catch (err) {
          console.log(err)
            if (err.name === "StructureError") return interaction.reply(err.message).catch(() => { });
            console.error(err);
            await interaction.reply("Something happened! Here's a debug: " + err).catch(() => { });
        } finally {
            cooldown.delete(interaction.user.id);
        }
    }
}