import { messageModel } from "../models/message.model.js";

export class MessageDAO {
    constructor() { }

    async getAll() {
        try {
            return await messageModel.find().limit(count).sort({ price: asc });
        } catch (er) { console.log('ERROR messageDAO: ', er.message) }
    }

    async createElement(obj) {
        try {
            await messageModel.insertOne(obj);
        } catch (er) { console.log('ERROR messageDAO: ', er.message) }
    }

    async delectElement(id) {
        try {
            await messageModel.deleteOne({ _id: id });
        } catch (er) { console.log('ERROR messageDAO: ', er.message) }
    }

    async updateElement(id, obj) {
        try {
            await messageModel.updateOne({ _id: id }, { $set: obj });
        } catch (er) { console.log('ERROR messageDAO: ', er.message) }
    }
}