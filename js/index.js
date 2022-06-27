"use strict";

import { generateRandomNumber } from './modules/generateRandomNumber.js';

let startGameButton = (document.getElementById("playerStartsGame"));
startGameButton.addEventListener("click", startGame);

let drawsNewCardButton = document.getElementById("playerDrawsNewCard");
drawsNewCardButton.addEventListener("click", drawNewCard);

let result = document.getElementById("result");
result.innerText = "* * *"

let dispFirstCard = document.getElementById("firstCard");
let dispSecondCard = document.getElementById("secondCard");

let DispDrawnTimes = document.getElementById("drawn");

let status, firstCard, secondCard, isAlive, hasBlackJack, message, drawnTimes, sum;

// var playerName = prompt("Name: ")

let player = {
    name: "Henry",
    chips: 20
}

document.getElementById("player-el").textContent = `${player.name} - $${player.chips}`;

let drawNum = 0;
let drawnCard = [];

isAlive = true;
hasBlackJack = false;
drawnTimes = 1;

let firstDraw = true;


let y = 0;

function startGame(){
    //initialization
    firstCard = generateRandomNumber(1, 12);
    secondCard = generateRandomNumber(1, 12);

    let cards = [firstCard, secondCard]
    sum = 0;
    //calling render game function
    renderGame(...cards);
    drawNum = 0;
    drawnCard = [];
    document.getElementById("drawnCard").innerText = "";
    document.getElementById("playerDrawsNewCard").style.display = "block";
    isAlive = true;
    hasBlackJack = false;

    var card = document.getElementById("card");
    console.log("Card" +  document.getElementsByClassName("card"));

    console.log(card.classList.add("card-drawn"));

}

let arr = [];


function renderGame(...args) {

    let drawTime = [...args];

    if (drawTime.length === 2){
        arr = drawTime;
        drawnTimes = 1;
    }
    else{
        arr.push(...args);
        drawnTimes++;
    }

    console.log("ARR",arr);

    if(drawnTimes === 1){
        for(let i=0; i<arr.length; i++){
            sum = sum + parseInt(arr[i]);
            console.log(arr[i]);
        }
    } else{
        for(let i=2; i<arr.length; i++){

            sum = sum + parseInt(arr[i]);
            console.log(arr[i]);
        }
    }

    //points calculation
    if (sum === 21) {
        message= "You've won!";
        result.innerText = message;

        hasBlackJack = true;

        dispFirstCard.innerText = arr[0];
        dispSecondCard.innerText = arr[1];
        DispDrawnTimes.innerText = drawnTimes + " times";
    }
    else if (sum < 21) {
        message = "You're in the game!";
        result.innerText = message;

        dispFirstCard.innerText = arr[0];
        dispSecondCard.innerText = arr[1];
        DispDrawnTimes.innerText = drawnTimes + " times";
    }
    else {
        message = "You've lost!";
        result.innerText = message;
        isAlive = false;
        DispDrawnTimes.innerText = drawnTimes + " times";   
    }
    //points calculation

    document.getElementById("total").innerHTML = sum; 

    isAlive == false || hasBlackJack == true ? document.getElementById("playerDrawsNewCard").style.display = "none" : document.getElementById("playerDrawsNewCard").style.display = "block"
    
}

function drawNewCard() {
    if(isAlive == true && hasBlackJack == false){

    //generate random number
    let cardVar = generateRandomNumber(2,11);

    // assigning random number to an array's index
    drawnCard[drawNum] = cardVar;
    drawNum++; //array index counter

    document.getElementById("drawnCard").innerText = drawnCard;
    console.log("Random Card: ", cardVar);
    renderGame(cardVar);
    }
}


console.log(drawnCard);

// startDraw();










