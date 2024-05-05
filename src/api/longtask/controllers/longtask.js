'use strict';

/**
 * longtask controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::longtask.longtask', ({ strapi }) => ({
    async create(ctx) {
        ctx.request.body.data.student = ctx.state.user;
        ctx.request.body.data.CertainDay = 0;
        ctx.request.body.data.taskProgress = 0;
        ctx.request.body.create_time = Date.now()
        // ctx.request.body.data.create_time = Date.now()
        ctx.query.populate = '*'
        const { data, meta } = await super.create(ctx);
        const cookedData = {
            id: data.id,
            LongTaskName: data.attributes.LongTaskName,
            finish_date: data.attributes.finish_date,
            LearningCycleDays: data.attributes.LearningCycleDays,
            book: data.attributes.book.data.id,
            create_time: data.attributes.create_time,
            update_time: data.attributes.update_time,
            category: data.attributes.category,
        }

        return { data: cookedData, meta }

    },

    async find(ctx) {

        if (!ctx.state.user) {
            return await super.find(ctx)
        }

        ctx.query.populate = '*'
        const { data, meta } = await super.find(ctx)
        const cookedData = []
        data.forEach(longtask => {
            if (longtask.attributes.student.data.id != ctx.state.user.id) {
                return
            }
            cookedData.push({
                id: longtask.id,
                student: longtask.attributes.student.data.id,
                book: longtask.attributes.book.data.id,
                LongTaskName: longtask.attributes.LongTaskName,
                finish_date: longtask.attributes.finish_date,
                LearningCycleDays: longtask.attributes.LearningCycleDays,
                CertainDay: longtask.attributes.CertainDay,
                create_time: longtask.attributes.create_time,
                update_time: longtask.attributes.update_time,
                category: longtask.attributes.category,
                taskProgress: longtask.attributes.taskProgress,
                DailytaskID: (() => {
                    const dailyTask_arr = []
                    if (longtask.attributes.Dailytask.data != null){
                        longtask.attributes.Dailytask.data.forEach((dailyTask) => {
                            dailyTask_arr.push(dailyTask.id)
                        })
                    }
                    return dailyTask_arr
                })(),
                DailytaskRate: (() => {
                    const dailyTask_arr2 = []
                    if (longtask.attributes.Dailytask.data != null){
                        longtask.attributes.Dailytask.data.forEach((dailyTask) => {
                            dailyTask_arr2.push(dailyTask.attributes.accuracy)
                        })
                    }
                    return dailyTask_arr2
                })(),
                DailytaskState: (() => {
                    const dailyTask_arr3 = []
                    if (longtask.attributes.Dailytask.data != null){
                        longtask.attributes.Dailytask.data.forEach((dailyTask) => {
                            dailyTask_arr3.push(dailyTask.attributes.daily_state)

                        })
                    }
                    return dailyTask_arr3
                })(),


                // Dailytask: longtask.attributes.Dailytask.data
            })

        });

        return { data: cookedData, meta }

    },

    async findOne(ctx) {

        ctx.query.populate = '*'

        const raw = await super.findOne(ctx)

        if (raw == null) {
            ctx.status = 404
            return
        }

        const { data, meta } = raw
        // const questionSet = []
        data.attributes.book.data

        const cookedData = {
            id: data.id,
            student: data.attributes.student.data.id,
            book: data.attributes.book.data.id,
            LongTaskName: data.attributes.LongTaskName,
            finish_date: data.attributes.finish_date,
            LearningCycleDays: data.attributes.LearningCycleDays,
            CertainDay: data.attributes.CertainDay,
            create_time: data.attributes.create_time,
            update_time: data.attributes.update_time,
            category: data.attributes.category,
            taskProgress: data.attributes.taskProgress,
            // Dailytask: data.attributes.Dailytask.data,
            DailytaskID: (() => {
                const dailyTask_arr1 = []
                if (data.attributes.Dailytask.data != null){
                    data.attributes.Dailytask.data.forEach((dailyTask) => {
                        dailyTask_arr1.push(dailyTask.id)
                    })
                }
                return dailyTask_arr1
            })(),
            DailytaskRate: (() => {
                const dailyTask_arr2 = []
                if (data.attributes.Dailytask.data != null){
                    data.attributes.Dailytask.data.forEach((dailyTask) => {
                        dailyTask_arr2.push(dailyTask.attributes.accuracy)
                    })
                }
                return dailyTask_arr2
            })(),
            DailytaskState: (() => {
                const dailyTask_arr3 = []
                if (data.attributes.Dailytask.data != null) {
                    data.attributes.Dailytask.data.forEach((dailyTask) => {
                        dailyTask_arr3.push(dailyTask.attributes.daily_state)
                    })
                }
                return dailyTask_arr3
            })(),

            
            // questionSet: data.attributes.book.data
        }

        return { data: cookedData, meta };

    }

}));
