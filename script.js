// Clearly labeled array for the card text
const cardText = [
    "your sense of humour",
    "your adorable \"hi\" jokes",
    "your sweet head pats",
    "your eyes crinkling in the corners when you smile",
    "your soft and silky hair that was just made for french braiding",
    "your excel wizardry skills",
    "the sound of you laughing",
    "the way you smile smugly when you say something diabolical",
    "your morning voice when you send me the sweetest good morning vms",
    "your cute adorable voice",
    "your regular deep voice",
    "the way you will just call me every term of endearment possible",
    "the way you say \"goodnight fren, sleep well\"",
    "whenever i say \"i love you more\" and you say \"i love you less\" in your sweet, teasing tone",
    "your unapologetic nerdiness",
    "the way you incorporate different studies-related terminology into your expressions",
    "your taste in music",
    "listening to songs with you on discord",
    "the way you say \"it's gonna be fine\"",
    "the way you hold my hand firmly",
    "the way you play with my hands gently",
    "your storytelling skills",
    "the way you share interesting details of your life with me",
    "the way you share the seemingly mundane details of your life with me",
    "the way you always insist \"it could be better\" whenever i say \"it could be worse\"",
    "the adorable emojis you use that i've begun to use because of you",
    "the way you ask me for consent before doing anything and everything (except for that one time :>)",
    "the way you approach serious talks so cautiously and considerately",
    "how safe and comfortable you make me feel during serious talks",
    "the way you feed me so lovingly",
    "the way you caress my waist when i wear saree",
    "the way you run your fingers through my hair",
    "the way you reassure and console me when im upset about anything",
    "the focused look on your face when you're concentrating and locked in",
    "the way you give me the most comfortable back hugs",
    "how honest you are about your thoughts and feelings",
    "the way your warm hands become the best heat pack",
    "seeing your icon appear on our shared docs",
    "how cute you look when you pout",
    "the way you stand so cutely with one hand on your waist",
    "your sweet tendency to make misspelled words an inside joke like \"fern\" :')",
    "how you hold the umbrella for us on sunny and rainy days",
    "how you let me hold your squishy firm bicep",
    "the sound of your voice and the blush on your face when you get shy and flustered",
    "the way you instinctively reach for my hand and i reach for yours",
    "the way you always plug in my charger at the bunker so i won't have to kneel down",
    "your calm nature that steadies me even when i'm overwhelmed and crashing out",
    "how fast you can solve a rubik's cube and how sexy you look during it",
    "your adorable morning selfies lying on your square pillow, that make me want to tackle you with kisses",
    "the way you walk with me all around mall chattar, kolabhaban, hakim chattar and everywhere else",
    "the excitement on your face and in your voice whenever you share any of your interests with me",
    "everything you have said and done that has made you become my comfort person whom i trust and love so much"
];

const suits = [
    { symbol: '♥', colorClass: 'suit-red' },
    { symbol: '♦', colorClass: 'suit-red' },
    { symbol: '♠', colorClass: 'suit-black' },
    { symbol: '♣', colorClass: 'suit-black' }
];

const deckContainer = document.getElementById('deck-container');

// We want the first item in the array to be the top card, 
// so we need to render the last items first (bottom of the deck).
cardText.reverse().forEach((text, index) => {
    // Determine standard suit cyclically
    const suit = suits[index % 4];
    
    // Calculate z-index (higher index = higher on stack)
    const zIndex = index + 1;
    
    // Random rotation between -3deg and 3deg
    const randomRotation = (Math.random() * 6) - 3;

    // Create Card element
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.zIndex = zIndex;
    card.style.transform = `rotateZ(${randomRotation}deg)`;
    
    // Create Faces
    card.innerHTML = `
        <div class="card-face card-front"></div>
        <div class="card-face card-back ${suit.colorClass}">
            <div class="suit-top-left">${suit.symbol}</div>
            <div class="card-text">${text}</div>
            <div class="suit-bottom-right">${suit.symbol}</div>
        </div>
    `;

    // Interaction Logic
    card.addEventListener('click', () => {
        // Only allow clicking the top-most active card
        const allCards = Array.from(document.querySelectorAll('.card:not(.slide-off)'));
        const topCard = allCards[allCards.length - 1];

        if (card !== topCard) return;

        if (!card.classList.contains('flipped')) {
            // First click: Flip
            card.classList.add('flipped');
        } else {
            // Second click: Slide off
            card.classList.add('slide-off');
            // Remove from DOM after animation completes to clean up
            setTimeout(() => {
                card.remove();
            }, 600);
        }
    });

    deckContainer.appendChild(card);
});