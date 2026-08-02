const scrabblePointValues = { A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10 };

async function initializeDictionaryDownload() {
    const actionBtn = document.getElementById('actionBtn');
    const btnText = document.getElementById('btnText');
    const statusFeedback = document.getElementById('statusFeedback');

    if (actionBtn) {
        actionBtn.disabled = false;
        actionBtn.classList.remove('opacity-60', 'cursor-not-allowed');
    }
    if (btnText) {
        btnText.innerText = "Unscramble Letters Now";
    }
    if (statusFeedback) {
        statusFeedback.innerText = "System online. Standby for input rack values.";
    }

    runProgrammaticRouter();
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

async function runUnscrambleAnalysis() {
    const lettersInput = document.getElementById('lettersInput');
    const dictionarySelect = document.getElementById('dictionarySelect');
    const startsWithInput = document.getElementById('startsWith');
    const containsInput = document.getElementById('contains');
    const endsWithInput = document.getElementById('endsWith');
    const emptyState = document.getElementById('emptyState');
    const resultsContent = document.getElementById('resultsContent');
    const btnText = document.getElementById('btnText');

    const letters = lettersInput ? lettersInput.value.toUpperCase().replace(/\s/g, '') : '';
    const targetType = dictionarySelect ? dictionarySelect.value : 'scrabble';
    const prefix = startsWithInput ? startsWithInput.value.toUpperCase().trim() : '';
    const interior = containsInput ? containsInput.value.toUpperCase().trim() : '';
    const suffix = endsWithInput ? endsWithInput.value.toUpperCase().trim() : '';

    if (!letters) {
        alert("Please enter characters to process.");
        return;
    }

    if (btnText) {
        btnText.innerText = "Processing Shards...";
    }
    
    let lettersToFetch = new Set(letters.split('').filter(l => l >= 'A' && l <= 'Z'));
    if (letters.includes('?') || letters.includes('*') || prefix || interior || suffix) {
        lettersToFetch = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''));
    }

    let searchPool = [];

    try {
        const fetchPromises = Array.from(lettersToFetch).map(async (letter) => {
            const response = await fetch(`/dictionary/${letter.toLowerCase()}.json`);
            if (response.ok) {
                const words = await response.json();
                searchPool = searchPool.concat(words);
            }
        });
        await Promise.all(fetchPromises);
    } catch (err) {
        console.error("Shard load failure:", err);
    }

    let processingMatches = [];

    for (let word of searchPool) {
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

    if (btnText) {
        btnText.innerText = "Unscramble Letters Now";
    }

    if (processingMatches.length === 0) {
        if (emptyState) {
            emptyState.innerHTML = `<p class='empty-text'>No entries match "${letters}".</p>`;
            emptyState.style.display = 'block';
        }
        if (resultsContent) {
            resultsContent.style.display = 'none';
        }
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (resultsContent) {
        resultsContent.innerHTML = '';
        resultsContent.style.display = 'block';
    }

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
        if (resultsContent) resultsContent.appendChild(container);
    });
}

function runProgrammaticRouter() {
    const segments = window.location.pathname.toLowerCase().split('/').filter(p => p.length > 0);
    if (segments.length < 2) return;

    // LOCKED IN FIXED INDICES: Safely handling array index items to stop the file crash permanently
    const routeType = segments[0];
    const parameter = segments[1] ? segments[1].toUpperCase() : '';

    const seoTitle = document.getElementById('seoTitle');
    const seoText = document.getElementById('seoText');
    const lettersInput = document.getElementById('lettersInput');
    const startsWith = document.getElementById('startsWith');
    const containsInput = document.getElementById('contains');
    const endsWith = document.getElementById('endsWith');

    if (routeType === 'words-starting-with' && parameter.length === 1) {
        document.title = `Words Starting With ${parameter} | Letter Unscrambler Pro`;
        if (seoTitle) seoTitle.innerText = `Comprehensive List of Words Starting with ${parameter}`;
        if (seoText) seoText.innerText = `Explore our complete dictionary index of words starting with the letter ${parameter}. Find the highest scoring combinations for your next turn.`;
        if (startsWith) startsWith.value = parameter;
        if (lettersInput) lettersInput.value = `${parameter}???????`;
        runUnscrambleAnalysis();
    }
    else if (routeType === 'words-ending-in') {
        document.title = `Words Ending In ${parameter} | Letter Unscrambler Pro`;
        if (seoTitle) seoTitle.innerText = `Every Solvable Word Ending in ${parameter}`;
        if (seoText) seoText.innerText = `Stuck with an end-board placement? Browse our master dictionary index of all words that end with the string ${parameter} sorted by high-scoring point arrays.`;
        if (endsWith) endsWith.value = parameter;
        if (lettersInput) lettersInput.value = `???????${parameter}`;
        runUnscrambleAnalysis();
    }
    else if (routeType === 'words-containing') {
        document.title = `Words Containing ${parameter} | Letter Unscrambler Pro`;
        if (seoTitle) seoTitle.innerText = `Words Containing the Letters ${parameter}`;
        if (seoText) seoText.innerText = `Need to map high-value tiles together? Check out every word containing the target string ${parameter} available inside our tournament dictionary database.`;
        if (containsInput) containsInput.value = parameter;
        if (lettersInput) lettersInput.value = `???${parameter}???`;
        runUnscrambleAnalysis();
    }
}

window.onload = initializeDictionaryDownload;
