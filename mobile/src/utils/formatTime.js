
export function formatTime(str){
    let string = String(str);
    const str2 = string.split('.');
    
    let formattedTime = str2[0] + ' minutos';
    
    return formattedTime;
    }