'use strict';

/**
 * question-deck service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::question-deck.question-deck');
