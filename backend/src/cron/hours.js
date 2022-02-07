const CronJob = require('cron').CronJob;
const Petshop = require('../models/Petshop');

const hours = new CronJob('0 0 19 * * *', async () => {
    try {
        const petshops = await Petshop.find().select(['availableHours', 'qtdDayHours', 'days', 'initialTime', 'finalTime']);

        petshops.map(async petshop => {
            const ontem = new Date();
            let ontem_formatado = '';
            ontem.setDate(ontem.getDate() - 1);
            ontem_formatado = ontem.getDate().toString().padStart(2, '0') + '/' + (ontem.getMonth() + 1).toString().padStart(2, '0') + '/' + ontem.getFullYear();
            let diasDisponiveis = [];
            const horaInit = petshop.initialTime.split(':')[0];
            const horaEnd = petshop.finalTime.split(':')[0];
            const lastDate = petshop.availableHours[petshop.availableHours.length - 1].date;
            const firstDate = petshop.availableHours[0].date;

            if(ontem_formatado === firstDate){
                const activeHours = petshop.availableHours;
                activeHours.splice(0, petshop.qtdDayHours - 1);
                const aux = lastDate.split('/');
                const activeDate = new Date(Number(aux[2]), Number(aux[1]) - 1, Number(aux[0]));
    
                for(let i = 0; i <= 7; i++){
                    activeDate.setDate(activeDate.getDate() + 1);
                    if(petshop.days.includes(activeDate.getDay())){
                        diasDisponiveis.push(('0' + activeDate.getDate()).slice(-2) + '/' + ('0' + (activeDate.getMonth()+1)).slice(-2) + '/' + activeDate.getFullYear());
                    }
                }
    
                for(let i = Number(horaInit); i <= Number(horaEnd); i++){
                    for(let j = 0; j<= 1; j++){
                        if(j === 0){
                            activeHours.push({
                                date: diasDisponiveis[0],
                                hour: ('0' + i).slice(-2) + ':' + '00',
                                status: true
                            });
                        } else {
                            if(i !== Number(horaEnd)){
                                activeHours.push({
                                    date: diasDisponiveis[0],
                                    hour: ('0' + i).slice(-2) + ':' + '30',
                                    status: true
                                });
                            }
                        }
                    }
                }
    
                await Petshop.findOneAndUpdate(
                    {_id: petshop._id},
                    {$set: {"availableHours": activeHours}},
                )
            }


        })
    } catch (err) {
        console.log(err);
    }
}, null, true, 'America/Sao_Paulo')

module.exports = {hours}