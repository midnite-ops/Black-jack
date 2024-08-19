import { loop } from "./js-files/jack-add-cards.js";
import { cards } from "./js-files/js-card-img.js";
let gameResult = '';
const duplicate = [];

//This code runs when the deal card button is clicked
document.querySelector('.js-btn').addEventListener('click', () => {
    document.querySelector('.deal').innerHTML = '';
    addResults();
    render();
    blackJack();
})

//This code restarts the game when the restart button is clicked
document.querySelectorAll('.js-restart-btn').forEach((value) => {
    value.addEventListener('click', () => {
        location.reload();
    })
})

//Created the player and computer profiles
const player = {
    playerMove: [dealCard(), dealCard()],
    result: 0
}

const computer = {
    computerMove: [dealCard(), dealCard()],
    result: 0
}
const compHand = computer.computerMove;
const playerHand = player.playerMove;

//This function adds the computer and player score
function addResults(){
    player.result = loop(playerHand);
    computer.result = loop(compHand);
    console.log(player.result, 'player')
    console.log(computer.result, 'computer');
}

//This function takes a random value from the blackJackCard variable
function dealCard(){
    const random = Math.floor(Math.random() * cards.length);
    const randomIndex = cards[random];
    const twin = randomIndex.card;
    if(duplicate.includes(twin)){
        console.log('fish')
        console.log(playerHand, 'player')
        console.log(compHand,'coputer')
        return dealCard();
    }else{
        duplicate.push(twin)
        return randomIndex;
    }
}


//This function renders or displays the player and computer move
function render(){
    const player = cardLength(playerHand);
    const computer = cardLength(compHand);
    let gameHTML = `
        <div class = 'moves-div'>
            <div class = 'moves-div-play'>
                <p>Jesse's hand:</p>
                <div class = 'card-move'>
                    ${computer}
                </div>
            </div>
            <div class = 'moves-div-play'>
                <p>Player's hand:</p>
                <div class = 'card-move'>
                    ${player}
                </div>
            </div>
        </div>`;
    document.querySelector('.js-result').innerHTML = gameHTML;
}

//This function takes several arguments that loop through an array and returns a variable containing an image tag
function cardLength(index){
    let cardHtml = '';
    for(let i = 0; i < index.length; i++){
        const spot = index[i]
        const cardValue = spot.card;
        cardHtml += 
        `<img src = ${cardValue} class = 'cards'>`
    }
    return cardHtml;
}

//This function checks for a blackjack, it checks if the player or computer has gotten a black jack or if they have exceeded the blackjack number and it determines if they won or lost
function blackJack(){
    if(player.result === 21){
        gameResult = 'You got a black jack, you win';
        document.querySelector('.victory').innerHTML = gameResult;
        restart();
    }else if(computer.result === 21){
        gameResult = 'Jesse has a black jack, you lose';
        document.querySelector('.victory').innerHTML = gameResult;
        restart();
    }else{
        if(player.result > 21){
            let aceCard = '';
            let newResult = 0;
            playerHand.forEach((num, index) => {
                if(num.value === 'A'){
                    playerHand[index].value = 1;
                    aceCard = 'A' 
                }
                newResult += num.value;
            })
            player.result = newResult;
            if(aceCard === 'A'){
                if(player.result > 21){
                    gameResult = 'You lose';
                    document.querySelector('.victory').innerHTML = gameResult;
                    restart();
                }else if(player.result === 21){
                    gameResult = 'You win';
                    document.querySelector('.victory').innerHTML = gameResult;
                    restart();
                }
                else{
                    newCard();
                }
            }else{
                gameResult = 'You lose';
                document.querySelector('.victory').innerHTML = gameResult;
                restart();
            }
        }else if(computer.result > 21){
            gameResult = 'You win';
            document.querySelector('.victory').innerHTML = gameResult;
            restart();
        }else{
            newCard();
        }
    }
}

//This function is called when the player requests for a new card
function newCard(){
    setTimeout(() =>{
        let card = `
            <div class = 'new-card-div'>
                <p>Do you want a new card?</p>
                <div>
                    <button class = 'js-card btn-choice' data-id = '1A'>
                        Yes
                    </button>
                    <button class = 'js-card btn-choice' data-id = '1B'>
                        No
                    </button>
                </div>
            </div>`;
        document.querySelector('.js-result').innerHTML += card;
        document.querySelectorAll('.js-card').forEach((value) => {
            value.addEventListener('click', () => {
                const id = value.dataset.id;
                if(id === '1A'){
                    playerHand.push(dealCard());
                    addResults();
                    render();
                    blackJack();
                }else if(id === '1B'){
                    if(computer.result < 17){
                        compHand.push(dealCard());
                        addResults();
                        render();
                        console.log(player, computer);
                    }
                    if(computer.result > 21){
                        gameResult = 'You win';
                        document.querySelector('.victory').innerHTML = gameResult;
                        restart();
                    }else{
                        if(player.result > computer.result){
                            gameResult = 'You win';
                            document.querySelector('.victory').innerHTML = gameResult;
                            restart();
                        }else if(player.result < computer.result){
                            gameResult = 'You lose';
                            document.querySelector('.victory').innerHTML = gameResult;
                            restart();
                        }else{
                            gameResult = 'You draw';
                            document.querySelector('.victory').innerHTML = gameResult;
                            restart();
                        }
                    } 
                }
            })
        })
    },2000);
}

//This function is used to restart the game
function restart(){
    setTimeout(() => {
        document.querySelector('.js-deal-card').innerHTML = `
        <p>Do you want to restart the game?</p>
        <div>
            <button class = 'btn-choice js-restart' data-restart-id = 'R1'>
                Yes
            </button>
            <button class = 'btn-choice js-restart' data-restart-id = 'R2'>
                No
            </button>
        </div>
        `
        document.querySelectorAll('.js-restart').forEach((value) => {
            value.addEventListener('click', () => {
                const restart = value.dataset.restartId;
                if(restart === 'R1'){
                    location.reload();
                }else if(restart === 'R2'){
                    document.querySelector('.js-deal-card').innerHTML = `<p>Thanks for playing</p>`;
                }
            })
        })
    },2000)
}

