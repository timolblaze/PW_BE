import { Document, FilterQuery, Model } from "mongoose";
import { ICreateCollections, IUpdateCollections, ICollections } from "@interfaces";

class GenericService<T extends Document> {
    constructor(public model: Model<T>) {
        this.model = model;
    }

    async create(data: T | ICreateCollections) {
        return this.model.create(data);
    }

    async updateOne(filter: FilterQuery<T>, data: IUpdateCollections, fields?: string) {
        fields = fields ? `-__v -updatedAt -isDeleted ${fields}` : `-__v -updatedAt -isDeleted`
        return await this.model.findOneAndUpdate(filter, data, { new: true })
            .select(fields);
    }

    async updateMany(filter: FilterQuery<T>, data: IUpdateCollections) {
        return await this.model.updateMany(filter, { $set: data })
    }

    async deleteOne(filter: FilterQuery<T>) {
        return await this.model.findOneAndDelete(filter);
    }

    async disableOne(filter: FilterQuery<T>) {
        return await this.updateOne(filter, { isDeleted: true });
    }

    async disableMany(filter: FilterQuery<T>) {
        return await this.updateMany(filter, { isDeleted: true });
    }

    async findOne(filter: FilterQuery<T>, fields?: string) {
        fields = fields ? `-__v -updatedAt ${fields}` : `-__v -updatedAt `
        filter = { isDeleted: false, ...filter }
        return await this.model.findOne(filter)
            .select(fields);
    }

    async find(filter: FilterQuery<T>, fields?: string) {
        fields = fields ? `-__v -updatedAt ${fields}` : `-__v -updatedAt `
        filter = { isDeleted: false, ...filter }
        return await this.model.find(filter)
            .select(fields);
    }

    async findOneToDelete(filter: FilterQuery<T>) {
        return await this.model.findOne(filter)
    }

    async findAll(filter: FilterQuery<T>, fields?: string) {
        const { sort, page, limit } = filter
        fields = fields ? `-__v -updatedAt -isDeleted ${fields}` : `-__v -updatedAt -isDeleted`
        const currentPage = page ? parseInt(page) : 1;
        const resourcePerPage = limit ? parseInt(limit) : 10;

        delete filter?.page
        delete filter?.sort
        delete filter?.limit

        let data: Document<unknown, object, ICollections>[];
        let totalCount: number;

        if (filter) {
            filter = filter?.isDeleted ? filter
                : filter.hasOwnProperty('isDeleted')
                    ? filter : { isDeleted: false, ...filter }

            totalCount = await this.model.countDocuments(filter);
            data = await this.model.find(filter)
                .skip((currentPage - 1) * resourcePerPage)
                .limit(resourcePerPage)
                .sort(sort || { createdAt: 1 })
                .select(fields);
        } else {
            totalCount = await this.model.countDocuments({ isDeleted: false });
            data = await this.model.find({ isDeleted: false })
                .skip((currentPage - 1) * resourcePerPage)
                .limit(resourcePerPage)
                .sort(sort || { createdAt: 1 })
                .select(fields);
        }

        return {
            data,
            currentPage,
            totalPages: Math.ceil(totalCount / resourcePerPage)
        };
    }
}

export default GenericService;