'use strict';

/**
 * practice-record service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::practice-record.practice-record');
