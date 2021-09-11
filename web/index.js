const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars");
const session = require('express-session');

const app = express();

app.set('port', 3000)
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname + '/public')));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir: path.join(app.get('views'), '/partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: "logincondiscord",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ' + app.get('port'))
});
  
module.exports = app;