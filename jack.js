import { loop } from "./jack-add-cards.js";
import { cards } from "./js-files/js-card-img.js";
let gameResult = ''

// The cards for the game
// const blackJackCard = [1,2,3,4,5,6,7,8,9,10,'A','Q','J','K'];

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

//This function takes a random value from the blackJackCard variable
function dealCard(){
    const random = Math.floor(Math.random() * cards.length);
    const randomIndex = cards[random];
    return randomIndex;
}

//This function adds the values in an array and returns the result

function render(){
    let gameHTML = `
        <div class = 'moves-div'>
            <div class = 'moves-div-play'>
                <p>Jesse's hand:</p>
                <img src = ${compHand[0].card} class = 'cards'>  
                <img src = ${compHand[1].card} class = 'cards'> 
            </div>
            <div class = 'moves-div-play'>
                <p>Player's hand:</p>
                <img src = ${playerHand[0].card} class = 'cards'>  
                <img src = ${playerHand[1].card} class = 'cards'> 
            </div>
        </div>`;
    document.querySelector('.js-result').innerHTML = gameHTML;
}
function addResults(){
    player.result = loop(playerHand);
    computer.result = loop(compHand);
}
console.log(playerHand)
function blackJack(){
    if(player.result === 21){
        gameResult = 'You win';
        document.querySelector('.victory').innerHTML = gameResult;
        restart();
    }else if(computer.result === 21){
        gameResult = 'You lose';
        document.querySelector('.victory').innerHTML = gameResult;
        restart();
    }else{
        if(player.result > 21){
            if(playerHand.includes('A')){
               playerHand.forEach((value,index) => {
                if(value === 'A'){
                    playerHand[index] = 1;
                }
               })
               let newResult = 0;
               playerHand.forEach((value) => {
                newResult += value;
               })
               player.result = newResult;
               if(player.result !== 21){
                gameResult = 'You lose';
                document.querySelector('.victory').innerHTML = gameResult;
                restart();
               }else if(player.result === 21){
                render();
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
function restart(){
    setTimeout(() => {
        if(gameResult === 'You lose'  ||  gameResult === 'You win'){
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
        }
        document.querySelectorAll('.js-restart').forEach((value) => {
            value.addEventListener('click', () => {
                const restart = value.dataset.restartId;
                if(restart === 'R1'){
                    location.reload();
                }else if(restart === 'R2'){
                    document.querySelector('.js-deal-card').innerHTML = 'Thanks for playing';
                }
            })
        })
    },2000)
}


