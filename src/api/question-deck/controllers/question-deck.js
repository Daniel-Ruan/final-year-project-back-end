'use strict';

/**
 * question-deck controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::question-deck.question-deck', ({ strapi }) => ({
    async create(ctx) {
        ctx.request.body.data.student = ctx.state.user;

        ctx.query.populate = '*'

        const { data, meta } = await super.create(ctx);

        const cookedData = {
            id: data.id,
            longtask: data.attributes.longtask.data.id,
            question: data.attributes.question.data.id,
            write_time: data.attributes.write_time,
            questionStatus: data.attributes.questionStatus,
            RepeatCounter: data.attributes.RepeatCounter
        }

        return { data: cookedData, meta };

    },

    async findOne(ctx) {

        ctx.query.populate = '*'

        const raw = await super.findOne(ctx)

        if (raw == null) {
            ctx.status = 404
            return
        }

        const { data, meta } = raw

        const id = data.id

        const question_deck = data.attributes

        const cookedData = {

            id: id,
            question: question_deck.question.data.id,
            student: question_deck.student.data.id,
            longtask: question_deck.longtask.data.id,
            RepeatCounter: question_deck.RepeatCounter,
            questionStatus: question_deck.questionStatus,
            write_time: question_deck.write_time

        }

        return { data: cookedData, meta };

    },

    async find(ctx) {

        ctx.query.populate = '*'

        const { data, meta } = await super.find(ctx)

        const cookedData = []

        data.forEach(questionDeck => {

            cookedData.push({
                id: questionDeck.id,
                question: questionDeck.attributes.question.data.id,
                student: questionDeck.attributes.student.data.id,
                longtask: questionDeck.attributes.longtask.data.id,
                RepeatCounter: questionDeck.attributes.RepeatCounter,
                questionStatus: questionDeck.attributes.questionStatus,
                write_time: questionDeck.attributes.write_time

            })

        });

        return { data: cookedData, meta }
        
    }


}));
