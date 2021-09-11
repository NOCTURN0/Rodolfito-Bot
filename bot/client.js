let Handler = require("./Base/handler.js")
const client = new Handler()
client.build().catch(err => console.log(err))

module.exports = client;