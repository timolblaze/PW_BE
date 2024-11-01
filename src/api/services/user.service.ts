import { Model } from "mongoose";
import { User } from "@models";
import GenericService from "./generic.service";
import {
  NotFoundException,
  ForbiddenException,
  UnAuthorizedException,
  InternalException
} from "./error.service";
import { ICreateUser, IGenericObject, IUpdateUser, IUser } from "@interfaces";
import { verifyHash, isAuthorised } from "@utils";

export class UserService<T extends IUser> extends GenericService<T> {
  constructor(model: Model<T>) {
    super(model);
    this.model = model;
  }

  async create(data: T | ICreateUser) {
    return new this.model(data);
  }

  async editUser(id: string, user: IUser, payload: IUpdateUser) {
    const { email, password, newPassword } = payload;
    const existingUser = await this.findOne({ _id: id })

    if (!existingUser) {
      throw new NotFoundException(`This user does not exist`);
    }

    if (!isAuthorised(user, "_id", existingUser._id.toString())) {
      throw new ForbiddenException(
        `You do not have permission to update this user`
      );
    }

    if (email && existingUser.email === email) {
      throw new ForbiddenException(`This email is not available.`);
    }

    if (password) {
      const isValid = await verifyHash(password, existingUser.password);

      if (!isValid) {
        throw new UnAuthorizedException(`Email or Password is incorrect`);
      }

      payload.password = newPassword;
      delete payload.newPassword;
    }

    const updatedUser = await this.updateOne({ _id: id }, payload);
    if (!updatedUser) {
      throw new InternalException();
    }

    return {
      message: `User updated successfully!`,
      user: updatedUser.toJSON()
    };
  }

  async uploadAvatar(_id: string, uploads: any, user: IUser) {
    const existingUser = await this.findOne({ _id });
    if (!existingUser) {
      throw new NotFoundException(`User ${_id} does not exist`);
    }

    if (!isAuthorised(user, "_id", existingUser._id.toString())) {
      throw new UnAuthorizedException("You are not authorised to change this avatar");
    }

    const updatedUser = await this.updateOne(
      { _id },
      { avatar: uploads[0].secure_url }
    );

    if (!updatedUser) {
      throw new InternalException()
    }

    return {
      message: `Avatar updated successfully`,
      user: updatedUser.toJSON()
    }
  }

  async disableUser(_id: string, user: IUser) {
    const existingUser = await this.findOne({ _id });

    if (!existingUser) {
      throw new NotFoundException(`This user does not exist`)
    }

    const isUnAuthorised = !isAuthorised(user, "_id", existingUser._id.toString()) &&
      !isAuthorised(user, "role", "admin")

    if (isUnAuthorised) {
      throw new UnAuthorizedException(`You do not have permission to delete this user`)
    }

    const disabledUser = await this.disableOne({ _id });
    if (!disabledUser) {
      throw new InternalException("There was an error disabling user")
    }

    return {
      message: `Account disabled successfully!`,
      user: disabledUser.toJSON()
    }
  }

  async getUser(_id: string) {
    const isExistingUser = await this.findOne({ _id });

    if (!isExistingUser) {
      throw new NotFoundException(`User ${_id} does not exist`)
    }

    return {
      message: `User fetched successfully!`,
      user: isExistingUser
    }
  }

  async getUsers(query: any) {
    const { id, fullName, isDeleted } = query;

    if (id) {
      delete query.id;
      query._id = id;
    }

    if (fullName) {
      query.fullName = {
        $regex: (fullName as string).toLowerCase().trim(),
        $options: "i",
      };
    }

    if (typeof isDeleted === "boolean") {
      query.isDeleted = isDeleted;
    }

    const {
      data: users,
      currentPage,
      totalPages,
    } = await this.findAll(query);

    if (!users) {
      throw new InternalException()
    }

    return {
      message: users.length > 0 ? "Users successfully fetched"  : "No users match your search criteria.",
      users,
      currentPage,
      totalPages
    }
  }
}

export default new UserService(User);