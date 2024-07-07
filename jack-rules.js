export function rulesHtml(){
        document.querySelector('.game').innerHTML = `
    <div class = rules>
        <div class = 'exit'>
            <button class = 'btn-choice js-exit'>X</button>
        </div>
        <h1 class = 'text-center display-1 fw-bold'>How To Play</h1>
        <div>
            <h4>Objective of the game:</h4>
            <ul class = list>
                <li>
                    The player must attempt to beat Jesse by getting a count as close to 21 as possible, without going over 21.
                </li> 
                <li>
                    The player's score must be greater than Jesse's score without going over 21.
                </li>  
                <li>
                    If the player's score is equal to 21, You win.
                </li> 
                <li>
                    If Jesse's score is equal to 21, You lose.
                </li> 
            </ul>
        </div>
        <div>
            <h4>Card Value</h4>
            <ul>
                <li>The Joker (J):  10</li>
                <li>The King (K):   10</li>
                <li>The Queen (Q):  10</li>
            </ul>
        </div>
    <div>
    `
    document.querySelector('.js-exit').addEventListener('click', () => {
        location.reload();
    })
}