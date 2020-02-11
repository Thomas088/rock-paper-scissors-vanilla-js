window.addEventListener('DOMContentLoaded', function() {

    /* ----------------------- VARIABLES AND CONST -------------------- */

    // PADS 

    const rock = document.querySelector('#rock');
    const paper = document.querySelector('#paper');
    const scissors = document.querySelector('#scissors');
    const responsePad = document.querySelector('.response-pad'); // INITIALIZED AS A EMPTY PAD

    // SCREEN

    const toScreen = document.querySelector('#scoreInScreen');
    const messageChoice = document.querySelector('.container-msg-choice');
    const replayContainer = document.querySelector('.replay-container');
    const replayMessage = document.querySelector('.replay-msg');
    const replayButton = document.querySelector('.replay-btn');
    const rules = document.querySelector('#openModal');
    const closeModal = document.querySelector('#closeModal');

    /* ----------------------- ON MAIN SCREEN -------------------- */

     // MODAL RULES - FENETRE MODALE

    const sail  = document.querySelector('.sail');
    const containerRules = document.querySelector('.container-rules-img');
    
    rules.addEventListener('click', function(){
        sail.classList.add('is-visible');
        containerRules.classList.add('is-visible');
    });

    closeModal.addEventListener('click', function(){
        sail.classList.remove('is-visible');
        containerRules.classList.remove('is-visible');
    });

    /* ----------------------- WHEN THE PC PLAY -------------------- */

    // RANDOM CHOICE PLAYER PC - CHOIX DU PC

    function randomChoicePC() {
        const choiceArray = ['rock', 'paper', 'scissors'];
        return choiceArray[Math.floor(Math.random() * Math.floor(choiceArray.length))];
    };

    /* ----------------------- SCORE -------------------- */
    
    // SCORE COUNTER - CLOSURE - UNE CLOSURE POUR GARDER L'ETAT DU SCORE

    function scoreCount() {
        let scorePlayer = 0; 
        return function(eval) {
            if(eval) {
                scorePlayer++;    
            } else {
                if(!eval && scorePlayer === 0) {
                    scorePlayer = 0; 
                } else {
                    scorePlayer--; 
                }   
            }
            return setTimeout(function() {return toScreen.textContent = scorePlayer;}, 500)
        };
    }

    let result = scoreCount();

     /* ----------------------- WHEN THE GAME IS FINISHED -------------------- */

    // BACK TO GAME - RETOUR AU JEU

    replayButton.addEventListener('click', function () {
        scissors.classList.remove('invisible', 'no-interact', 'scissors-picked');
        paper.classList.remove('invisible', 'no-interact', 'paper-picked');
        rock.classList.remove('invisible', 'no-interact', 'rock-picked');
        replayContainer.classList.remove('is-visible');
        responsePad.classList.remove('is-visible', 'response-rock', 'response-paper', 'response-scissors');
        messageChoice.classList.remove('is-visible');
    })

    /* ----------------------- PADS -------------------- */

    // PADS - GENERAL BEHAVIOR FOR ALL

    const arrayPads = Array.from(document.querySelectorAll('.pad'));

    arrayPads.forEach(function (elt) {
            elt.addEventListener('click', function () {      
            elt.classList.add('no-interact'); // TO AVOID CLICK TWICE IN A ROW - POUR EVITER DE CLIQUER 2 FOIS DE SUITE PENDANT LES ANIMATIONS
            messageChoice.classList.add('is-visible');
            responsePad.classList.add('is-visible');
            setTimeout(function () {return replayContainer.classList.add('is-visible')}, 500);
        });
    });

    /* ----------------------- FOR EVERY PADS -------------------- */

    // ROCK - PIERRE

    rock.addEventListener('click', () => {

        switch (randomChoicePC()) {
            case 'rock':
                replayMessage.textContent = "EQUALITY";
                responsePad.classList.add('response-rock');
                break;
            case 'paper':
                result(false);
                replayMessage.textContent = "YOU LOSE";
                responsePad.classList.add('response-paper');
                break;
            case 'scissors':
                result(true);
                replayMessage.textContent = "YOU WIN";
                responsePad.classList.add('response-scissors');        
                break;
            default: 
                break;
        }
        document.querySelector('#scissors').classList.add('invisible', 'no-interact');
        document.querySelector('#paper').classList.add('invisible', 'no-interact');
        document.querySelector('#rock').classList.add('rock-picked');
    });

    // PAPER - FEUILLE

    paper.addEventListener('click', () => {
        
        switch (randomChoicePC()) {
            case 'rock':
                result(true);  
                replayMessage.textContent = "YOU WIN";
                responsePad.classList.add('response-rock');
                break;
            case 'paper':
                replayMessage.textContent = "EQUALITY";
                responsePad.classList.add('response-paper');
                break;
            case 'scissors':
                result(false);     
                replayMessage.textContent = "YOU LOSE";
                responsePad.classList.add('response-scissors');     
                break;
            default: 
                break;
        }
        document.querySelector('#scissors').classList.add('invisible', 'no-interact'); 
        document.querySelector('#rock').classList.add('invisible', 'no-interact');
        document.querySelector('#paper').classList.add('paper-picked'); 
    });

    // SCISSORS - CISEAUX

    scissors.addEventListener('click', () => {

        switch (randomChoicePC()) {
            case 'rock':
                result(false);
                replayMessage.textContent = "YOU LOSE";
                responsePad.classList.add('response-rock');
                break;
            case 'paper':
                result(true); 
                replayMessage.textContent = "YOU WIN";
                responsePad.classList.add('response-paper');
                break;
            case 'scissors':              
                replayMessage.textContent = "EQUALITY";
                responsePad.classList.add('response-scissors');             
                break;
            default: 
                break;
        }
        document.querySelector('#paper').classList.add('invisible', 'no-interact'); 
        document.querySelector('#rock').classList.add('invisible', 'no-interact'); 
        document.querySelector('#scissors').classList.add('scissors-picked');
    });

}); 