'use strict';

/**
 * longtask service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::longtask.longtask');
