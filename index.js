const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const products = [
    {
        id: 1,
        name:"phone",
        price:300,
    },
    {
        id: 2,
        name:"tablet",
        price:700,
    },
];
//GET
app.get('/products', (req, res) => res.json(products));
//GET

//POST
app.post('/products', (req, res) => {
    products.push(req.body);
    res.json(req.body);
});
//POST

//PUT
app.put('/products/:id', (req,res)=>{
    let product = products.find(m => m.id === +req.params.id);
    let productIndex = products.indexOf(product);
    let newProduct = {...product, ...req.body};
    products[productIndex] = newProduct;
    res.json(newProduct)
});
//PUT

//DELETE
app.delete('/products/:id', (req,res)=>{
    // удаляем один элемент с заданным индексом
    products.splice(
        // находим индекс элемента
        products.indexOf(
            //вычисляем первый элемент, у которого индекс соответствует индексу из URL
            products.find(m => m.id === +req.params.id)
        ),
        1
    );
    res.json({success: true})
});
//DELETE



app.listen(3000,()=>console.log('Listening on port 3000...'));