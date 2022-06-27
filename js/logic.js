"use strict"

import { generateRandomNumber } from './modules/generateRandomNumber.js';

let startGameButton = (document.getElementById("playerStartsGame"));
startGameButton.addEventListener("click", startGame);

let drawsNewCardButton = document.getElementById("playerDrawsNewCard");
drawsNewCardButton.addEventListener("click", drawNewCard);

var deckOfCards = {
    1: ["H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12"],
    2: ["D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12"],
    3: ["C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","C11","C12"],
    4: ["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","S12"],
}


let firstCard, secondCard, newCard;
let xD1, yD1;
let firstDrawResults = [];

let drawnNumbers = []

let drawnTime = 0;
let sum=0;
let numbersToSum = 0;
let cards = [];

let imageArr=[];

let x = 0;

//DOM
let firstDraw = document.getElementById("first-draw-el");
let status = document.getElementById("status-el");

let additionalDraw = document.getElementById("additional-draw-el");
let displaySum = document.getElementById("sum-el");

let drawStart = document.getElementById("first-draw");
let leftHalf = document.getElementById("left-half");
let rightHalf = document.getElementById("right-half");

let secondDraw = document.getElementById("second-draw");



function startGame(){
    if(drawnTime === 0){

        var f = generateRandomNumber(1,4);
        var g = generateRandomNumber(1,4);
        var h = generateRandomNumber(0,12);
        var i = generateRandomNumber(0,12);

        firstCard = deckOfCards[g][h];
        secondCard = deckOfCards[f][i];

        //no repeat
        do{
            f = generateRandomNumber(1,4);
            g = generateRandomNumber(1,4);
            h = generateRandomNumber(0,11);
            i = generateRandomNumber(0,11);
            firstCard = deckOfCards[g][h];
            secondCard = deckOfCards[f][i];
        } while(firstCard === secondCard)
        
        xD1 = firstCard;
        yD1 = secondCard;
        
        var firstCardNum = parseInt(deckOfCards[g][h].substr(1));
        var secondCardNum = parseInt(deckOfCards[f][i].substr(1));
        var firstSum = firstCardNum + secondCardNum;

        drawnNumbers.push(firstSum);

        firstDrawResults = [drawnNumbers, xD1, yD1];
        

        firstDraw.textContent=`${firstCard}, ${secondCard}`;

        //DOM
        drawStart.classList.add("cards-drawn");

        leftHalf.innerHTML = `<img src="cards/${firstCard}.png" alt="Card">`;
        rightHalf.innerHTML = `<img src="cards/${secondCard}.png" alt="Card">`;

        leftHalf.classList.add("left-show");
        rightHalf.classList.add("right-show");

        renderGame(...firstDrawResults);


    } else {
        console.log("Already Started!")
    }
}

function renderGame(...args){

if(sum<21){

    if (drawnTime === 0){
        drawnTime++;
        sum = parseInt(args[0]);
        xD1 = args[1];
        yD1 = args[2];
        cards=[xD1, yD1]
        displaySum.textContent = `Sum: ${sum}`;
    }
    else
    {
        drawnTime++;

        console.log("Before", cards);
        for(let i=0; i<cards.length; i++){
            while(cards[i] === args[0]){
                console.log("same", cards[i])
                args[0] = deckOfCards[generateRandomNumber(1,4)][generateRandomNumber(1,13)];
            }
        }

        cards.push(args[0]); 
        console.log("After", cards); 

        if(drawnTime===2){
            for(let i=0; i<cards.length; i++){
                numbersToSum = parseInt(cards[i].substr(1));
                x = x+numbersToSum;
            }
        } else{
            x = x+parseInt(cards[(cards.length)-1].substr(1));
        }

        sum =x;

        //to display added cardss
        let dispAdded = [];
        for(let j=2; j<cards.length; j++){
            dispAdded.push(cards[j]);
        }

        let image="";
        for(let i=0; i<dispAdded.length; i++){

            imageArr[i] = `<img src="cards/${dispAdded[i]}.png" alt="card">`
            image = image+imageArr[i]
            secondDraw.innerHTML =  image;
        }

        additionalDraw.textContent = dispAdded;

        displaySum.textContent = displaySum.textContent = `Sum: ${x}`;
        
    } //drawntime else   
}
    if(sum===21){
        status.innerHTML = "<h1>You've Won!</h1>";
        document.getElementById("wrapper").style.backgroundColor = "green";

    } else if (sum<21){
        status.textContent = "You're still in the game...";
    } else{
        status.innerHTML = "<h1>You've Lost!</h1>";
        document.getElementById("wrapper").style.backgroundColor = "red";
    }
}



function drawNewCard(){

    let a = generateRandomNumber(1,4);
    let b = generateRandomNumber(1,4);
    newCard = deckOfCards[a][b];
  
    renderGame(newCard);
}

