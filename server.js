const path = require('path');
const express = require('express');
const hbs = exphbs.create({
    helpers
});
const routes = require('./controllers');
const sequelize = require('./utils/helpers');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const { truncate } = require('fs');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.DB_SECRET,
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

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');

app.use(session(sess));
app.use(express.static(path.join(_dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

sequelize.sync();
app.listen(PORT,()=>{
    console.log('App listening on port ${PORT}!');
});