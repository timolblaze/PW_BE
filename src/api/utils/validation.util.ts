import { ICustomValidationFields } from "@interfaces";
 
const checkForRequiredInput: ICustomValidationFields = (value, helpers, fieldToCheck, valueToCheck) => {
    const schema = helpers.state.ancestors[helpers.state.ancestors.length - 1]

    // for easy debugging
    console.log('all schemas involved:', helpers.state.ancestors);
    console.log(`this is the property we're trying to validate: ${helpers.state.path.join(':')}`);
    console.log('we checked the schema:', schema);
    console.log(`for its property: ${fieldToCheck} for the value: ${schema[fieldToCheck]}`);

    if(valueToCheck === 'isProvided') {
        if (schema[fieldToCheck]) return value
    } else {
        if (schema[fieldToCheck] === valueToCheck) return value
    }

    return helpers.error('any.unknown');
}

export default checkForRequiredInput