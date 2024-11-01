import { Schema, model } from "mongoose";
import { IUser } from "@interfaces";
import { hash } from "@utils";

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
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

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

    this.password = await hash(this.password);

    next();
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default model<IUser>("User", userSchema);