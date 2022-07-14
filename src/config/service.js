'use strict';

export default {
    msAuth: {
        name: process.env.MS_NAME || 'api-node',
        pathLogger: process.env.PATH_LOGGER || './logs',
        fileLogger: process.env.FILE_LOGGER || 'application.log',
        excludeLogger: process.env.EXCLUDE_LOGGER || 'ping'
    }
};