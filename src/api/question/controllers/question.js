'use strict';

/**
 * question controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::question.question',({ strapi }) => ({

    async find(ctx) {
        ctx.query.populate = '*'
        const { data, meta } = await super.find(ctx)
        const cookedData = []
        data.forEach(question => {
            const id = question.id
            question = question.attributes
            cookedData.push({
                q_id: id,
                q_question: question.question,
                q_category: question.QuestionCategory,
                q_a: question.a,
                q_b: question.b,
                q_c: question.c,
                q_d: question.d,
                q_selection_set: (() => {
                    const q_selection_set = []
                    if (question.a !=null) {
                        q_selection_set.push(question.a)
                    }
                    if (question.b !=null) {
                        q_selection_set.push(question.b)
                    }
                    if (question.c !=null) {
                        q_selection_set.push(question.c)
                    }
                    if (question.d !=null) {
                        q_selection_set.push(question.d)
                    }
                    return q_selection_set     
                })(),
                q_true_answer: question.true_answer,
                q_state: question.state,
                q_cover: question.cover_picture.data ? question.cover_picture.data.attributes.url : null,
                KeyWord: question.KeyWord,
                KeyWordDescription: question.KeyWordDescription,
                wikiUrl: question.wikiUrl,
                q_images: (() => {
                    const images = []
                    if (question.content_picture.data != null) {
                        question.content_picture.data.forEach((image) => {
                            images.push(image.attributes.url)
    
                        })
                    }
                    return images
                })()
            })
        });

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
        const question = data.attributes
        const cookedData = {
            q_id: id,   
            q_question: question.question,
            q_category: question.QuestionCategory,
            q_a: question.a,
            q_b: question.b,
            q_c: question.c,
            q_d: question.d,
            q_state: question.state,
            q_true_answer: question.true_answer,
            KeyWord: question.KeyWord,
            KeyWordDescription: question.KeyWordDescription,
            wikiUrl: question.wikiUrl,
            q_cover: question.cover_picture.data ? question.cover_picture.data.attributes.url : null,
            q_selection_set: (() => {
                const q_selection_set = []
                if (question.a !=null) {
                    q_selection_set.push(question.a)
                }
                if (question.b !=null) {
                    q_selection_set.push(question.b)
                }
                if (question.c !=null) {
                    q_selection_set.push(question.c)
                }
                if (question.d !=null) {
                    q_selection_set.push(question.d)
                }

                return q_selection_set

                
            })(),
            q_images: (() => {
                const images = []
                if (question.content_picture.data != null) {
                    question.content_picture.data.forEach((image) => {
                        images.push(image.attributes.url)

                    })
                }
                return images
            })()
        }

        return { data: cookedData, meta };

    },

    async update(ctx) {

        ctx.query.populate = '*'

        const { data, meta } = await super.update(ctx)

        const cookedData = {

            dailytasks: data.attributes.dailytasks.data.id

        }
        return { data: cookedData, meta };


    }




}));
