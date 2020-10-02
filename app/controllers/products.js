const ObjectID = require('mongodb').ObjectID;
const authMiddleware = require('./middlewares/authMiddleware');

module.exports = (app, myDb) =>{
    app.post('/products', authMiddleware, (req, res) => {
        console.log('POST работает');
        let product = req.body;
        myDb.collection('products').insertOne(product, (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            res.send(product)
        })
    });

    app.get('/products', authMiddleware,(req, res) => {
        console.log('GET работает');
        myDb.collection('products').find().toArray((err, docs) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }
            res.send(docs);
        })
        //    res.json(products)
    });



    app.put('/products/:id', authMiddleware, (req, res) => {
        console.log('PUT работает');
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

    app.delete('/products/:id', authMiddleware, (req, res) => {
        console.log('DELETE работает');
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
};