const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/beyond_shop').then(() =>
{
    console.log('Connected to Mongodb')
}).catch((e)=>
{
    console.log('Failed to connect to Mongodb')
});

const ShopSchema = new mongoose.Schema({
    name: String,
    price: Number,
    discount: Number,
    pictureURL: String,
})

const Shop = mongoose.model("shop", ShopSchema)

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded())

const PORT = 3000;

app.get('/', async (req, res) => {
    const data = await Shop.find()
    res.render("products",{data});
});
app.get('/new_product', (req, res) => {
    res.render("new_product");
});
app.get('/edit_product/:id', async (req, res) => {
    const ShopData = await Shop.findById(req.params.id)
    res.render("edit_product",{data: ShopData});
});

app.get('/product', (req, res) => {
    res.render("product_page");
});

app.post('/edit_product', async(req, res) =>{
    await Shop.updateOne({
        _id: req.body.id
    },
    {
          name: req.body.name,
         price: req.body.price,
         discount: req.body.discount,
         pictureURL: req.body.pictureURL
    }
    )
    res.redirect('/')


})

app.get('/delete/:id', async (req, res) => {
  
        await Shop.deleteOne({ _id: req.params.id });
        res.redirect('/');
    
});

app.post('/new_product', async (req, res) => {
    if(req.body.name.length != 0){
        await new Shop({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            pictureURL: req.body.pictureURL
        }).save()
        res.redirect('/')
    }else{
        res.redirect('/new_product?error=1')
    }
});



app.use((req, res) => {
    res.status(404).render("404");
});


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
