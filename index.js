const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config/app');



const app = express();
require('./config/express')(app);

MongoClient.connect(config.mongoUrl,
    {
        useUnifiedTopology: true,  // установка опций
        useNewUrlParser: true
    },
    (err, database) => {
        if (err) {
            return console.log(err);
        }
        let myDb = database.db('online-store');
        require('./config/routes')(app, myDb);
        app.listen(config.appPort, () => console.log('Listening on port 3000...'));
    }
);






