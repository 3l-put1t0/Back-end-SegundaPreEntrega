import { productsModel } from "../models/products.model.js"

export class ProductsDAO {
    constructor() { }

    async getAll(count, asc, query) {
        try {
            // return await productsModel.find().limit(count).sort({ price: asc });
            return await productsModel.paginate(
                query,
                {
                    limit: count,
                    page: 4,
                    sort: String(asc),
                    lean: true
                }
            );
        } catch (er) {
            console.log('ERROR ProductDAO: ' + er.message)
        }
    }

    async createElement(obj) {
        try {
            await productsModel.insertMany(obj);
        } catch (er) {
            console.log('ERROR ProductDAO: ' + er.message)
        }
    }

    async delectElement(id) {
        try {
            await productsModel.deleteOne({ _id: id });
        } catch (er) {
            console.log('ERROR ProductDAO: ' + er.message)
        }
    }

    async updateElement(id, obj) {
        try {
            await productsModel.updateOne({ _id: id }, { $set: obj });
        } catch (er) {
            console.log('ERROR ProductDAO: ' + er.message)
        }
    }
}

// const a = new ProductsDAO();

// a.getAll();