export function loop(index){
    let result = 0
    for(let i = 0; i < index.length; i++){
       let spot = index[i];
       if(spot === 'Q'  ||  spot === 'J'  ||  spot === 'K'){
        spot = 10;
       }else if(spot === 'A'){
        spot = 11;
       }
       if(result === 0){
        result = spot;
       }else{
        result += spot;
       }
    }
    return result;
}