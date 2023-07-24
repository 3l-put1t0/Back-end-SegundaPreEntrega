import { CartsServices } from "../service/carts.service.js";

const cartsService = new CartsServices();

export class CartsController{
    constructor(){}

    getCart = async (req, res) => {
        const { cid } = req.params;
        try{
            // const result = await cartsService.getElement(cid);
            const result = await cartsService.getElementOne(cid);
            res.status(201).json({method: 'get', status: 'success', message: result});
        }catch(er){
            console.log('ERROR getCarts: ',er.message)
            res.status(501).json({method: 'get', status: 'error', message: 'no se pudo buscar el carrito'});
        }
        
    }

    createCart = async (req, res) => {
        const { product, quantity } = req.body;
        const products = {product, quantity};
        try{
            const obj = await cartsService.createElement({});
            const id = String(obj._id);
            obj.products.push(products);
            await cartsService.update(id, obj);            
            res.status(201).json({method: 'post', status: 'success', message: 'se inserto carrito'});
        }catch(er){
            console.log('ERROR al crear carrito: ', er.message);
            res.status(501).json({method: 'post', status: 'error', message: 'no se inserto carrito'});


        }

    }

    deleteProduct = async (req, res) => {
        const { cid, pid } = req.params;
        try{
            
            const result = await cartsService.getElementOne(cid);
            // console.log(result);
            const position = result.products.findIndex(e => e.product == pid);
            const obj = result.products[position];
            if (obj.quantity > 0) {
                obj.quantity = obj.quantity - 1;
                result.products.splice(position, 1, obj);
            }
            if (obj.quantity == 0) {
                result.products.splice(position, 1);
            }
            const response = await cartsService.update(cid, result);
            res.status(201).json({method: 'delete', status: 'success', payload: response});
        }catch(er){
            consolr.log('ERROR deleteCart: ',er.message);
            res.status(501).json({method: 'delete', status: 'error', message: 'no se elimino producto de carrito'});
        }
    }

    updateCart = async (req, res) => {
        const { cid } = req.params;
        const products = req.body;
        try{
            const result = await cartsService.getElementOne(cid);
            result.products = products;
            const response = await cartsService.update(cid, result);
            res.status(201).json({method: 'put', status: 'success', message: response});
        }catch(er){
            console.log('ERROR updateCart: ', er.message);
            res.status(501).json({method: 'put', status: 'error', message: 'no se actualizo el producto de carrito'});
        }
    }

    updateCartProduct = async (req, res) =>{
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        try{            
            const result = await cartsService.getElementOne(cid);
            const position = result.products.findIndex(e => e.product == pid);
            if (position == -1) return res.status(501).json({method: 'put', status: 'error', message: 'no existe id del producto seleccionado'});
            const obj = result.products[position];
            obj.quantity = quantity;
            const response = await cartsService.update(cid, result);
            res.status(201).json({method: 'put', status: 'success', message: response});
        }catch(er){
            console.log('ERROR updateCartProduct: ',er.message);
            res.status(501).json({method: 'put', status: 'error', message: 'no se actualizo producto de carrito'});
        }
    }
}