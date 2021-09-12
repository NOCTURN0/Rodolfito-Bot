const Discord = require('discord.js');
const internalCooldown = new Set();
const cooldowns = new Discord.Collection();

module.exports = async (client, interaction) => {
    if(interaction.isCommand()) {
        if (internalCooldown.has(interaction.user.id)){
            return interaction.reply({ content: 'Hey, espera a que acabe de ejecutarse este comando!', ephemeral: true });
        }
        const command = client.commands.get(interaction.commandName)
        if (!command) return interaction.reply({ content: "That command doesn't exist", ephemeral: true });
        if (!interaction.guild && command.guildOnly) return interaction.reply("This command only works on servers");
        if(!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Discord.Collection())
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                interaction.reply('Debes esperar ' + timeLeft.toFixed(0) + 'segundos para volver a usar el comando ' + command.name)
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        try {
            internalCooldown.add(interaction.member.id);
            await command.execute(client, interaction);
        } catch (err) {
          console.log(err)
            if (err.name === "StructureError") return interaction.reply(err.message).catch(() => { });
            console.error(err);
            await interaction.reply("Something happened! Here's a debug: " + err).catch(() => { });
        } finally {
            internalCooldown.delete(interaction.user.id);
        }
    }
}