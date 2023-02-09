import { categories } from './Categories.js';

const btnCategories = [...document.querySelectorAll('[data-category]')];
const btnCheck = document.getElementById('button__check');
const btnNext = document.getElementById('button__next');
const inputForm = document.querySelector('input');
const wordForGuessedPL = document.getElementById('word');
const span = document.querySelector('span.hide');
const answerItem = document.getElementById('answer')
const table = document.querySelector('table');
const answerCorrect = document.querySelector('h4');
let counter = 0;
let counterWrong = 0;
let actualCategory = null;
let wordForGuessedOnSpain = "";
const resultCorrect = document.getElementById('counterCorrectAnswer');
const resultWrong = document.getElementById('counterWrongAnswer');
let wrongAnswerQuestion = [];
let wrongAnswerQuestionPL = [];
const btnShowWrong = document.getElementById('button__showWrong');

btnCategories.forEach((item) =>
  item.addEventListener("click", () => {
    choiceCategory(item.id);
  })
);

const resetAllProperty = () => {
    counter = 0;
    counterWrong = 0;
    resultCorrect.innerHTML = `poprawne: ${counter}`;
    resultWrong.innerHTML = `błędne: ${counterWrong}`;
    answerItem.innerText = '';
    answerCorrect.innerText = '';
    inputForm.value = '';
    wrongAnswerQuestion = [];
    wrongAnswerQuestionPL = [];
    table.innerHTML = '';
    btnShowWrong.disabled = false;
    inputForm.style.display = 'inline';

}

const showModal = () => {

    document.querySelector('.modal-wrap').classList.toggle('active');
    document.querySelector('.modal-wrap').classList.toggle('blur');

}

const hideModal = () => {

    resetAllProperty();
    document.querySelector('.modal-wrap').classList.toggle('active');
    document.querySelector('.modal-wrap').classList.toggle('blur');

}

span.addEventListener('click', hideModal);

const disabledButtons = () => {
    btnNext.disabled = true;
    btnNext.classList.add('btn__disababled::disabled');
    btnCheck.disabled = true;
    btnCheck.classList.add('btn__disababled::disabled');
}

const visibleButtons = () => {

    btnNext.disabled = false;
    btnNext.classList.remove('btn__disababled::disabled');
    btnCheck.disabled = false;
    btnCheck.classList.remove('btn__disababled::disabled');
}

const shoWtable = document.getElementById('table');

const switchOffTable = () => {
    answerItem.style.display = "block";
    answerCorrect.style.display = "block";
    inputForm.style.display = "block";
    shoWtable.style.display = 'none';

}


const switchOnTable = () => {
    shoWtable.style.display = 'flex';
    answerItem.style.display = "none";
    answerCorrect.style.display = "none";
    inputForm.style.display = "none";

}

let i = 1;


const nextWord = () => {

    btnCheck.disabled = false;
    answerItem.innerText = '';
    answerCorrect.innerText = '';
    inputForm.value = '';
    const categoryLength = categories[actualCategory].questionPl.length;
    let nextWordOnPL = categories[actualCategory].questionPl[i];
    let nextWordOnESP = categories[actualCategory].questionES[i]

    if (i < categoryLength) {
        wordForGuessedOnSpain = nextWordOnESP;
        wordForGuessedPL.innerHTML = nextWordOnPL;
    }

    else {
        disabledButtons();
        inputForm.style.display = 'none';
    }
    i++;
}

const checkWord = (word) => {

    word = wordForGuessedOnSpain;

    if (inputForm.value.toLocaleLowerCase() === word) {
        showAnswerCorrect();
    }

    else {
        counterWrong++;
        showAnswerUnCorrect();
    }

}

const startCategory = (id, wordESP, wordPL) => {

    switchOffTable();
    visibleButtons();
    showModal();
    wordForGuessedPL.innerHTML = wordPL[0];
    wordForGuessedOnSpain = wordESP[0];

}

const choiceCategory = (e) => {

    counter = 0;
    const categoryID = e;
    const buttonID = e;
    const arrayWordsCategoryOfESP = categories[categoryID].questionES;
    const arrayWordsCategoryOfPL = categories[categoryID].questionPl;

    if (buttonID === categoryID) {

        i = 1;
        actualCategory = buttonID;
        startCategory(categoryID, arrayWordsCategoryOfESP, arrayWordsCategoryOfPL);

    }
}

const showAnswerCorrect = function () {

    ++counter;
    btnCheck.classList.add('btn__disababled::disabled');
    btnCheck.disabled = true;
    answerCorrect.innerHTML = "";
    answerItem.style.color = "green";
    answerItem.style.fontSize = "60px";
    answerItem.innerHTML = `<i class="fas fa-check"></i>`;
    resultCorrect.innerHTML = `poprawne: ${counter}`;

}

const showAnswerUnCorrect = function () {

    btnCheck.disabled = true;
    answerItem.innerHTML = `<i class="fas fa-times"></i>`;
    answerItem.style.fontSize = "60px";
    answerItem.style.color = "red";

    answerCorrect.style.color = "blue";
    answerCorrect.style.fontSize = "20px";
    answerCorrect.innerText = ` poprawna to: ${wordForGuessedOnSpain.toLocaleUpperCase()}`;

    resultWrong.innerHTML = `błędne: ${counterWrong}`;

    wrongAnswerQuestion.push(`${wordForGuessedOnSpain}`);
    wrongAnswerQuestionPL.push(`${wordForGuessedPL.innerText}`);

}



const showAllAnswerInCorrect = () => {

    switchOnTable();
    const wrongWordLength = wrongAnswerQuestion.length;
    const tableTh = `<tr><th>Słowo</th><th>Tłumaczenie</th></tr>`;

    const row = table.insertRow(0);
    const cellA = row.insertCell(0);
    const cellB = row.insertCell(1);

    let j = 0;
    for (j = 0; j < wrongWordLength; j++) {

        row[j] = table.insertRow(j);
        cellA[j] = row[j].insertCell(0);
        cellB[j] = row[j].insertCell(1);
        cellA[j].innerHTML = wrongAnswerQuestionPL[j];
        cellB[j].innerHTML = wrongAnswerQuestion[j];
        cellB[j].style.color = 'green';

        btnCheck.disabled = true;
        btnNext.disabled = true;
        btnShowWrong.disabled = true;
    }

}

btnCategories.forEach(button => {
    button.addEventListener('click', choiceCategory);
})
btnNext.addEventListener('click', nextWord);
btnCheck.addEventListener('click', checkWord);

btnShowWrong.addEventListener('click', showAllAnswerInCorrect)




