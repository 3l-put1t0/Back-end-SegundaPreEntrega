import express from "express";
import config from "./src/config.js";
import mongoose from "mongoose";
import handlebars from "express-handlebars";

import __dirname from "./src/utils.js";
import productRouter from "./src/router/product.router.js";
import cartsRouter from "./src/router/carts.router.js"
import viewRouter from "./src/router/view.router.js"

const PORT = config.PORT || 8080;
const URL = config.URL;

const app = express();
try{
    mongoose.connect(URL);
}catch(er){
    console.log('ERROR CONNECTION: ', er.message);
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/views', viewRouter);

app.listen(PORT, console.log(`Listening port: ${PORT}`));