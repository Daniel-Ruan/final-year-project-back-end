'use strict';

/**
 * dailytask controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::dailytask.dailytask', ({ strapi }) => ({
    async create(ctx) {
        ctx.request.body.data.student = ctx.state.user;

        ctx.request.body.data.daily_state = 'false';
        ctx.request.body.data.accuracy = 0;

        ctx.query.populate = '*'

        const { data, meta } = await super.create(ctx);

        const cookedData = {
            id: data.id,
            DailyTaskName: data.attributes.DailyTaskName,
            planned_time: data.attributes.planned_time,
            n_questions: data.attributes.n_questions,
            Longtask: data.attributes.Longtask.data.id,
            daily_state: data.attributes.daily_state,
            questions_set: data.attributes.questions_set
            // questions_set: ((questions_set) => {
            //     questions_set.forEach((question) => {
            //         question = data.attributes.questions.data.id
            //     })
            // })()
            
     
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

        const dailytask = data.attributes

        
        const cookedData = {

            id: id,
            student: dailytask.student.data.id,
            Longtask: dailytask.Longtask.data.id,
            DailyTaskName: dailytask.DailyTaskName,
            questions_set: dailytask.questions_set,
            planned_time: dailytask.planned_time,
            n_questions: dailytask.n_questions,
            daily_state: dailytask.daily_state,
            questions: (() => {
                const question_set = []
                if (dailytask.questions.data != null) {
                    dailytask.questions.data.forEach((question) => {
                        question_set.push(question.id)
                    })
                }
                return question_set
            })(),
            accuracy: dailytask.accuracy

        }

        return { data: cookedData, meta };

    },

    async find(ctx) {

        if (!ctx.state.user) {
            return await super.find(ctx)
        }
        

        ctx.query.populate = '*'

        const { data, meta } = await super.find(ctx)
        const cookedData = []

        data.forEach(dailytask => {

            if (dailytask.attributes.student.data.id != ctx.state.user.id) { 
                return
            }

            cookedData.push({
                id: dailytask.id,
                student: dailytask.attributes.student.data.id,
                Longtask: dailytask.attributes.Longtask.data.id,
                questions: (() => {
                    const question_set = []
                    if (dailytask.attributes.questions.data != null) {
                        dailytask.attributes.questions.data.forEach((question) => {
                            question_set.push(question.id)
                        })

                    }
                    return question_set
                })(),
                DailyTaskName: dailytask.attributes.DailyTaskName,
                planned_time: dailytask.attributes.planned_time,
                n_questions: dailytask.attributes.n_questions,
                questions_set: dailytask.attributes.questions_set,
                daily_state: dailytask.attributes.daily_state,
                accuracy: dailytask.attributes.accuracy
            })

        });

        return { data: cookedData, meta }

    },

    // async update(ctx) {

    //     ctx.query.populate = '*'

    //     const { data, meta } = await super.update(ctx)

    //     const cookedData = {

    //         questions: data.attributes.questions.data.id

    //     }
    //     return { data: cookedData, meta };


    // }

}));
