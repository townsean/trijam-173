import options from './options.json' assert { type: "json" };

/**
 * Main function
 */
function main() {
    generateOptions();

    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        const backgroundAudio = getAudio('assets/soundtrack.wav', 0.25, true);
        backgroundAudio.play();

        const startScene = document.getElementById('start-scene');
        startScene.classList.add('hidden');

        startGame();
    });

    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        const endScene = document.getElementById('end-scene');
        endScene.classList.add('hidden');

        startGame();
    });
}

/**
 * 
 */
function startGame() {
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
function endGame() {
    const gameScene = document.getElementById('game-scene');
    gameScene.classList.add('hidden');

    const endScene = document.getElementById('end-scene');
    endScene.classList.remove('hidden');

    const optionsContainer = document.getElementById('options');
    optionsContainer.classList.add('hidden');

    const countdownSpan = document.getElementById('countdown');
    countdownSpan.innerText = 10;
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

    optionContainer.appendChild(option);

    return optionContainer;
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