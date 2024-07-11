export function loop(index){
    let result = 0;
    for(let i = 0; i < index.length; i++){
        const card = index[i];
        let cardValue = card.value;
        if(cardValue === 'Q'  ||  cardValue === 'K'  ||  cardValue === 'J'){
            cardValue = 10;
            result += cardValue;
        }else if(cardValue === 'A'){
            cardValue = 11;
            result += cardValue;
        }else{
            result += cardValue;
        }
    }
    return result;
}