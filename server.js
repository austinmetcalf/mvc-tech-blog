const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
// const { truncate } = require('fs');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'austin',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10,
        expiration: 1000 * 60 * 30
    })
};

const app = express ();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
    helpers
});

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');

app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

sequelize.sync({force: false}).then(function(){
    app.listen(PORT,()=>{
        console.log(`App listening on port ${PORT}!`);
    });
});
