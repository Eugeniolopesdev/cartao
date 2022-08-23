const INPUT_NUMERO = document.getElementById('numero');

const INPUT_TITULAR = document.getElementById('titular');
const INPUT_CPF = document.getElementById('cpf');
const INPUT_CVV = document.getElementById('cvv');
const SELECT_MES = document.getElementById('mes');
const SELECT_ANO = document.getElementById('ano');

const CARD_BANDEIRA = document.getElementById('card_bandeira'); 
const CARD_NUMERO = document.getElementById('card_numero'); 
const CARD_TITULAR = document.getElementById('card_titular'); 
const CARD_MES = document.getElementById('card_mes'); 
const CARD_ANO = document.getElementById('card_ano'); 
const CARD_CVV = document.getElementById('card_cvv');

const VERSO = document.getElementById('verso');
const FRENTE = document.getElementById('frente');

INPUT_NUMERO.addEventListener('keyup', function () {
    let num = INPUT_NUMERO.value.replaceAll(' ', '');

    if (num.length === 0) {
        CARD_NUMERO.innerHTML = '0000 0000 0000 0000';
        return;
    }

    //pra remover letras
    if (isNaN(num.substr(-1))) {
        INPUT_NUMERO.value = num.substr(0, num.length -1);
        return;
    }

    //quebrar os numeros em uma lista / array
    let digitos = num.split(''); 

    let card = ''; 

    //percorre cada digito 
    digitos.forEach(function (cadaDigito, posicao) {
       card += cadaDigito;

       //se for divisivel por 04, entao add um espaço em branco
       if ((posicao + 1) % 4 === 0) {
            card += ' ';
       }
    })

    CARD_NUMERO.innerHTML = card;
    INPUT_NUMERO.value = card;

    if (digitos[0] == 3) {
        CARD_BANDEIRA.innerHTML = '<img src="img/mastercard.png" width="50px">';
    } else if (digitos[0] == 4) {
        CARD_BANDEIRA.innerHTML = '<img src="img/visa.png" width="50px">';
    }
});


INPUT_TITULAR.addEventListener('keyup', function () {
    let titular = INPUT_TITULAR.value;
    
    //se o ultimo digito for numerico e for diferente de espaço
    if (false === isNaN(titular.substr(-1)) && titular.substr(-1) !== ' ') {
        titular = titular.substr(0, titular.length -1);
    }

    INPUT_TITULAR.value = titular.toUpperCase();
    CARD_TITULAR.innerHTML = titular || 'NOME SOBRENOME';
});

//PARA O SELECT ANO
for (ano = 22; ano <= 30; ano++) {
    SELECT_ANO.innerHTML += `
        <option value="${ano}">20${ano}</option>
    `;
}

//objeto, dicionario
let meses = { // 'chave': 'valor'
    '01': 'Janeiro',
    '02': 'Fevereiro',
    '03': 'Março',
    '04': 'Abril',
};

for (let chave in meses) {
    SELECT_MES.innerHTML += `
        <option value="${chave}">${chave} - ${meses[chave]}</option>
    `;
}

SELECT_MES.addEventListener('change', function () {
    CARD_MES.innerHTML = SELECT_MES.value;
});

SELECT_ANO.addEventListener('change', function () {
    CARD_ANO.innerHTML = SELECT_ANO.value;
});

INPUT_CVV.addEventListener('keyup', function () {
    CARD_CVV.innerHTML = INPUT_CVV.value;
});

//dá o foco
INPUT_CVV.addEventListener('focus', function () {
    FRENTE.setAttribute('hidden', true); //esconder
    
    VERSO.removeAttribute('hidden'); //mostra
    VERSO.classList.add('animate__flipInY');
});

//tira o foco
INPUT_CVV.addEventListener('blur', function () {
    VERSO.setAttribute('hidden', true); //esconde
    
    FRENTE.removeAttribute('hidden');
    FRENTE.classList.add('animate__flipInY');
});


$('#cpf').mask('000.000.000-00');
$('#cvv').mask('000');