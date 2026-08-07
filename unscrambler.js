/**
 * Letter Unscrambler Core Engine
 * Features: Scrabble & WWF Scoring, Visual Tiles, Advanced Filters (Smart Merge), Highest Score Sorting
 */

let WORD_LIST = [];

// Tile Point Values
const SCRABBLE_POINTS = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
  n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
};

const WWF_POINTS = {
  a: 1, b: 4, c: 4, d: 2, e: 1, f: 4, g: 3, h: 3, i: 1, j: 10, k: 5, l: 2, m: 4,
  n: 2, o: 1, p: 4, q: 10, r: 1, s: 1, t: 1, u: 2, v: 5, w: 4, x: 8, y: 3, z: 10
};

// Fetch dictionary.json on page load
async function loadDictionary() {
  try {
    const response = await fetch('dictionary.json');
    WORD_LIST = await response.json();
    console.log(`Loaded ${WORD_LIST.length} words into memory.`);
  } catch (error) {
    console.error("Error loading dictionary.json:", error);
    const resultsContainer = document.getElementById("resultsContainer");
    if (resultsContainer) {
      resultsContainer.innerHTML = "<p class='error-msg'>Could not load dictionary.json. Please ensure it exists in your web folder.</p>";
    }
  }
}

// Helper: Count letter occurrences
function getLetterCounts(str) {
  const counts = {};
  const cleaned = str.toLowerCase().replace(/[^a-z]/g, '');
  for (let char of cleaned) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
}

// Check if word can be formed from letter pool
function canFormWord(word, availableCounts) {
  const wordCounts = getLetterCounts(word);
  for (let char in wordCounts) {
    if (!availableCounts[char] || wordCounts[char] > availableCounts[char]) {
      return false;
    }
  }
  return true;
}

// Calculate Total Word Score and Letter Point Details
function calculateWordScore(word, gameMode) {
  const pointTable = (gameMode === 'wwf') ? WWF_POINTS : SCRABBLE_POINTS;
  let totalScore = 0;
  const tiles = [];

  for (let char of word.toLowerCase()) {
    const pts = pointTable[char] || 0;
    totalScore += pts;
    tiles.push({ char: char.toUpperCase(), pts: pts });
  }

  return { totalScore, tiles };
}

// Main Unscramble Function
function unscrambleLetters() {
  const inputLetters = document.getElementById("lettersInput") ? document.getElementById("lettersInput").value.trim() : "";
  const filterLength = document.getElementById("lengthFilter") ? parseInt(document.getElementById("lengthFilter").value, 10) : 0;
  const gameMode = document.getElementById("gameModeSelect") ? document.getElementById("gameModeSelect").value : "scrabble";

  // Advanced Filters
  const startsWith = document.getElementById("startsWithInput") ? document.getElementById("startsWithInput").value.trim().toLowerCase() : "";
  const endsWith = document.getElementById("endsWithInput") ? document.getElementById("endsWithInput").value.trim().toLowerCase() : "";
  const contains = document.getElementById("containsInput") ? document.getElementById("containsInput").value.trim().toLowerCase() : "";

  const resultsContainer = document.getElementById("resultsContainer");

  if (!inputLetters && !startsWith && !endsWith && !contains) {
    resultsContainer.innerHTML = "<p class='error-msg'>Please enter letters or filter criteria to unscramble.</p>";
    return;
  }

  if (WORD_LIST.length === 0) {
    resultsContainer.innerHTML = "<p class='error-msg'>Dictionary is loading... please try again in a moment.</p>";
    return;
  }

  // Flexible Smart Merge: combine main rack letters with prefix/suffix/contains letters
  const combinedLetters = inputLetters + startsWith + endsWith + contains;
  const availableCounts = getLetterCounts(combinedLetters);

  // Filter and Score Words
  let matchedWords = [];

  for (let rawWord of WORD_LIST) {
    const word = rawWord.toLowerCase();

    // 1. Length Filter
    if (filterLength > 0 && word.length !== filterLength) continue;

    // 2. Starts With Filter
    if (startsWith && !word.startsWith(startsWith)) continue;

    // 3. Ends With Filter
    if (endsWith && !word.endsWith(endsWith)) continue;

    // 4. Contains Filter
    if (contains && !word.includes(contains)) continue;

    // 5. Letter Pool Formability
    if (!canFormWord(word, availableCounts)) continue;

    // Calculate Scores
    const { totalScore, tiles } = calculateWordScore(word, gameMode);
    matchedWords.push({ word: word.toUpperCase(), length: word.length, totalScore, tiles });
  }

  // Group by length and Sort by Highest Score First inside each group
  const grouped = {};
  matchedWords.forEach(item => {
    const len = item.length;
    if (!grouped[len]) grouped[len] = [];
    grouped[len].push(item);
  });

  // Sort words inside each group by highest total score
  for (let len in grouped) {
    grouped[len].sort((a, b) => b.totalScore - a.totalScore);
  }

  displayResults(grouped, matchedWords.length, gameMode);
}

// Display Tile Results
function displayResults(grouped, totalCount, gameMode) {
  const resultsContainer = document.getElementById("resultsContainer");
  
  if (totalCount === 0) {
    resultsContainer.innerHTML = "<p class='no-results'>No matching words found with these criteria.</p>";
    return;
  }

  const modeName = (gameMode === 'wwf') ? "Words With Friends" : "Scrabble";
  let html = `<div class="results-header">Found <strong>${totalCount}</strong> word(s) (${modeName} Scoring - Sorted by Highest Points)</div>`;
  const lengths = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  lengths.forEach(len => {
    html += `
      <div class="length-group">
        <h3>${len}-Letter Words (${grouped[len].length})</h3>
        <div class="results-grid">
    `;

    grouped[len].forEach(item => {
      html += `
        <div class="word-row">
          <div class="tile-rack">
            ${item.tiles.map(t => `<span class="tile">${t.char}<sub>${t.pts}</sub></span>`).join('')}
          </div>
          <span class="score-badge">${item.totalScore} PTS</span>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  resultsContainer.innerHTML = html;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  loadDictionary();

  const unscrambleBtn = document.getElementById("unscrambleBtn");
  const lettersInput = document.getElementById("lettersInput");
  const gameModeSelect = document.getElementById("gameModeSelect");

  if (unscrambleBtn) unscrambleBtn.addEventListener("click", unscrambleLetters);
  if (gameModeSelect) gameModeSelect.addEventListener("change", () => { if (lettersInput.value.trim()) unscrambleLetters(); });

  if (lettersInput) {
    lettersInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") unscrambleLetters();
    });
  }
});