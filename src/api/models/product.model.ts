import { Schema, model } from "mongoose";
import { IProduct } from "@interfaces";
import mongooseAutoPopulate from "mongoose-autopopulate";

const productSchema = new Schema<IProduct>({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        autopopulate: { select: '-isDeleted -__v -createdAt -updatedAt' } 
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
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

productSchema.plugin(mongooseAutoPopulate);

export default model<IProduct>("Product", productSchema);