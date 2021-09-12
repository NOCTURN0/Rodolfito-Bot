const { Manager } = require('erela.js')
let Handler = require("./Base/handler.js")
const client = new Handler()

client.manager = new Manager({
    nodes: [
        {
            host: 'lava.link',
            port: 80,
            password: 'lavalinkpassword'
        }
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id)
        if (guild) guild.shard.send(payload)
    }
})

.on('nodeConnect', node => console.log(`Node ${node.options.identifier} connected`))
.on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
.on("trackStart", (player, track) => {
    client.channels.cache
      .get(player.textChannel)
      .send(`Now playing: ${track.title}`);
})
.on('queueEnd', (player) => {
    client.channels.cache
        .get(player.textChannel)
        .send('Queue has ended')
    player.destroy();
})

client.on('raw', (d) => client.manager.updateVoiceState(d));

client.build()

module.exports = client;