import Joi from 'joi'
import { checkMongooseId } from '@utils'

export const ProductSchemas = {
    title: Joi.string()
        .min(2)
        .max(30)
        .label('Title')
        .messages({
            'string.min': 'Title must have at least 2 characters.',
            'string.max': 'Description must have at most 30 characters.',
            'string.empty': 'Title cannot be empty.',
            'string.base': 'Title must be a string.',
            'any.required': 'Title is required.',
        }),
    description: Joi.string()
        .min(2)
        .max(500)
        .label('Description')
        .messages({
            'string.min': 'Description must have at least 2 characters.',
            'string.max': 'Description must have at most 500 characters.',
            'string.empty': 'Description cannot be empty.',
            'string.base': 'Description must be a string.',
            'any.required': 'Description is required.',
        }),
    icon: Joi.string()
        .label('Icon')
        .messages({
            'string.empty': 'Icon cannot be empty.',
            'string.base': 'Icon must be a string.',
            'any.required': 'Icon is required.',
        }),
    isDeleted: Joi.boolean(),
    page: Joi.number(),
    sortBy: Joi.string(),
    order: Joi.string(),
    limit: Joi.number(),
    category: Joi.string().custom(checkMongooseId),
    id: Joi.string().custom(checkMongooseId),
    _id: Joi.string().custom(checkMongooseId)
}

export const ProductFields = {
    CreateProduct: {
        body: [
            "title*",
            "description*",
            "category*",
            "icon*"
        ],
    },
    GetOneProduct: {
        params: ["id*"]
    },
    UpdateOneProduct: {
        body: [
            "title",
            "description",
            "category",
            "icon"
        ],
        params: ["id*"]
    },
    DeleteOneProduct: {
        params: [
            "id*"
        ]
    },
    GetAllProducts: {
        query: [
            "id",
            "_id",
            "title",
            "category",
            "page",
            "limit",
            "sortBy",
            "order"
        ]
    }
}