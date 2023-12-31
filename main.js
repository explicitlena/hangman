const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const hintBtn = document.getElementById('hint-button');
const newWordBtn = document.getElementById('new-word-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['gigabyte','software','download','application', 'programming', 'internet', 'motherboard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordE1.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                `
            )
            .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃';
        finalMessageRevealWord.innerText = `the word was: ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
}

// Update the wrong letters
function updateWrongLettersE1() {
    // Display wrong letters
    wrongLettersE1.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong letters:</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        finalMessageRevealWord.innerText = `the word was: ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if (playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key.toLowerCase();

            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);

                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);

                    updateWrongLettersE1();
                } else {
                    showNotification();
                }
            }
        }
    }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersE1();

    popup.style.display = 'none';

    playable = true;
});

displayWord();


// New word 
newWordBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersE1();

    popup.style.display = 'none';

    playable = true;
});

// Hint button, click to get a hint
hintBtn.addEventListener('click', () => {
        var hint = document.getElementById("hintTxt");
        hint.innerHTML = '💡 There are only computer related words.  ( ˘ ͜ʖ ˘)';
        hintBtn.textContent = 'Hint used';
    }
);


