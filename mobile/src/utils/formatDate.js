const meses = [
    {num: "01", name:"Janeiro" },
    {num: "02", name:"Fevereiro" },
    {num: "03", name:"Março" },
    {num: "04", name:"Abril" },
    {num: "05", name:"Maio" },
    {num: "06", name:"Junho" },
    {num: "07", name:"Julho" },
    {num: "08", name:"Agosto" },
    {num: "09", name:"Setembro" },
    {num: "10", name:"Outubro" },
    {num: "11", name:"Novembro" },
    {num: "12", name:"Dezembro" },
]

export function formatDate(data){
    const dataFormatada = data.split("T");
    const data1 = dataFormatada[0];
    const data2 = data1.split("-");
    const dia = data2[2];
    const mes = data2[1];
    let nomeMes = '';

    meses.map(month => {
        if (month.num === mes){
            nomeMes = month.name
        }
    })

    return [dia, nomeMes]
}