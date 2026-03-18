const config = {
    mode: 'words',
    language: 'en',
}

const wordsWrapper = document.getElementById("words-wrapper");
const inputField = document.getElementById("hidden-input");
const timerEl = document.getElementById("timer");
const timeButtons = document.querySelectorAll(".buttons-right button");

const resWpm = document.getElementById("res-wpm");
const resAcc = document.getElementById("res-acc");
const resChars = document.getElementById("res-chars");
const resTime = document.getElementById("res-time");


const wordsList = "in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also".split(" ");
const quotesList = ["the quick brown fox jumps over the lazy dog",
    "to be or not to be that is the question",
    "all that glitters is not gold",
    "in the middle of difficulty lies opportunity",
    "life is what happens when you are busy making other plans",
    "the only way to do great work is to love what you do",]

    const wordsListRu = "в и не на я что он это как но его они мы до при был это то что все так его как при нет уже там где все был это как так нет уже там где все быть кто себя один мой она так нет мне что если да нет только там когда уже такой ещё очень что между потому после снова найти думать жизнь время место такой другой знать делать говорить видеть хотеть стать идти дать взять сказать понять начать".split(" ");

let gameTime = 30 * 1000;
let timer = null;
let gameStart = null;
let lineShiftY = 0;
let currentWordIndex = 0;

function formatWord(word) {
    const letters = word.split("").map(l => `<span class="letter">${l}</span>`).join("");
    return `<div class="word">${letters}</div>`;
}


function newGame() {
    wordsWrapper.innerHTML = "";
    wordsWrapper.style.transform = "translateY(0px)";
    lineShiftY = 0;
    currentWordIndex = 0;

    let wordsToUse = [];

    if (config.mode === 'quote') {
        const randomQuote = quotesList[Math.floor(Math.random() * quotesList.length)];
        wordsToUse = randomQuote.split(' ');
    } else {
        const source = config.language === 'ru' ? wordsListRu : wordsList;
        for (let i = 0; i < 250; i++) {
            wordsToUse.push(source[Math.floor(Math.random() * source.length)]);
        }
    }

    wordsToUse.forEach(word => {
        wordsWrapper.innerHTML += formatWord(word);
    });

    const firstWord = wordsWrapper.children[0];
    firstWord.classList.add("current");
    firstWord.children[0].classList.add("current");

    timerEl.innerHTML = gameTime / 1000;
    clearInterval(timer);
    timer = null;
    gameStart = null;
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();
}

function handleShift(nextWord) {
    const wordHeight = 35; 
    const limit = 40; 

    if (nextWord.offsetTop > lineShiftY + limit) {
        lineShiftY += wordHeight;
        wordsWrapper.style.transform = `translateY(-${lineShiftY}px)`;
    }
}

inputField.addEventListener("keydown", (ev) => {
    const key = ev.key;
    const words = wordsWrapper.children;
    const currentWord = words[currentWordIndex];
    const currentLetter = currentWord.querySelector(".letter.current");

    if (!timer && key.length === 1 && key !== " ") {
        gameStart = new Date().getTime();
        timer = setInterval(() => {
            const passed = new Date().getTime() - gameStart;
            const left = Math.round((gameTime - passed) / 1000);
            if (left <= 0) {
                timerEl.innerHTML = "0";
                gameOver();
            } else {
                timerEl.innerHTML = left;
            }
        }, 1000);
    }

    if (key.length === 1 && key !== " ") {
        if (currentLetter) {
            const expected = currentLetter.textContent;
            currentLetter.classList.add(key === expected ? "correct" : "incorrect");
            currentLetter.classList.remove("current");
            if (currentLetter.nextSibling) {
                currentLetter.nextSibling.classList.add("current");
            }
        }
    }

    if (key === " ") {
        ev.preventDefault();
        if (currentWordIndex >= words.length - 1) return;

        currentWord.classList.remove("current");
        if (currentLetter) currentLetter.classList.remove("current");

        currentWordIndex++;
        const nextWord = words[currentWordIndex];
        nextWord.classList.add("current");
        nextWord.children[0].classList.add("current");

        handleShift(nextWord);
        inputField.value = "";
    }

    if (key === "Backspace") {
        if (currentLetter && currentLetter !== currentWord.firstChild) {
            currentLetter.classList.remove("current");
            const prev = currentLetter.previousSibling;
            prev.classList.add("current");
            prev.classList.remove("correct", "incorrect");
        } else if (!currentLetter && currentWord) {
            const last = currentWord.lastChild;
            last.classList.add("current");
            last.classList.remove("correct", "incorrect");
        }
    }
});

function gameOver() {
    clearInterval(timer);
    inputField.disabled = true;
    const correctLetters = document.querySelectorAll(".correct").length;
    const wpm = Math.round((correctLetters / 5) / (gameTime / 60000));
    resWpm.textContent = wpm;
    resTime.textContent = (gameTime / 1000) + "s";
}

timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        timeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        gameTime = parseInt(btn.textContent) * 1000;
        newGame();
    });
});


window.addEventListener("load", newGame);
document.addEventListener("click", () => inputField.focus());