let scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function(){
    if(gamePlaying){
        //1.random number
        let dice = Math.floor(Math.random ()* 6) + 1;
        //2. display the result
        let diceDOM = document.querySelector(".dice"); 
        diceDOM.style.display = "block";
        diceDOM.src = "./img/dice-" + dice + ".png";
        //3. update the round score IF rolled number was not 
        if(dice === 6 && lastDice === 6){
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = '0';
            nextPlayer();
        }else if(dice !== 1){
            //add the score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }else{
            //hit the next player
            nextPlayer();
        }
        lastDice = dice;
    }
})


document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying){
        //Add CURRENT score to the global score
        scores[activePlayer] += roundScore;
        //Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        //check if the player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + '-panel').classList.add("winner");
            document.querySelector(".player-" + activePlayer + '-panel').classList.remove("active");
            gamePlaying = false;
        }else{
            //next player
            nextPlayer();
        }
    }
})
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
    //document.querySelector(".player-0-panel").classList.remove("active");
    //document.querySelector(".player-1-panel").classList.add("active");
}

document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    scores = [0 , 0]
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}