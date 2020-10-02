const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('./../../config/app');

module.exports = (app, myDb) => {
    app.post('/sign-in', (req, res) => {
        let user = req.body;
        myDb.collection('users').findOne(
            {email: user.email},
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500)
                }
                if (!docs) {
                    return res.status(401).json({message: 'user not found'})
                }

                const isValid = bCrypt.compareSync(user.password, docs.password);
                if(isValid){
                    const token = jwt.sign(docs._id.toString(),jwtSecret);
                    res.json({token})
                } else{
                    res.status(401).json({message: "Incorrect password"})
                }
            })
    });


    app.get('/sign-in', (req, res) => {
        console.log('GET работает');
        myDb.collection('users').find().toArray((err, docs) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }
            res.send(docs);
        })
        //    res.json(products)
    });
};