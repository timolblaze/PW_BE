import { Schema, model } from "mongoose";
import { ICategory } from "@interfaces";

const categorySchema = new Schema<ICategory>({
  title: {
    type: String,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String
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

export default model<ICategory>("Category", categorySchema);