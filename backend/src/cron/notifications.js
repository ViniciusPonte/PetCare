const CronJob = require('cron').CronJob;
const { default: axios } = require('axios');
const Schedule = require('../models/Schedule');

const notifications = new CronJob('0 0 18 * * *', async () => {
    var activeDate = new Date();
    activeDate.setDate(activeDate.getDate());
    const today = activeDate.getDate() + '/' + activeDate.getMonth() + '/' + activeDate.getFullYear();

    var tm = new Date();
    tm.setDate(tm.getDate() + 1);
    const tomorrow = tm.getDate() + '/' + tm.getMonth() + '/' + tm.getFullYear()

    console.log(today, tomorrow);

    try {
        const schedules = await Schedule.find({"date": { $gt: activeDate }})
        .populate({path: 'user', select: ['notificationToken']})
        .populate({path: 'service', select: 'name'})
        .populate({path: 'pet', select: 'name'})

        schedules.map(async schedule => {
            let dateOfSchedule = schedule.date;
            dateOfSchedule.setDate(dateOfSchedule.getDate() + 1);
            console.log(dateOfSchedule.getDate() + '/' + dateOfSchedule.getMonth() + '/' + dateOfSchedule.getFullYear());
            if(dateOfSchedule.getDate() + '/' + dateOfSchedule.getMonth() + '/' + dateOfSchedule.getFullYear() === tomorrow){
              if(schedule.user.notificationToken){
                await axios.post('https://exp.host/--/api/v2/push/send', {
                    to: schedule.user.notificationToken,
                    title: `Você possui um agendamento amanhã às ${schedule.time}!`,
                    body: `${schedule.pet.name} - ${schedule.service.name}`
                })
              }
            }
        })
    } catch (err) {
        console.log(err);
    }
}, null, true, 'America/Sao_Paulo')

module.exports = {notifications}