export function generateRandomNumber(min, max){
    let randomNumber = Math.round(Math.random()*max);
    while (randomNumber < min){
        randomNumber = Math.round(Math.random()*max);
    }
    return randomNumber;
}