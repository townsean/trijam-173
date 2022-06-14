import options from './options.json' assert { type: "json" };

let _isGameOver = false;

/**
 * Main function
 */
function main() {
    generateOptions();

    const startButton = document.getElementById('start-button');
    startButton.onclick = () => {
        onStartButtonClicked();
    }
    startButton.addEventListener("click", () => {

        onStartButtonClicked();
    });

    const restartButton = document.getElementById('restart-button');
    restartButton.onclick = () => {
        onRestartButtonClicked();
    }
}

/**
 * 
 */
function onStartButtonClicked() {
    const backgroundAudio = getAudio('assets/soundtrack.wav', 0.25, true);
    backgroundAudio.play();

    const startScene = document.getElementById('start-scene');
    startScene.classList.add('hidden');

    startGame();
}

/**
 * 
 */
function onRestartButtonClicked() {
    const endScene = document.getElementById('end-scene');
    endScene.classList.add('hidden');

    startGame();
}

/**
 * 
 */
function startGame() {
    _isGameOver = false;
    const gameScene = document.getElementById('game-scene');
    gameScene.classList.remove('hidden');

    const container = document.getElementById('copy-monster-container');
    container.classList.remove('hidden');

    const monsterFeatures = generateMonster();

    // hide monster after 3 seconds
    setTimeout(() => {
        const container = document.getElementById('copy-monster-container');
        container.classList.add('hidden');

        const optionsContainer = document.getElementById('options');
        optionsContainer.classList.remove('hidden');

        let countdown = 10;
        const countdownSpan = document.getElementById('countdown');
        countdownSpan.innerText = countdown;

        const interval = setInterval(() => {
            if(_isGameOver) {
                clearInterval(interval);
                return;
            }

            if(countdown == 0) {
                clearInterval(interval);
                endGame();
            } else {
                countdown--;
                countdownSpan.innerText = countdown;
            }
        }, 1000);
    }, 3000);
}

/**
 * 
 */
function endGame(hasWon = false) {
    _isGameOver = true;

    const gameScene = document.getElementById('game-scene');
    gameScene.classList.add('hidden');

    const endScene = document.getElementById('end-scene');
    endScene.classList.remove('hidden');

    const optionsContainer = document.getElementById('options');
    optionsContainer.classList.add('hidden');

    const countdownSpan = document.getElementById('countdown');
    countdownSpan.innerText = 10;

    const compareSection = document.getElementById('compare-section');
    compareSection.innerHTML = '';

    const message = document.getElementById('endgame-message');
    if(hasWon) {
        message.innerText = "Mimicked! Play"
        const victorySound = getAudio("assets/victory.wav");
        victorySound.play();
    } else {
        message.innerText = "Whoops! Try"
        const failSound = getAudio("assets/fail.wav");
        failSound.play();
    }

    const copyMonster = document.getElementById('monster-to-copy');
    const mimicMonster = document.getElementById('mimic-monster');

    compareSection.append(document.importNode(copyMonster, true), document.importNode(mimicMonster, true));
}

/**
 * Generate option selections
 */
function generateOptions() {
    const eyebrowOptions = document.getElementById('eyebrow-options');
    const eyeOptions = document.getElementById('eye-options');
    const noseOptions = document.getElementById('nose-options');
    const mouthOptions = document.getElementById('mouth-options');

    addOptionsToSection(eyebrowOptions, options.eyebrows);
    addOptionsToSection(eyeOptions, options.eyes);
    addOptionsToSection(noseOptions, options.noses);
    addOptionsToSection(mouthOptions, options.mouth);
}

/**
 * 
 * @param {*} element 
 */
function addOptionsToSection(element, options) {
    for(let option of options) {
        const optionElement = getOptionElement(option);
        element.appendChild(optionElement);
    }
}

/**
 * 
 * @param {*} optionClassName 
 * @returns 
 */
function getOptionElement(optionClassName) {
    const optionContainer = document.createElement('div');
    const option = document.createElement('div');

    optionContainer.classList.add('option');
    option.classList.add(optionClassName);

    const blipSound = getAudio("assets/blip.wav");

    optionContainer.appendChild(option);
    optionContainer.addEventListener("mouseup", (event) => {
        let className = event.target.className;
        if(className == 'option') {
            className = event.target.firstChild.className;
        }
        
        let partName = className.split('-');
        switch(partName[0]) {
            case "eyebrow":
                updateEyebrows(className);
                break;
            case "eye":
                updateEyes(className);
                break;
            case "nose":
                updateNose(className);
                break;
            case "mouth":
                updateMouth(className);
                break;
            default:
                break;
        }

        blipSound.play();

        if(isMonsterMimicked()) {
            endGame(true);
        }
    });

    return optionContainer;
}

/**
 * Checks to see if the monster has been copied correctly
 * @returns True if monster has been correctly copied, otherwise, false.
 */
function isMonsterMimicked() {
    let isMimicked = true;

    // copied monster elements
    const copyLeftEyebrow = document.getElementById('copy-left-eyebrow');
    const copyLeftEye = document.getElementById('copy-left-eye');
    const copyNose = document.getElementById('copy-nose');
    const copyMouth = document.getElementById('copy-mouth');

    // mimic elements
    const leftEyebrow = document.getElementById('left-eyebrow');
    const leftEye = document.getElementById('left-eye');
    const nose = document.getElementById('nose');
    const mouth = document.getElementById('mouth');

    if(copyLeftEyebrow.className != leftEyebrow.className) {
        isMimicked = false;
    }

    if(copyLeftEye.className != leftEye.className) {
        isMimicked = false;
    }

    if(copyNose.className != nose.className) {
        isMimicked = false;
    }

    if(copyMouth.className != mouth.className) {
        isMimicked = false;
    }

    return isMimicked;
}

/**
 * 
 * @param {*} className 
 */
function updateEyebrows(className) {
    const leftEyebrow = document.getElementById('left-eyebrow');
    const rightEyebrow = document.getElementById('right-eyebrow');

    leftEyebrow.className = className;
    rightEyebrow.className = className;
}

/**
 * 
 * @param {*} className 
 */
 function updateEyes(className) {
    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');

    leftEye.className = className;
    rightEye.className = className;
}

/**
 * 
 * @param {*} className 
 */
 function updateNose(className) {
    const nose = document.getElementById('nose');
    nose.className = className;
}

/**
 * 
 * @param {*} className 
 */
 function updateMouth(className) {
    const mouth = document.getElementById('mouth');
    mouth.className = className;
}

/**
 * Generates the appearance of a monster to mimic
 * @returns Monster features
 */
function generateMonster() {
    const leftEyebrow = document.getElementById('copy-left-eyebrow');
    const rightEyebrow = document.getElementById('copy-right-eyebrow');

    const leftEye = document.getElementById('copy-left-eye');
    const rightEye = document.getElementById('copy-right-eye');

    const nose = document.getElementById('copy-nose');
    const mouth = document.getElementById('copy-mouth');

    // clear previous appearance
    leftEyebrow.className = '';
    rightEyebrow.className = '';
    leftEye.className = '';
    rightEye.className = '';
    nose.className = '';
    mouth.className = '';

    // get random features
    let eyebrowIndex = getRandomInt(0, options.eyebrows.length);
    let eyeIndex = getRandomInt(0, options.eyes.length);
    let noseIndex = getRandomInt(0, options.noses.length);
    let mouthIndex = getRandomInt(0, options.mouth.length);
    let colorIndex = getRandomInt(0, options.colors.length); 

    let monsterFeatures = {
        eyebrow: options.eyebrows[eyebrowIndex],
        eye: options.eyes[eyeIndex],
        nose: options.noses[noseIndex],
        mouth: options.mouth[mouthIndex],
        color: options.colors[colorIndex]
    }

    // Update monster appearance with new features
    leftEyebrow.classList.add(monsterFeatures.eyebrow);
    rightEyebrow.classList.add(monsterFeatures.eyebrow);
    leftEye.classList.add(monsterFeatures.eye);
    rightEye.classList.add(monsterFeatures.eye);
    nose.classList.add(monsterFeatures.nose);
    mouth.classList.add(monsterFeatures.mouth);

    return monsterFeatures;
}

/**
 * Generates new audio
 * @param {*} url 
 * @param {*} volume 
 * @param {*} loop 
 * @returns 
 */
function getAudio(url, volume = 0.5, loop = false) {
    const audio = new Audio();
    audio.src = url;
    audio.volume = volume;
    audio.loop = loop;
   
    return audio;
}

/**
 * Gets a random number between min (inclusive) and max (exclusive)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
 * @param {*} min Minimum number
 * @param {*} max Maximum number
 * @returns A random number between min and max
 */
 function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

main();