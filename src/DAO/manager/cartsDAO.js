import { cartsModel } from "../models/carts.model.js";

export class CartsDAO {
    constructo() { }

    async getElement(id) {
        try {
            return await cartsModel.find({_id: id});
        } catch (er) { console.log('ERROR CartsDAO: ', er.message) }
    }

    async getElementOne(id){
        try{
            return await cartsModel.findOne({_id: id}).lean();
        }catch(er){}
    }

    async createElement(obj) {
        try {
            return await cartsModel.create({$push: obj});            
        } catch (er) { console.log('ERROR CartsDAO: ', er.message) }
    }

    async delectElementCart(id) {
        try {
            await cartsModel.deleteOne({ _id: id });
        } catch (er) { console.log('ERROR CartsDAO: ', er.message) }
    }

    async delectElementCartProduct(cid, pid) {
        try {
            await cartsModel.findByIdAndDelete({ _id: cid }, { product: pid });
        } catch (er) { console.log('ERROR CartsDAO: ', er.message) }
    }

    async updateElement(id, obj) {
        try {
            await cartsModel.updateOne({ _id: id }, { $set: obj });
        } catch (er) { console.log('ERROR CartsDAO: ', er.message) }
    }
}