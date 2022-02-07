export function formatAge(birthDate){
    const actualDate = new Date();
    const actualMonth = actualDate.getMonth() + 1;
    const actualYear = actualDate.getFullYear();

    const aux = birthDate.split('T');
    const aux2 = aux[0].split('-');
    let age = Number(actualYear) - Number(aux2[0]);

    if(age <= 1){
        if(Number(actualMonth) > Number(aux2[1])){
            age = Number(actualMonth) - Number(aux2[1]);
        } else {
            if(Number(aux2[1]) === 2){
                age = Number(actualMonth) + 10;
            } else if(Number(aux2[1]) === 3){
                age = Number(actualMonth) + 9;
            } else if(Number(aux2[1]) === 4){
                age = Number(actualMonth) + 8;
            } else if(Number(aux2[1]) === 5){
                age = Number(actualMonth) + 7;
            } else if(Number(aux2[1]) === 6){
                age = Number(actualMonth) + 6;
            } else if(Number(aux2[1]) === 7){
                age = Number(actualMonth) + 5;
            } else if(Number(aux2[1]) === 8){
                age = Number(actualMonth) + 4;
            } else if(Number(aux2[1]) === 9){
                age = Number(actualMonth) + 3;
            } else if(Number(aux2[1]) === 10){
                age = Number(actualMonth) + 2;
            } else if(Number(aux2[1]) === 11){
                age = Number(actualMonth) + 1;
            }
        }
        
        return age + ' mes(es)'
    }else{
        return age + ' ano(s)'
    }
}