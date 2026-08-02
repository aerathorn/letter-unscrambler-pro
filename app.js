// Self-Contained Master Dictionary Array Pool
const loadedWordDatabase = [
    "APPLE", "BANANA", "CHERRY", "GAMER", "MASTER", "STREAM", "PUZZLE", "SOLVER", "LETTER", "ENGINE",
    "WORDS", "FRIENDS", "BOARD", "TILES", "POINTS", "WINNER", "EXPERT", "MATRIX", "JOKER", "SQUARE",
    "TEACH", "REACT", "BUILD", "CODE", "SCRIPT", "DESIGN", "STYLING", "THEME", "BLANK", "WILD",
    "ACTIVE", "PASSIVE", "REVENUE", "DOMAIN", "HOSTING", "MARKET", "CLIENT", "SERVER", "NETWORK", "ERROR",
    "CLEAN", "MODERN", "LIGHT", "DARK", "SLATE", "BLUE", "YELLOW", "WHITE", "GREEN", "AMBER",
    "ABOUT", "ABOVE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN", "AGENT",
    "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE", "ALONG",
    "ALTER", "AMONG", "ANGER", "ANGLE", "ANGRY", "APART", "ARGUE", "ARISE", "ARROW", "ASIDE",
    "ASSET", "AUDIO", "AWAKE", "BADGE", "BAKER", "BASIC", "BASIS", "BEACH", "BEARD", "BEAST",
    "BEGIN", "BEING", "BELOW", "BENCH", "BIBLE", "BIRTH", "BLACK", "BLADE", "BLAME", "BLIND",
    "BLOCK", "BLOOD", "BOARD", "BOAST", "BONUS", "BOOST", "BOUND", "BRAIN", "BRAKE", "BRAND",
    "BRAVE", "BREAD", "BREAK", "BRICK", "BRIDE", "BRIEF", "BRING", "BROAD", "BROKE", "BROWN",
    "BRUSH", "BUDGET", "BUILD", "BUILT", "BURST", "BUYER", "CABLE", "CABIN", "CALM", "CAMERA",
    "CAMPUS", "CANAL", "CANDY", "CANOE", "CARGO", "CAROL", "CARRY", "CARVE", "CASE", "CASH",
    "CAST", "CATCH", "CAUSE", "CAVE", "CEASE", "CHAIN", "CHAIR", "CHALK", "CHAMP", "CHANT",
    "CHAOS", "CHARM", "CHART", "CHASE", "CHEAP", "CHEAT", "CHECK", "CHEEK", "CHEER", "CHEF",
    "CHIEF", "CHILD", "CHILL", "CHIN", "CHIP", "CHOIR", "CHOOSE", "CHORD", "CHORE", "CHORUS",
    "CHUNK", "CHURCH", "CIGAR", "CIRCUIT", "CIRCUS", "CITE", "CITY", "CIVIL", "CLAIM", "CLAN",
    "CLAP", "CLASH", "CLASP", "CLASS", "CLAW", "CLAY", "CLEAN", "CLEAR", "CLERK", "CLEVER",
    "CLICK", "CLIENT", "CLIFF", "CLIMB", "CLING", "CLINIC", "CLIP", "CLOAK", "CLOCK", "CLOSE",
    "CLOTH", "CLOUD", "CLOVE", "CLOWN", "CLUB", "CLUE", "CLUMP", "COACH", "COAL", "COAST",
    "COAT", "CODE", "COIN", "COLD", "COLONY", "COLOR", "COLT", "COLUMN", "COMB", "COMBAT",
    "COMEDY", "COMET", "COMFORT", "COMIC", "COMING", "COMMAND", "COMMON", "COMPACT", "COMPANY", "COMPARE",
    "COMPETE", "COMPLEX", "COMPLY", "COMPOST", "COMPOUND", "COMPRESS", "COMPUTE", "COMRADE", "CONCEAL", "CONCEDE",
    "CONCEPT", "CONCERN", "CONCERT", "CONCISE", "CONCRETE", "CONDEMN", "CONDUCT", "CONDUIT", "CONFER", "CONFESS",
    "CONFIDE", "CONFINE", "CONFIRM", "CONFLICT", "CONFORM", "CONFOUND", "CONFRONT", "CONFUSE", "CONGEAL", "CONGEST",
    "CONGRATS", "CONICAL", "CONIFER", "CONJOIN", "CONJURE", "CONNECT", "CONQUER", "CONSENT", "CONSERVE", "CONSIDER",
    "CONSIGN", "CONSIST", "CONSOLE", "CONSORT", "CONSPIRE", "CONSTANT", "CONSTELLATION", "CONSTRUCT", "CONSUL", "CONSULT",
    "CONSUME", "CONTACT", "CONTAIN", "CONTEMPT", "CONTEND", "CONTENT", "CONTEST", "CONTEXT", "CONTINUE", "CONTOUR",
    "CONTRACT", "CONTRARY", "CONTRAST", "CONTRITE", "CONTRIVE", "CONTROL", "CONTUSE", "CONVECT", "CONVENE", "CONVENT"
];

const scrabblePointValues = { A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10 };

async function initializeDictionaryDownload() {
    const actionBtn = document.getElementById('actionBtn');
    const btnSpinner = document.getElementById('btnSpinner');
    const btnText = document.getElementById('btnText');
    const statusFeedback = document.getElementById('statusFeedback');

    // Instantly mark as active since data is hardcoded locally
    actionBtn.disabled = false;
    actionBtn.classList.remove('opacity-60', 'cursor-not-allowed');
    btnSpinner.classList.add('hidden');
    btnText.innerText = "Unscramble Letters Now";
    statusFeedback.innerText = "System online. Array matrix successfully compiled.";
}

function determineScrabbleScore(word) {
    return word.split('').reduce((sum, letter) => sum + (scrabblePointValues[letter] || 0), 0);
}

function checkRackInclusion(word, inputLetters) {
    let pool = inputLetters.split('');
    let wildcards = pool.filter(l => l === '?' || l === '*').length;
    pool = pool.filter(l => l !== '?' && l !== '*');

    for (let letter of word) {
        const foundIdx = pool.indexOf(letter);
        if (foundIdx > -1) {
            pool.splice(foundIdx, 1);
        } else if (wildcards > 0) {
            wildcards--;
        } else {
            return false;
        }
    }
    return true;
}

function runUnscrambleAnalysis() {
    const letters = document.getElementById('lettersInput').value.toUpperCase().replace(/\s/g, '');
    const targetType = document.getElementById('dictionarySelect').value;
    const prefix = document.getElementById('startsWith').value.toUpperCase().trim();
    const interior = document.getElementById('contains').value.toUpperCase().trim();
    const suffix = document.getElementById('endsWith').value.toUpperCase().trim();

    const emptyState = document.getElementById('emptyState');
    const resultsContent = document.getElementById('resultsContent');

    if (!letters) {
        alert("Please enter characters to process.");
        return;
    }

    let processingMatches = [];

    for (let word of loadedWordDatabase) {
        if (prefix && !word.startsWith(prefix)) continue;
        if (interior && !word.includes(interior)) continue;
        if (suffix && !word.endsWith(suffix)) continue;
        
        if (checkRackInclusion(word, letters)) {
            processingMatches.push({
                text: word,
                length: word.length,
                score: targetType === 'wordle' ? 0 : determineScrabbleScore(word)
            });
        }
    }

    if (processingMatches.length === 0) {
        emptyState.innerHTML = `<p class='text-lg font-semibold text-slate-700 py-6'>No entries match "${letters}".</p>`;
        emptyState.classList.remove('hidden');
        resultsContent.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    resultsContent.innerHTML = '';
    resultsContent.classList.remove('hidden');

    let nestedBuckets = {};
    processingMatches.forEach(item => {
        if (!nestedBuckets[item.length]) nestedBuckets[item.length] = [];
        nestedBuckets[item.length].push(item);
    });

    const sortedLengths = Object.keys(nestedBuckets).sort((a,b) => b - a);

    sortedLengths.forEach(len => {
        let listings = nestedBuckets[len].sort((a,b) => b.score - a.score);
        
        let container = document.createElement('div');
        container.className = "bg-slate-50 rounded-xl p-4 md:p-6 border border-slate-200/60 shadow-sm mb-4";
        
        let headerLine = document.createElement('h3');
        headerLine.className = "text-sm font-extrabold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2 flex justify-between";
        headerLine.innerHTML = `<span>${len}-Letter Combos</span> <span class='text-xs font-normal text-slate-400'>${listings.length} items</span>`;
        container.appendChild(headerLine);

        let wrapperGrid = document.createElement('div');
        wrapperGrid.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3";

        listings.forEach(obj => {
            let tile = document.createElement('div');
            tile.className = "word-tile flex items-center justify-between px-3 py-2 rounded-lg border border-yellow-400/40";
            tile.innerHTML = `
                <span class="font-mono font-bold text-slate-900 tracking-wider text-base md:text-lg">${obj.text}</span>
                ${targetType !== 'wordle' ? `<span class="bg-amber-900/10 text-amber-900 font-extrabold text-xs px-2 py-0.5 rounded-md min-w-[22px] text-center">${obj.score}</span>` : ''}
            `;
            wrapperGrid.appendChild(tile);
        });

        container.appendChild(wrapperGrid);
        resultsContent.appendChild(container);
    });
}

window.onload = initializeDictionaryDownload;
    
