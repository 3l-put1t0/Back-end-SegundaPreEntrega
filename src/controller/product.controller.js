import { ProductServices } from "../service/product.service.js";

const productServices = new ProductServices();

export class ProductController{
    constructor(){}

    getProducts = async (req, res) => {
        let { count, asc } = req.params;
        const quey = req.query
        if (asc == undefined) asc = 1
        if (count == undefined) count = 10
        const products = await productServices.getAll(count, asc, quey);
        res.status(201).json({method: 'get', status: 'success', payload: products});
    }

    createProducts = async (req, res) => {
        try{
            const { title, description, code, price, status, stock, category, thumbnails } = req.body;        
            if(!title || !description || !code || !price || !status || !stock || !category) 
                return res.status(401).json({method: 'post', status: 'error', message: 'Ingrese todos los campos requeridos'});
            const product = { title, description, code, price, status, stock, category, thumbnails };
            productServices.createElement(product);
            res.status(201).json({method: 'post', status: 'success', message: 'se inserto producto'})
        }catch(er){
            console.log('ERROR controller: ', er.message);
            res.status(501).json({method: 'post', status: 'error', message: 'no se inserto producto'})
        }
    } 

    updateProduct = async (req, res) => {
        const { pid } = req.params
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        const product = { title, description, code, price, status, stock, category, thumbnails };
        try {
            productServices.update(pid, product)
            res.status(201).json({method: 'put', status: 'success', message: 'se actualizo producto'})
        }catch(er){
            console.log('ERROR updateProduct: ', er.message)
            res.status(501).json({method: 'put', status: 'error', message: 'no se actualizo producto'})
        }
    }

    deleteProduct = async (req, res) => {
        const { pid } = req.params;
        try{
            productServices.delete(pid);
            res.status(201).json({method: 'delte', status: 'success', message: 'se elimino producto'})
        }catch(er){
            console.log('ERROR deleteProduct: ', er.message);
            res.status(501).json({method: 'delete', status: 'error', message: 'no se elimino producto'});
        }
    }
}