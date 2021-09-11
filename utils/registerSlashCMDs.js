module.exports = async (client, guild) => {
    client.commands.forEach(async command => {
        if(!command || !command.execute) return;
        let dataStuff = {
            name: command.name,
            description: command.description || 'Sin Descripción',
            options: command.options
        }
        
        try {
            await client.guilds.cache.get(guild.id).commands.create(dataStuff);
        } catch (err) {
            console.log('Ha ocurrido un error: ' + err.message)
        }
    })
}