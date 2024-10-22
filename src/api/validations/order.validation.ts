import Joi from 'joi'
import { checkMongooseId } from '@utils'

export const OrderSchemas = {
    reference: Joi.string()
        .label('Reference')
        .messages({
            'string.empty': 'Reference cannot be empty.',
            'string.base': 'Reference must be a string.',
            'any.required': 'Reference is required.',
        }),
    status: Joi.string()
        .label('Status')
        .messages({
            'string.min': 'Status must have at least 2 characters.',
            'string.max': 'Status must have at most 500 characters.',
            'string.empty': 'Status cannot be empty.',
            'string.base': 'Status must be a string.',
            'any.required': 'Status is required.',
        }),
    amount: Joi.number()
        .label('Amount')
        .messages({
            'string.empty': 'Amount cannot be empty.',
            'string.base': 'Amount must be a number.',
            'any.required': 'Amount is required.',
        }),
    isDeleted: Joi.boolean(),
    page: Joi.number(),
    sortBy: Joi.string(),
    order: Joi.string(),
    limit: Joi.number(),
    product: Joi.string().custom(checkMongooseId),
    user: Joi.string().custom(checkMongooseId),
    id: Joi.string().custom(checkMongooseId),
    _id: Joi.string().custom(checkMongooseId)
}

export const OrderFields = {
    CreateOrder: {
        body: [
            "reference*",
            "product*",
            "amount*"
        ],
    },
    GetOneOrder: {
        params: ["id*"]
    },
    UpdateOneOrder: {
        body: [
            "status"
        ],
        params: ["id*"]
    },
    DeleteOneOrder: {
        params: [
            "id*"
        ]
    },
    GetAllOrders: {
        query: [
            "id",
            "_id",
            "reference",
            "product",
            "user",
            "page",
            "limit",
            "sortBy",
            "order"
        ]
    }
}