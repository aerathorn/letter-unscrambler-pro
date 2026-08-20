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

// ==================== URL Parameter Filtering ====================
// Lets a single page (e.g. scrabble-solver.html) act as every old static
// word-list page used to, driven entirely by the query string:
//   ?letters=TRAIN        -> pre-fills the rack input
//   ?length=5             -> pre-selects the length dropdown
//   ?startsWith=TR        -> opens & fills the "Starts With" filter
//   ?endsWith=ING         -> opens & fills the "Ends With" filter
//   ?contains=Z           -> opens & fills the "Contains" filter
//   ?mode=wwf|scrabble    -> pre-selects scoring system
// Multiple params can be combined, e.g. ?length=5&endsWith=E

function revealFilterField(fieldId, btnId) {
  const field = document.getElementById(fieldId);
  const btn = document.getElementById(btnId);
  const container = document.getElementById("advancedFilters");
  if (field) field.style.display = "block";
  if (btn) btn.classList.add("active");
  if (container) container.style.display = "flex";
}

// Builds a human-readable title/heading from active filters so each
// filtered URL still gets a distinct, descriptive page title for SEO,
// even though there's no separate static file behind it.
function buildDynamicHeading(params) {
  const length = params.get("length");
  const startsWith = params.get("startsWith");
  const endsWith = params.get("endsWith");
  const contains = params.get("contains");

  if (!length && !startsWith && !endsWith && !contains) return null;

  const parts = [];
  if (length) parts.push(`${length}-Letter Words`);
  else parts.push("Words");

  const clauses = [];
  if (startsWith) clauses.push(`Starting With "${startsWith.toUpperCase()}"`);
  if (endsWith) clauses.push(`Ending in "${endsWith.toUpperCase()}"`);
  if (contains) clauses.push(`Containing "${contains.toUpperCase()}"`);

  const heading = clauses.length ? `${parts[0]} ${clauses.join(" & ")}` : parts[0];
  return heading;
}

function applyUrlParamsAndMaybeSearch() {
  const params = new URLSearchParams(window.location.search);
  const lettersInput = document.getElementById("lettersInput");

  // Nothing to do if this page doesn't have the tool at all.
  if (!lettersInput) return;

  const lengthFilter = document.getElementById("lengthFilter");
  const gameModeSelect = document.getElementById("gameModeSelect");
  const startsWithInput = document.getElementById("startsWithInput");
  const endsWithInput = document.getElementById("endsWithInput");
  const containsInput = document.getElementById("containsInput");

  let hasActionableFilter = false; // true once we have something to actually search with

  const letters = params.get("letters");
  if (letters) {
    lettersInput.value = letters;
    hasActionableFilter = true;
  }

  const length = params.get("length");
  if (length && lengthFilter) {
    const optionExists = Array.from(lengthFilter.options).some(o => o.value === length);
    if (optionExists) lengthFilter.value = length;
  }

  const mode = params.get("mode");
  if (mode && gameModeSelect) {
    const optionExists = Array.from(gameModeSelect.options).some(o => o.value === mode);
    if (optionExists) gameModeSelect.value = mode;
  }

  const startsWith = params.get("startsWith");
  if (startsWith && startsWithInput) {
    startsWithInput.value = startsWith;
    revealFilterField("fieldStartsWith", "btnToggleStartsWith");
    hasActionableFilter = true;
  }

  const endsWith = params.get("endsWith");
  if (endsWith && endsWithInput) {
    endsWithInput.value = endsWith;
    revealFilterField("fieldEndsWith", "btnToggleEndsWith");
    hasActionableFilter = true;
  }

  const contains = params.get("contains");
  if (contains && containsInput) {
    containsInput.value = contains;
    revealFilterField("fieldContains", "btnToggleContains");
    hasActionableFilter = true;
  }

  // Update the on-page heading/title so the filtered view reads like a
  // dedicated page, even though it's all one dynamic template.
  const dynamicHeading = buildDynamicHeading(params);
  if (dynamicHeading) {
    const headingEl = document.querySelector("[data-dynamic-heading]");
    const subheadingEl = document.querySelector("[data-dynamic-subheading]");
    if (headingEl) headingEl.textContent = dynamicHeading;
    if (subheadingEl) subheadingEl.textContent = `Instant results for ${dynamicHeading.toLowerCase()} — enter your rack letters below to see matches.`;
    document.title = `${dynamicHeading} | Letter Unscrambler Pro`;
  }

  // Only auto-run the search once we actually have letters to work with
  // (rack letters, or a starts/ends/contains value) — matching the tool's
  // existing rule that a letter pool is required to form matches.
  if (hasActionableFilter) {
    unscrambleLetters();
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", async () => {
  await loadDictionary();
  applyUrlParamsAndMaybeSearch();

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