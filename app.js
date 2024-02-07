const questionsBase = [
    {
        src: "./img/1.jpg",
        text: 'Выберите верную дату выпуска игры',
        answers: ['10.05.2012','22.10.2010','15.03.2013','08.01.2012'],
        rightIndex: 0,
    },
    {
        src: "./img/2.jpg",
        text: 'Сколько слез ауры нужно, чтобы собрать Ифрита?',
        answers: ['20','25','30','35'],
        rightIndex: 2,
    },
    {
        src: "./img/3.jpg",
        text: 'Сколько МУЖСКИХ костюмов в игре? (без учета стилей)',
        answers: ['15','10','20','17'],
        rightIndex: 3,
    },
    {
        src: "./img/4.jpg",
        text: 'Красный философский камень, повышает вероятность успешного улучшения в',
        answers: ['6раз','5раз','7раз','4раз'],
        rightIndex: 0,
    },
    {
        src: "./img/5.jpg",
        text: 'Где НЕ появляется кристальный сундук',
        answers: ['Междуречье','Аркон','Катакомбы 3-й этаж','Большой разлом'],
        rightIndex: 3,
    },
    {
        src: "./img/6.jpg",
        text: '"Тёмная сторона" для Темных Рыцарей это',
        answers: ['Название задания','Пассивное умение','Название ветки в билде','Состояние души'],
        rightIndex: 1,
    },
    {
        src: "./img/7.jpg",
        text: 'Сколько всего ивентов в игре? (без учета ивентов Lesta Games)',
        answers: ['7','8','6','9'],
        rightIndex: 1,
    },
    {
        src: "./img/8.jpg",
        text: 'Цена предмета Коктейль "Злая Жужа"(у НПС за шт.)',
        answers: ['120','350','520','680'],
        rightIndex: 2,
    },
    {
        src: "./img/9.jpg",
        text: 'Какой уровень у монстра Жуткий ящер',
        answers: ['40','42','44','46'],
        rightIndex: 2,
    },
    {
        src: "./img/10.jpg",
        text: 'Чтобы получить титул "Оракул" нужно',
        answers: ['Выполнить сюжетные квесты по пустыням','Съесть 100 печенек с предсказанием','Убить N кол-во анубисов','Побывать на 2ом этаже пирамиды'],
        rightIndex: 1,
    },
];

const allScreens = document.querySelectorAll('.screen');
const allAnswers = document.querySelectorAll('.answer');
const startGameButtons = document.querySelectorAll('.start-game');
const answerCounter = document.querySelectorAll('.correct-count');
const questionImage = document.querySelector('img');
const rightAnswerPoint = 1;
const highlightTimeout = 1500;
let imgIndex = 0;
let activeQuestionIndex = 0;
let points = 0;
let imgCount = 0;

startGameButtons.forEach(button => {
    button.addEventListener('click', startNewGame)
})

function startNewGame() {
    showScreen(1);
    setActiveQuestion(0);
    updatePoints(0);
    imgCount = 0;
}

function showScreen(index) {
    allScreens.forEach((screen, i) => {
        screen.classList.toggle('visible', i === index);
    })
}


function updatePoints(newPoint) {
    points = newPoint;
    answerCounter.forEach(resultPoint => {
        resultPoint.textContent = points;
    });
}

function setActiveQuestion(index) {
    activeQuestionIndex = index;

    const question = document.querySelector('.question');
    const activeQuestion = questionsBase[index];

    question.textContent = activeQuestion.text;

    activeQuestion.isChecking = false;

    setupAnswers(activeQuestion)
}


function setupAnswers(question) {
    const letters = ['A','B','C','D'];
    allAnswers.forEach((answerNode, index)=>{
        answerNode.textContent = `${letters[index]}. ${question.answers[index]}`;

        answerNode.addEventListener('click', () => {
            handleAnswerClick(answerNode, question);
        })
    });
}

async function handleAnswerClick(answerNode, question) {
    if(question.isChecking) {
        return;
    }

    question.isChecking = true;

    await highlightAnswer(answerNode, 'active');

    const rightAnswerNode = allAnswers[question.rightIndex];

    const isLastQuestion = activeQuestionIndex === questionsBase.length - 1
    
    const isRightAnswer = rightAnswerNode.textContent === answerNode.textContent

    if(isLastQuestion) {
        showScreen(2);
    } else {
        setActiveQuestion(activeQuestionIndex + 1)
    }

    if(isRightAnswer){
        updatePoints(points + 1);
    }
}

async function highlightAnswer(answerNode, type) {
    answerNode.classList.add(type);

    await timeout(1500);

    clearClassNameFromQuestion(answerNode);
}

function clearClassNameFromQuestion(answerNode) {
    ['active', 'right'].forEach(className => {
        answerNode.classList.remove(className)
    })
}

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const setImg = currentDataImg => {
    questionImage.src = currentDataImg.src;
}

setImg(questionsBase[0]);

allAnswers.forEach(button => {
    button.addEventListener('click', onChangeImg)
})

async function onChangeImg() {
    if(imgCount === questionsBase.length - 1) {
        imgCount = 0;
    } else {
        imgCount += 1;
    }
    await timeout(1500);

    setImg(questionsBase[imgCount]);
}
