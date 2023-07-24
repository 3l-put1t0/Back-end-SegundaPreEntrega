import mongoose, { Schema } from "mongoose";

const collectionName = "carts";

const schemaName = new mongoose.Schema({
    products:
    {
        type:
            [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products",
                    },
                    quantity: Number
                },
            ]
    }

});

schemaName.pre('findOne', function () {
    this.populate("products.product")
});

export const cartsModel = mongoose.model(collectionName, schemaName);