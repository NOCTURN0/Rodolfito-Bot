const Discord = require('discord.js');
const fs = require('fs');
var AsciiTable = require("ascii-table")
var eventTable = new AsciiTable("Event Handler")
var commandTable = new AsciiTable("Command Handler")

class Bot extends Discord.Client {
    constructor(){
        super({
            ws: {
                properties: {
                    $browser: 'Discord Android'
                }
            },
            intents: 32767,
            allowedMentions: {
                repliedUser: false
              }
        });
        this.commands = new Discord.Collection();
        this.config = require('../../config');
    }

    registerCommands(){
        commandTable.setHeading('Comando', "Estado")
        let commandsDir = this.config.commandsDir 
        function getDirectories(client, commandsDir) {
            return fs.readdirSync(commandsDir).filter((file) => {
            return fs.statSync(commandsDir+"/"+file).isDirectory()
            });
        }
        let commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'))
        for(const folder of getDirectories(this, commandsDir)){ 
            let archivos = fs.readdirSync(commandsDir + '/' + folder).filter(file => file.endsWith(".js"))
            for(const archivo of archivos){
                commandFiles.push([folder, archivo]);  
            } 
        } 

for (const file of commandFiles) {
    let command
    let commandName
    if (Array.isArray(file)) {
        command = require(`${commandsDir}/${file[0]}/${file[1]}`);
        commandName = file[1].split('.')[0]
        table.addRow(commandName, "✔")
      
    }
    else {
        command = require(`${commandsDir}/${file}`);
                 commandName = file.split('.')[0]
        commandTable.addRow(commandName, "✔")
  } 
  this.commands.set(commandName, command);
}
    }

    registerEvents(){
        eventTable.setHeading("Evento", "Estado")
        const eventsDir = this.config.eventsDir;
        const EVENTS = fs.readdirSync(eventsDir).filter(x => x.endsWith(".js"));
      
        let i = 0;
      
        for (const event of EVENTS) {
            const ev = require(`${eventsDir}/${event}`);
            const evName = event.split(".js")[0]
            this.on(evName, ev.bind(null, this))
      
            eventTable.addRow(evName, "✔")
            i++;
        }
    }
      
    build(){
        this.registerCommands()
        this.registerEvents()
        console.log(commandTable.toString())
        console.log(eventTable.toString())
        return this.login(process.env.TOKEN)
    }
}

module.exports = Bot;