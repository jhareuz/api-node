/**
 * Users schemas to validate input payload
 *
 * @author ErickCervantes <erick.cervantesacosta.5@gmail.com>
 */
export default {
    create: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                format: 'email'
            },
            password: {
                type: 'string',
                minLength: 1
            },
            firstName: {
                type: 'string',
                minLength: 1
            },
            lastName: {
                type: 'string',
                minLength: 1
            },
            phoneNumber: {
                type: 'string',
                minLength: 8
            },
            lada: {
                type: 'string',
                minLength: 1
            },
            country: {
                type: 'string'
            },
            userRole:{

            }    
        },
        required: ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'lada','country']
    },
    
    update: {
        type: 'object',
        properties: {
            firstName:{
                type: 'string',
                minLength: 1
            },
            lastName:{
                type: 'string',
                minLength: 1
            },
            phoneNumber:{
                type: 'string',
                minLength: 8
            },
            lada:{
                type: 'string',
                minLength: 1
            },
            email:{
                type: 'string',
                format: 'email'
            },
            gender:{
                type: 'string',
                enum: ['M','F']
            },
            birthday:{
                type: 'string',
                format: 'date'
            },
            country:{
                type: 'string'
            }
        }
    }
};