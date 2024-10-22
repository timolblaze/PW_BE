import Joi from 'joi'
import { checkMongooseId } from '@utils'

export const CategorySchemas = {
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
    limit: Joi.number(),
    id: Joi.string().custom(checkMongooseId),
    _id: Joi.string().custom(checkMongooseId)
}

export const CategoryFields = {
    CreateCategory: {
        body: [
            "title*",
            "description*",
            "icon*"
        ],
    },
    GetOneCategory: {
        params: ["id*"]
    },
    UpdateOneCategory: {
        body: [
            "title",
            "description",
            "icon"
        ],
        params: ["id*"]
    },
    DeleteOneCategory: {
        params: [
            "id*"
        ]
    },
    GetAllCategories: {
        query: [
            "id",
            "_id",
            "title",
            "page",
            "limit"
        ]
    }
}