/**
 * Main function
 */
function main() {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        const backgroundAudio = getAudio('assets/soundtrack.wav', loop = true);
        backgroundAudio.play();

        const startScene = document.getElementById('start-scene');
        startScene.classList.add('hidden');

        startGame();
    });
}

/**
 * 
 */
function startGame() {
    const gameScene = document.getElementById('game-scene');
    gameScene.classList.remove('hidden');
}

/**
 * Generates new audio
 * @param {*} url 
 * @param {*} volume 
 * @param {*} loop 
 * @returns 
 */
function getAudio(url, volume = 0.25, loop = false) {
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