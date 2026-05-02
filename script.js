// --- DOM ELEMENTS ---
const passwordInput = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const loginScreen = document.getElementById('login-screen');
const mainContent = document.getElementById('main-content');
const endScreen = document.getElementById('end-screen');
const restartDeckBtn = document.getElementById('restart-deck-btn');
const backToLoginBtn = document.getElementById('back-to-login-btn');

// --- PASSWORD & LOGIN LOGIC ---
submitBtn.addEventListener('click', () => {
    if (passwordInput.value === '62023041') {
        errorMsg.classList.add('hidden');
        successMsg.classList.remove('hidden');
        
        // Transition screens after a short delay
        setTimeout(() => {
            loginScreen.classList.remove('active');
            loginScreen.classList.add('hidden');
            
            mainContent.classList.remove('hidden');
            mainContent.classList.add('active');
        }, 1000);
    } else {
        errorMsg.classList.remove('hidden');
    }
});

// --- TIC TAC TOE (HINTS) LOGIC ---
const tttModal = document.getElementById('ttt-modal');
const tttBoard = document.getElementById('ttt-board');
const cells = document.querySelectorAll('.cell');
const tttStatus = document.getElementById('ttt-status');
const tttRestart = document.getElementById('ttt-restart');
const tttClose = document.getElementById('ttt-close');
const tttTitle = document.getElementById('ttt-title');

let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let currentHintTarget = 1;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Attach click events to Hint buttons
document.getElementById('btn-hint-1').addEventListener('click', () => openTicTacToe(1));
document.getElementById('btn-hint-2').addEventListener('click', () => openTicTacToe(2));
document.getElementById('btn-hint-3').addEventListener('click', () => openTicTacToe(3));

function openTicTacToe(hintNumber) {
    currentHintTarget = hintNumber;
    tttTitle.innerText = `Win to unlock Hint ${hintNumber}`;
    tttModal.classList.remove('hidden');
    resetGame();
}

tttClose.addEventListener('click', () => tttModal.classList.add('hidden'));
tttRestart.addEventListener('click', resetGame);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) return;

    makeMove(cell, index, 'X');
    checkWinner();

    if (gameActive) {
        tttStatus.innerText = "Bot is thinking...";
        setTimeout(botMove, 500);
    }
}

function makeMove(cellElement, index, player) {
    board[index] = player;
    cellElement.innerText = player;
    cellElement.classList.add(player.toLowerCase());
}

function botMove() {
    let availableCells = [];
    board.forEach((val, idx) => { if (val === '') availableCells.push(idx); });

    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        let cellToPlay = document.querySelector(`.cell[data-index="${randomIndex}"]`);
        
        makeMove(cellToPlay, randomIndex, 'O');
        checkWinner();
        if(gameActive) tttStatus.innerText = "Your turn (X)";
    }
}

function checkWinner() {
    let roundWon = false;
    let winner = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winner = board[a];
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        if (winner === 'X') {
            tttStatus.innerText = "You won! Hint Unlocked!";
            unlockHint(currentHintTarget);
            setTimeout(() => tttModal.classList.add('hidden'), 1500); 
        } else {
            tttStatus.innerText = "You lost! Try again.";
        }
        return;
    }

    if (!board.includes('')) {
        gameActive = false;
        tttStatus.innerText = "It's a draw! Try again.";
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    tttStatus.innerText = "Your turn (X)";
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
}

function unlockHint(hintNum) {
    document.getElementById(`btn-hint-${hintNum}`).classList.add('hidden');
    document.getElementById(`text-hint-${hintNum}`).classList.remove('hidden');
    
    if (hintNum < 3) {
        document.getElementById(`btn-hint-${hintNum + 1}`).classList.remove('hidden');
    }
}

// --- DECK & CARD LOGIC ---
const originalMessages = [
    "your sense of humour", "your adorable \"hi\" jokes", "your sweet head pats", "your eyes crinkling in the corners when you smile", "your soft and silky hair that was just made for french braiding", "your excel wizardry skills", "the sound of you laughing", "the way you smile smugly when you say something diabolical", "your morning voice when you send me the sweetest good morning vms", "your cute adorable voice", "your regular deep voice", "the way you will just call me every term of endearment possible", "the way you say \"goodnight fren, sleep well\"", "whenever i say \"i love you more\" and you say \"i love you less\" in your sweet, teasing tone", "your unapologetic nerdiness", "the way you incorporate different studies-related terminology into your expressions", "your taste in music", "listening to songs with you on discord", "the way you say \"it's gonna be fine\"", "the way you hold my hand firmly", "the way you play with my hands gently", "your storytelling skills", "the way you share interesting details of your life with me", "the way you share the seemingly mundane details of your life with me", "the way you always insist \"it could be better\" whenever i say \"it could be worse\"", "the adorable emojis you use that i've begun to use because of you", "the way you ask me for consent before doing anything and everything (except for that one time :>)", "the way you approach serious talks so cautiously and considerately", "how safe and comfortable you make me feel during serious talks", "the way you feed me so lovingly", "the way you caress my waist when i wear saree", "the way you run your fingers through my hair", "the way you reassure and console me when im upset about anything", "the focused look on your face when you're concentrating and locked in", "the way you give me the most comfortable back hugs", "how honest you are about your thoughts and feelings", "the way your warm hands become the best heat pack", "seeing your icon appear on our shared docs", "how cute you look when you pout", "the way you stand so cutely with one hand on your waist", "your sweet tendency to make misspelled words an inside joke like \"fern\" :')", "how you hold the umbrella for us on sunny and rainy days", "how you let me hold your squishy firm bicep", "the sound of your voice and the blush on your face when you get shy and flustered", "the way you instinctively reach for my hand and i reach for yours", "the way you always plug in my charger at the bunker so i won't have to kneel down", "your calm nature that steadies me even when i'm overwhelmed and crashing out", "how fast you can solve a rubik's cube and how sexy you look during it", "your adorable morning selfies lying on your square pillow, that make me want to tackle you with kisses", "the way you walk with me all around mall chattar, kolabhaban, hakim chattar and everywhere else", "the excitement on your face and in your voice whenever you share any of your interests with me", "everything you have said and done that has made you become my comfort person whom i trust and love so much"
];

const shuffledMessages = [...originalMessages];
for (let i = shuffledMessages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledMessages[i], shuffledMessages[j]] = [shuffledMessages[j], shuffledMessages[i]];
}

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = [
    { name: 'hearts', symbol: '♥', colorClass: 'suit-red' },
    { name: 'diamonds', symbol: '♦', colorClass: 'suit-red' },
    { name: 'spades', symbol: '♠', colorClass: 'suit-black' },
    { name: 'clubs', symbol: '♣', colorClass: 'suit-black' }
];

const fullDeck = [];
let messageIndex = 0;
suits.forEach(suit => {
    ranks.forEach(rank => {
        fullDeck.push({ rank, suit, message: shuffledMessages[messageIndex++] });
    });
});

const deckContainer = document.getElementById('deck-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let cardsDOM = [];
let currentTopIndex = fullDeck.length - 1;

fullDeck.reverse().forEach((cardData, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.zIndex = index + 1;
    card.style.setProperty('--rz', `${(Math.random() * 6) - 3}deg`);
    
    card.innerHTML = `
        <div class="card-face card-front">
            <div class="corner top-left ${cardData.suit.colorClass}"><div class="rank-value">${cardData.rank}</div><div class="suit-symbol">${cardData.suit.symbol}</div></div>
            <div class="sticky-note"><div class="sticky-note-text">${cardData.message}</div></div>
            <div class="corner bottom-right ${cardData.suit.colorClass}"><div class="rank-value">${cardData.rank}</div><div class="suit-symbol">${cardData.suit.symbol}</div></div>
        </div>
        <div class="card-face card-back"></div>
    `;

    card.addEventListener('click', () => {
        if (index === currentTopIndex) card.classList.toggle('flipped');
    });

    cardsDOM.push(card);
    deckContainer.appendChild(card);
});

// Navigation Logic: NEXT Card
nextBtn.addEventListener('click', () => {
    if (currentTopIndex >= 0) {
        const topCard = cardsDOM[currentTopIndex];
        topCard.classList.remove('flipped');
        topCard.classList.add('discarded');
        currentTopIndex--;
        
        // Check if deck is empty to show End Screen
        if (currentTopIndex < 0) {
            setTimeout(() => {
                mainContent.classList.remove('active');
                mainContent.classList.add('hidden');
                
                endScreen.classList.remove('hidden');
                endScreen.classList.add('active');
            }, 800); 
        }
    }
});

// Navigation Logic: PREV Card
prevBtn.addEventListener('click', () => {
    if (currentTopIndex < cardsDOM.length - 1) {
        currentTopIndex++;
        cardsDOM[currentTopIndex].classList.remove('discarded');
    }
});

// --- RESET LOGIC FOR THE END SCREEN ---
function resetDeck() {
    cardsDOM.forEach(card => {
        card.classList.remove('discarded');
        card.classList.remove('flipped');
    });
    currentTopIndex = cardsDOM.length - 1;
}

restartDeckBtn.addEventListener('click', () => {
    resetDeck();
    
    endScreen.classList.remove('active');
    endScreen.classList.add('hidden');
    
    mainContent.classList.remove('hidden');
    mainContent.classList.add('active');
});

backToLoginBtn.addEventListener('click', () => {
    resetDeck();
    
    passwordInput.value = '';
    successMsg.classList.add('hidden');
    
    endScreen.classList.remove('active');
    endScreen.classList.add('hidden');
    
    loginScreen.classList.remove('hidden');
    loginScreen.classList.add('active');
});
