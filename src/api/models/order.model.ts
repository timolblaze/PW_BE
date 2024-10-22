import { Schema, model } from "mongoose";
import { IOrder } from "@interfaces";
import mongooseAutoPopulate from "mongoose-autopopulate";

const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        autopopulate: { select: '-isDeleted -__v -createdAt -updatedAt -password' } 
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        autopopulate: { select: '-isDeleted -__v -createdAt -updatedAt' } 
    },
    reference: {
        type: String,
        unique: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: "pending"
    },
    amount: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

orderSchema.plugin(mongooseAutoPopulate);

export default model<IOrder>("Order", orderSchema);