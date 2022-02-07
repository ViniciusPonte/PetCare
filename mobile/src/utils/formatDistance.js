export function formatDistance(str){
    let string = String(str);
    const str2 = string.split('.');

    let formattedDistance;

    if(str2[0] === '0'){
      formattedDistance = str2[1] + 'm';
    } else {
      formattedDistance = str2[0] + 'km';
    }

    return formattedDistance;
  }

