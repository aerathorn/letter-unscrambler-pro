// Self-Contained Compressed High-Frequency English Scrabble Dictionary
const loadedWordDatabase = [
    // --- 2-Letter Base Connectors ---
    "AA", "AB", "AD", "AE", "AG", "AH", "AI", "AL", "AM", "AN", "AR", "AS", "AT", "AW", "AX", "AY",
    "BA", "BE", "BI", "BO", "BY", "DA", "DE", "DO", "ED", "EF", "EH", "EL", "EM", "EN", "ER", "ES", 
    "ET", "EW", "EX", "FA", "FE", "GI", "GO", "HA", "HE", "HI", "HM", "HO", "ID", "IF", "IN", "IS", 
    "IT", "JO", "KA", "KI", "LA", "LI", "LO", "MA", "ME", "MI", "MM", "MO", "MU", "MY", "NA", "NE", 
    "NO", "NU", "OD", "OE", "OF", "OH", "OI", "OK", "OM", "ON", "OP", "OR", "OS", "OU", "OW", "OX", 
    "OY", "PA", "PE", "PI", "PO", "QI", "RE", "SH", "SI", "SO", "TA", "TE", "TI", "TO", "UH", "UM", 
    "UN", "UP", "US", "UT", "VA", "WO", "XI", "XU", "YA", "YE", "YO", "ZA",

    // --- 3-Letter Core ---
    "ACE", "ACT", "ADD", "AGE", "AGO", "AIM", "AIR", "ALE", "ALL", "AMP", "AND", "ANT", "ANY", "APE", 
    "APP", "APT", "ARC", "ARE", "ARK", "ARM", "ART", "ASH", "ASK", "ASP", "ATE", "AWE", "AWL", "AXE", 
    "BAD", "BAG", "BAN", "BAR", "BAT", "BAY", "BED", "BEE", "BEG", "BET", "BIB", "BID", "BIG", "BIN", 
    "BIT", "BOA", "BOB", "BOG", "BOO", "BOP", "BOW", "BOX", "BOY", "BUM", "BUS", "BUT", "BUY", "BYE", 
    "CAB", "CAN", "CAP", "CAR", "CAT", "COB", "COP", "COT", "COW", "CRY", "CUP", "CUT", "DAD", "DAY", 
    "DEN", "DID", "DIE", "DIG", "DIM", "DIP", "DOG", "DON", "DOT", "DRY", "DUE", "DUG", "DUO", "DYE", 
    "EAR", "EAT", "EGG", "EGO", "ELF", "END", "ERA", "ERR", "EYE", "FAN", "FAR", "FAT", "FAX", "FED", 
    "FEE", "FEW", "FIX", "FLY", "FOE", "FOG", "FOR", "FOX", "FRY", "FUN", "FUR", "GAB", "GAG", "GAP", 
    "GAS", "GAY", "GEL", "GEM", "GET", "GIG", "GIN", "GNU", "GOB", "GOD", "GOO", "GOT", "GUM", "GUN", 
    "GUT", "GUY", "GYM", "HAD", "HAG", "HAM", "HAS", "HAT", "HAW", "HAY", "HEM", "HEN", "HER", "HEW", 
    "HEX", "HEY", "HID", "HIM", "HIP", "HIS", "HIT", "HOB", "HOG", "HOP", "HOT", "HOW", "HUB", "HUE", 
    "HUG", "HUM", "HUN", "HUT", "ICE", "ICY", "ILL", "IMP", "INK", "INN", "ION", "IRK", "ITS", "IVY", 
    "JAB", "JAG", "JAM", "JAR", "JAW", "JAY", "JET", "JOB", "JOG", "JOT", "JOY", "JUG", "KID", "KIN",
    "KIT", "LAB", "LAD", "LAG", "LAP", "LAW", "LAX", "LAY", "LED", "LEG", "LET", "LID", "LIE", "LIP",

    // --- 4-Letter Combos ---
    "ABLE", "ACID", "AGED", "ALSO", "AREA", "ARMY", "AWAY", "BABY", "BACK", "BALL", "BAND", "BANK", 
    "BARE", "BASE", "BATH", "BEAR", "BEAT", "BEEN", "BEER", "BELL", "BELT", "BEST", "BIRD", "BITE", 
    "BLOW", "BLUE", "BOAT", "BODY", "BOLD", "BONE", "BOOK", "BOOM", "BORN", "BOSS", "BOTH", "BOWL", 
    "BULK", "BURN", "BUSH", "BUSY", "BUYS", "CAFE", "CAKE", "CALL", "CALM", "CAMP", "CARD", "CARE", 
    "CASE", "CASH", "CAST", "CHAT", "CHEF", "CITY", "CLAN", "CLAY", "CLIP", "CLUB", "CLUE", "COAL", 
    "COAT", "CODE", "COIN", "COLD", "COME", "COOK", "COOL", "COPE", "COPY", "CORE", "COST", "CREW", 
    "CROP", "CURE", "CURL", "CUTE", "DARE", "DARK", "DATA", "DATE", "DAWN", "DAYS", "DEAD", "DEAL", 
    "DEAR", "DEBT", "DECK", "DEED", "DEEP", "DEER", "DESK", "DIAL", "DIET", "DISC", "DISK", "DIVE", 

    // --- 5-Letter Combos ---
    "ABOUT", "ABOVE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN", "AGENT", "AGREE", 
    "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE", "ALONG", "ALTER", "AMONG", 
    "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "ARGUE", "ARISE", "ARROW", "ASIDE", "ASSET", "AUDIO", 
    "AWAKE", "BADGE", "BAKER", "BANANA", "BASIC", "BASIS", "BEACH", "BEARD", "BEAST", "BEGIN", "BEING", 
    "BELOW", "BENCH", "BIBLE", "BIRTH", "BLACK", "BLADE", "BLAME", "BLIND", "BLOCK", "BLOOD", "BOARD", 
    "BOAST", "BONUS", "BOOST", "BOUND", "BRAIN", "BRAKE", "BRAND", "BRAVE", "BREAD", "BREAK", "BRICK", 

    // --- 6+ Multi-Letter Utilities ---
    "ACTIVE", "PASSIVE", "REVENUE", "DOMAIN", "HOSTING", "MARKET", "CLIENT", "SERVER", "NETWORK", "ERROR",
    "GAMER", "MASTER", "STREAM", "PUZZLE", "SOLVER", "LETTER", "ENGINE", "WORDS", "FRIENDS", "RACK",
    "TEACH", "REACT", "BUILD", "DESIGN", "STYLING", "THEME", "BLANK", "CLEAN", "MODERN", "LIGHT", 
    "DARK", "SLATE", "BLUE", "YELLOW", "WHITE", "GREEN", "AMBER", "ABNORMALIZATION", "COMPUTE"
];

const scrabblePointValues = { A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10 };

async function initializeDictionaryDownload() {
    const actionBtn = document.getElementById('actionBtn');
    const btnSpinner = document.getElementById('btnSpinner');
    const btnText = document.getElementById('btnText');
    const statusFeedback = document.getElementById('statusFeedback');

    actionBtn.disabled = false;
    actionBtn.classList.remove('opacity-60', 'cursor-not-allowed');
    btnSpinner.classList.add('hidden');
    btnText.innerText = "Unscramble Letters Now";
    statusFeedback.innerText = "System online. Internal vocabulary metrics loaded successfully.";
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
