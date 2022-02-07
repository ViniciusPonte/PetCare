const CronJob = require('cron').CronJob;
const Schedule = require('../models/Schedule');

const deleteSchedules = new CronJob('0 0 19 * * *', async () => {
    try {
        const schedules = await Schedule.find();
        const today = new Date();

        schedules.map(async schedule => {
            if(schedule.date < today){
                try {
                    await Schedule.findByIdAndRemove(schedule._id);
                } catch (err) {
                    console.log(err);
                }
            }
        })


    } catch (err) {
        console.log(err);
    }
}, null, true, 'America/Sao_Paulo')

module.exports = {deleteSchedules}