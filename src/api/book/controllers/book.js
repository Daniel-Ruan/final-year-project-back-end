'use strict';

/**
 * book controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::book.book', ({ strapi }) => ({
    // @override
    async find(ctx) {
        ctx.query.populate = '*'
        const { data, meta } = await super.find(ctx)
        const cookedData = []
        data.forEach(book => {
            const id = book.id
            book = book.attributes
            cookedData.push({
                b_id: id,
                b_name: book.b_name,
                b_category: book.b_category,
                b_description: book.description,
                b_cover: book.cover_picture.data ? book.cover_picture.data.attributes.url : null,
                pdf: book.pdf.data ? book.pdf.data.attributes.url : null,
                b_release_date: book.release_date,
                b_author: book.author,
                b_questions: (() => {
                    const question_set = []
                    if (book.questions.data != null) {
                        book.questions.data.forEach((question) => {
                            question_set.push(question.id)
    
                        })
                    }
                    return question_set
                })(),
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
        const book = data.attributes
        const cookedData = {
            b_id: id,
            b_name: book.b_name,
            b_category: book.b_category,
            b_description: book.description,
            b_cover: book.cover_picture.data ? book.cover_picture.data.attributes.url : null,
            pdf: book.pdf.data ? book.pdf.data.attributes.url : null,
            b_release_date: book.release_date,
            b_author: book.author,
            // b_question: book.questions.data,
            b_questions: (() => {
                const question_set = []
                if (book.questions.data != null) {
                    book.questions.data.forEach((question) => {
                        question_set.push(question.id)

                    })
                }
                return question_set
            })(),
            // b_image: book.content_picture.data,
            b_images: (() => {
                const images = []
                if (book.content_picture.data != null) {
                    book.content_picture.data.forEach((image) => {
                        images.push(image.attributes.url)

                    })
                }
                return images
            })()
            
        }
        return { data: cookedData, meta };


    }

    

}));

  



