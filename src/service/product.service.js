import { ProductDTO } from "../DTO/productDTO.js";
import { ProductsDAO } from "../DAO/manager/productsDAO.js";

const productDAO = new ProductsDAO();

export class ProductServices{
    constructor(){}

    async getAll(count, asc, query){
        return await productDAO.getAll(count, asc, query);
    }

    async createElement(obj){
        const productDTO = new ProductDTO(obj);
        await productDAO.createElement(productDTO);
    }

    async update(id, obj){
        const productDTO = new ProductDTO(obj);
        await productDAO.updateElement(id, productDTO);
    }

    async delete(id){
        await productDAO.delectElement(id);
    }
}