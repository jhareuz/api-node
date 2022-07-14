'use strict';

export default {
  web: parseInt(process.env.CONCURRENCY_WEB) || 3,
};
