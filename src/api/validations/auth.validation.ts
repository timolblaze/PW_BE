import Joi from 'joi'

export const AuthSchemas = {
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
        })
}

export const AuthFields = {
    Login: {
        body: [
            "email*",
            "password*"
        ]
    },
    Register: {
        body: [
            "fullName*",
            "email*",
            "password*"
        ]
    }
}