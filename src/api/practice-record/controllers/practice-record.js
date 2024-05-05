'use strict';

/**
 * practice-record controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::practice-record.practice-record', ({ strapi }) => ({
    async create(ctx) {
        ctx.request.body.data.student = ctx.state.user;
        ctx.query.populate = '*'
        const { data, meta } = await super.create(ctx);
        const cookedData = {
            id: data.id,
            question: data.attributes.question.data.id,
            // dailytask: data.attributes.dailytask.data.id,
            status: data.attributes.status
        }

        return { data: cookedData, meta }

    },

    async find(ctx) {
        // if (!ctx.state.user) {
        //     ctx.state = 401
        //     return
        // }
        if (!ctx.state.user) {
            return await super.find(ctx)
        }


        ctx.query.populate = '*'
        const { data, meta } = await super.find(ctx)
        const cookedData = []
        data.forEach(item => {
            if (item.attributes.student.data.id != ctx.state.user.id) {
                return
            }
            cookedData.push({
                id: item.id,
                student: item.attributes.student.data.id,
                question: item.attributes.question.data.id,
                // dailytask: item.attributes.dailytask.data.id,
                // dailytask: (() => {
                //     const dailytaskID = ''
                //     if(item.attributes.dailytask.data != null) {
                //         dailytaskID = item.attributes.dailytask.data.id
                //     }
                //     return dailytaskID
                // })(),
                status: item.attributes.status
            })
        });

        return { data: cookedData, meta }
    }

}));
