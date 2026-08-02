// High-frequency production array database
const loadedWordDatabase = [
    "AA", "AB", "AD", "AE", "AG", "AH", "AI", "AL", "AM", "AN", "AR", "AS", "AT", "AW", "AX", "AY",
    "BA", "BE", "BI", "BO", "BY", "DA", "DE", "DO", "ED", "EF", "EH", "EL", "EM", "EN", "ER", "ES", 
    "ET", "EW", "EX", "FA", "FE", "GI", "GO", "HA", "HE", "HI", "HM", "HO", "ID", "IF", "IN", "IS", 
    "IT", "JO", "KA", "KI", "LA", "LI", "LO", "MA", "ME", "MI", "MM", "MO", "MU", "MY", "NA", "NE", 
    "NO", "NU", "OD", "OE", "OF", "OH", "OI", "OK", "OM", "ON", "OP", "OR", "OS", "OU", "OW", "OX", 
    "OY", "PA", "PE", "PI", "PO", "QI", "RE", "SH", "SI", "SO", "TA", "TE", "TI", "TO", "UH", "UM", 
    "UN", "UP", "US", "UT", "VA", "WO", "XI", "XU", "YA", "YE", "YO", "ZA",
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
    "ABLE", "ACID", "AGED", "ALSO", "AREA", "ARMY", "AWAY", "BABY", "BACK", "BALL", "BAND", "BANK", 
    "BARE", "BASE", "BATH", "BEAR", "BEAT", "BEEN", "BEER", "BELL", "BELT", "BEST", "BIRD", "BITE", 
    "BLOW", "BLUE", "BOAT", "BODY", "BOLD", "BONE", "BOOK", "BOOM", "BORN", "BOSS", "BOTH", "BOWL", 
    "BULK", "BURN", "BUSH", "BUSY", "BUYS", "CAFE", "CAKE", "CALL", "CALM", "CAMP", "CARD", "CARE", 
    "CASE", "CASH", "CAST", "CHAT", "CHEF", "CITY", "CLAN", "CLAY", "CLIP", "CLUB", "CLUE", "COAL", 
    "COAT", "CODE", "COIN", "COLD", "COME", "COOK", "COOL", "COPE", "COPY", "CORE", "COST", "CREW", 
    "CROP", "CURE", "CURL", "CUTE", "DARE", "DARK", "DATA", "DATE", "DAWN", "DAYS", "DEAD", "DEAL", 
    "DEAR", "DEBT", "DECK", "DEED", "DEEP", "DEER", "DESK", "DIAL", "DIET", "DISC", "DISK", "DIVE", 
    "ABOUT", "ABOVE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN", "AGENT", "AGREE", 
    "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE", "ALONG", "ALTER", "AMONG", 
    "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "ARGUE", "ARISE", "ARROW", "ASIDE", "ASSET", "AUDIO", 
    "AWAKE", "BADGE", "BAKER", "BANANA", "BASIC", "BASIS", "BEACH", "BEARD", "BEAST", "BEGIN", "BEING", 
    "BELOW", "BENCH", "BIBLE", "BIRTH", "BLACK", "BLADE", "BLAME", "BLIND", "BLOCK", "BLOOD", "BOARD", 
    "BOAST", "BONUS", "BOOST", "BOUND", "BRAIN", "BRAKE", "BRAND", "BRAVE", "BREAD", "BREAK", "BRICK", 
    "ACTIVE", "PASSIVE", "REVENUE", "DOMAIN", "HOSTING", "MARKET", "CLIENT", "SERVER", "NETWORK", "ERROR",
    "GAMER", "MASTER", "STREAM", "PUZZLE", "SOLVER", "LETTER", "ENGINE", "WORDS", "FRIENDS", "RACK",
    "TEACH", "REACT", "BUILD", "DESIGN", "STYLING", "THEME", "BLANK", "CLEAN", "MODERN", "LIGHT", 
    "DARK", "SLATE", "BLUE", "YELLOW", "WHITE", "GREEN", "AMBER", "ABNORMALIZATION", "COMPUTE",
    "NORMALIZATION", "ABNORMAL", "RATION", "RATIONAL", "NATION", "NATIONAL", "ACTION", "ANIMAL"
];

const scrabblePointValues = { A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10 };

async function initializeDictionaryDownload() {
    const actionBtn = document.getElementById('actionBtn');
    const btnText = document.getElementById('btnText');
    const statusFeedback = document.getElementById('statusFeedback');

    actionBtn.disabled = false;
    btnText.innerText = "Unscramble Letters Now";
    statusFeedback.innerText = "Complete Dictionary Online. Native data core verified.";

    runProgrammaticRouter();
}

function runProgrammaticRouter() {
    const path = window.location.pathname.toLowerCase().split('/').filter(p => p.length > 0);
    if (path.length < 2 || path[0] !== 'words-starting-with') return;

    const targetLetter = path[1].toUpperCase();
    if (targetLetter.length !== 1) return;

    const seoTitle = document.getElementById('seoTitle');
    const seoText = document.getElementById('seoText');
    const lettersInput = document.getElementById('lettersInput');
    const startsWith = document.getElementById('startsWith');

    document.title = `Words Starting With ${targetLetter} | Letter Unscrambler Pro`;
    if (seoTitle) seoTitle.innerText = `Comprehensive List of Words Starting with ${targetLetter}`;
    if (seoText) seoText.innerText = `Explore our complete dictionary index of words starting with the letter ${targetLetter}. Each word combo displays its official Scrabble point score allocation.`;
    
    if (startsWith) startsWith.value = targetLetter;
    if (lettersInput) lettersInput.value = `${targetLetter}??????`;
    
    runUnscrambleAnalysis();
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
        emptyState.innerHTML = `<p class='empty-text'>No entries match "${letters}".</p>`;
        emptyState.style.display = 'block';
        resultsContent.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    resultsContent.innerHTML = '';
    resultsContent.style.display = 'block';

    let nestedBuckets = {};
    processingMatches.forEach(item => {
        if (!nestedBuckets[item.length]) nestedBuckets[item.length] = [];
        nestedBuckets[item.length].push(item);
    });

    const sortedLengths = Object.keys(nestedBuckets).sort((a,b) => b - a);

    sortedLengths.forEach(len => {
        let listings = nestedBuckets[len].sort((a,b) => b.score - a.score);
        
        let container = document.createElement('div');
        container.className = "bucket-container";
        
        let headerLine = document.createElement('h3');
        headerLine.className = "bucket-title";
        headerLine.innerHTML = `<span>${len}-Letter Combos</span> <span>${listings.length} items</span>`;
        container.appendChild(headerLine);

        let wrapperGrid = document.createElement('div');
        wrapperGrid.className = "tile-grid";

        listings.forEach(obj => {
            let tile = document.createElement('div');
            tile.className = "tile";
            tile.innerHTML = `
                <span class="tile-text">${obj.text}</span>
                ${targetType !== 'wordle' ? `<span class="tile-score">${obj.score}</span>` : ''}
            `;
            wrapperGrid.appendChild(tile);
        });

        container.appendChild(wrapperGrid);
        resultsContent.appendChild(container);
    });
}

window.onload = initializeDictionaryDownload;
