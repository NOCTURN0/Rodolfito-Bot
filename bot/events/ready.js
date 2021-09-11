module.exports = async (client) => {
    console.log('The bot has connected successfuly to Discord like ' + client.user.tag);
    const testingserver = client.guilds.cache.get('753168881215995915');

    require("../../utils/registerSlashCMDs")(client, testingserver)

}