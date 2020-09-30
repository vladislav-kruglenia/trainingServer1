const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let myDb;


const app = express();
app.use(bodyParser.json());


//GET
app.get('/products', (req, res) => {
    myDb.collection('products').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        res.send(docs);
    })
    //    res.json(products)
});
//GET

//POST
app.post('/products', (req, res) => {
    let product = req.body;
    console.log(myDb);
    myDb.collection('products').insertOne(product, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(product)
    })
});
//POST

//PUT
app.put('/products/:id', (req, res) => {
    myDb.collection('products').updateOne(
        {_id: ObjectID(req.params.id)},
        {$set: {price: req.body.price}},
        {upsert: true},
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            res.sendStatus(200)
        })
});
//PUT

//DELETE
app.delete('/products/:id', (req, res) => {
    myDb.collection('products').deleteOne(
        {_id: ObjectID(req.params.id)},
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            res.sendStatus(200);
            res.json({success: true})
        });

});
//DELETE
MongoClient.connect('mongodb://localhost:27017/online-store',
    {
        useUnifiedTopology: true,  // установка опций
        useNewUrlParser: true
    },
    (err, database) => {
        if (err) {
            return console.log(err);
        }
        myDb = database.db('online-store');
        app.listen(3000, () => console.log('Listening on port 3000...'));
    }
);

