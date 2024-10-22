import Joi from 'joi';

export const getValidationFields = (schema: any, fields: string[]) => {
  // Create a new schema that includes only the fields mentioned in the `fields` array
  const filteredSchema = fields.reduce((acc: any, field) => {
    const isRequired = field.endsWith('*');  // Fields with '*' are required
    const fieldName = field.replace('*', '');  // Remove '*' to get the actual field name
    
    if (schema[fieldName]) {
      // Assign the Joi validation based on whether it's required or not
      acc[fieldName] = isRequired
        ? schema[fieldName].required()  // Mark field as required
        : schema[fieldName].optional();  // Otherwise, mark as optional
    }

    return acc;
  }, {});

  // Return Joi object that allows only the specified fields and forbids unknown fields
  return Joi.object(filteredSchema).unknown(false);
};