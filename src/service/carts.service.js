import { CartsDAO } from "../DAO/manager/cartsDAO.js";

const cartsDAO = new CartsDAO();

export class CartsServices{
    constructor(){}

    async getElement(id){
        return await cartsDAO.getElement(id);
    }

    async getElementOne(id){
        return await cartsDAO.getElementOne(id);
    }

    async createElement(obj){
        return await cartsDAO.createElement(obj);
    }

    async update(id, obj){
        await cartsDAO.updateElement(id, obj);
    }

    async deleteCarts(id){
        await cartsDAO.delectElementCart(id);
    }

    async deleteProductCart(cid, pid){
        await cartsDAO.delectElementCartProduct(cid, pid);
    }
}