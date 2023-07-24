import { ProductServices } from "../service/product.service.js";
import { CartsServices } from "../service/carts.service.js"; 

const productServices = new ProductServices();
const cartsServices = new CartsServices();

export class ViewController{
    constructor(){}

    getProducts = async (req, res) => {
        let { count, asc } = req.params;
        const quey = req.query
        if (asc == undefined) asc = 1
        if (count == undefined) count = 10
        const products = await productServices.getAll(count, asc, quey);
        console.log(products);
        res.status(201).render('products', products);
    }

    getCart = async (req, res) => {
        const { cid } = req.params;
        try{
            const result = await cartsServices.getElementOne(cid);
            console.log(result);
            for (const i of result.products) {
                let price = i.product.price;
                let total = Number(price)*Number(i.quantity);
                i.product.total = total
            }
            res.status(201).render('carts', result);
        }catch(er){
            console.log('ERROR getCarts: ',er.message)
            res.status(501).json({method: 'get', status: 'error', message: 'no se pudo buscar el carrito'});
        }
    }
}