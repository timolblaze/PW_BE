import Joi from 'joi'
import { checkForRequiredInput, checkMongooseId } from '@utils'

export const UserSchemas = {
    email: Joi.string().email().label('Email').messages({
        'string.email': 'Email must be a valid email address.',
        'string.empty': 'Email cannot be empty.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string()
        .min(6)
        .label('Password')
        .messages({
            'string.min': 'Password must have at least 6 characters.',
            'string.empty': 'Password cannot be empty.',
            'string.base': 'Password must be a string.',
            'any.required': 'Password is required.',
        }),
    fullName: Joi.string()
        .min(2)
        .max(50)
        .label('Full Name')
        .messages({
            'string.empty': 'Full Name cannot be empty.',
            'string.min': 'Full Name must have at least 2 characters.',
            'string.max': 'Full Name must have at most 50 characters.',
            'string.base': 'Full Name must be a string.',
            'any.required': 'Full Name is required.'
        }),
    isDeleted: Joi.boolean(),
    page: Joi.number(),
    limit: Joi.number(),
    newPassword: Joi.string().custom((val, obj) => checkForRequiredInput(val, obj, 'password', 'isProvided'))
        .label('New Password')
        .min(8)
        .max(50)
        .messages({
            'string.empty': 'New Password cannot be empty.',
            'string.min': 'New Password must have at least 8 characters.',
            'string.max': 'New Password must have at most 50 characters.',
            'any.required': 'New Password is required.'
        }),
    id: Joi.string().custom(checkMongooseId),
    _id: Joi.string().custom(checkMongooseId)
}

export const UserFields = {
    GetOneUser: {
        params: ["id*"]
    },
    UpdateOneUser: {
        body: [
            "email",
            "fullName",
            "avatar",
            "password",
            "newPassword"
        ],
        params: ["id*"]
    },
    DeleteOneUser: {
        params: [
            "id*"
        ]
    },
    GetAllUsers: {
        query: [
            "id",
            "_id",
            "email",
            "fullName",
            "isDeleted",
            "page",
            "limit"
        ]
    }
}