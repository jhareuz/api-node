'use strict';

export default {
  login: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email'
      },
      phoneNumber: {
        type: 'string',
        minLength: 8
      },
      password: {
        type: 'string',
        minLength: 1
      }
    },
    additionalProperties: false,
    anyOf: [
      { required: ['email', 'password'] },
      { required: ['phoneNumber', 'password'] }
    ]
  }
};