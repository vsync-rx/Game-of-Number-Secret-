let secretNumber = generateRandomNumber();
let attempts = 1;
let limitNumber = 10;
let listDrawnNumbers = [];

function namedElements(tag, textTag){
    let campo = document.querySelector(tag);
    campo.innerHTML = textTag;
    responsiveVoice.speak(textTag, 'Brazilian Portuguese Female', {rate:1.2});
}

startMensage();

function verificarChute(){    
    let kick = document.querySelector('input').value;

    if (kick == secretNumber){
        namedElements('h1', 'Você acertou!');
        namedElements('p',  attempts > 1 ?
                                `Você acertou o número secreto com ${attempts} tentativas!` 
                              : "Você acertou o número secreto com 1 tentativa!");
        
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{
        if (kick > secretNumber){
            namedElements('p', 'O número secreto é menor');
          
        }else{
            namedElements('p', 'O número secreto é maior');
        }
        clearField();
    }

    attempts++;
}

function generateRandomNumber(){
   let chosenNumber = parseInt(Math.random() * limitNumber + 1);
   let amountElementsList = listDrawnNumbers.length;

   if(amountElementsList == limitNumber){
     listDrawnNumbers = [];
   }

   if (listDrawnNumbers.includes(chosenNumber)) {
        return generateRandomNumber();
   } else {
        listDrawnNumbers.push(chosenNumber);
        return chosenNumber;
   }
}

function clearField(){
    document.querySelector('input').value = '';
}

function restartGame(){
    clearField();    
    attempts = 1;
    startMensage();
    secretNumber = generateRandomNumber();
}

function startMensage(){    
    namedElements('h1', 'Jogo do número secreto');
    namedElements('p', 'Escolha um número entre 1 e 10');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}