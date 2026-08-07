/**
 * Letter Unscrambler Core Engine (JSON Dictionary Enabled)
 */

let WORD_LIST = [];

// Fetch the full dictionary.json file when the page loads
async function loadDictionary() {
  try {
    const response = await fetch('dictionary.json');
    WORD_LIST = await response.json();
    console.log(`Loaded ${WORD_LIST.length} words into memory.`);
  } catch (error) {
    console.error("Error loading dictionary.json:", error);
    document.getElementById("resultsContainer").innerHTML = 
      "<p class='error-msg'>Could not load word dictionary. Ensure dictionary.json exists.</p>";
  }
}

// Helper: Count letter occurrences in a string
function getLetterCounts(str) {
  const counts = {};
  const cleaned = str.toLowerCase().replace(/[^a-z]/g, '');
  for (let char of cleaned) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
}

// Check if a dictionary word can be formed from available letters
function canFormWord(word, availableCounts) {
  const wordCounts = getLetterCounts(word);
  for (let char in wordCounts) {
    if (!availableCounts[char] || wordCounts[char] > availableCounts[char]) {
      return false;
    }
  }
  return true;
}

// Main Unscramble Function
function unscrambleLetters() {
  const inputLetters = document.getElementById("lettersInput").value.trim();
  const filterLength = parseInt(document.getElementById("lengthFilter").value, 10);
  const resultsContainer = document.getElementById("resultsContainer");

  if (!inputLetters) {
    resultsContainer.innerHTML = "<p class='error-msg'>Please enter some letters to unscramble.</p>";
    return;
  }

  if (WORD_LIST.length === 0) {
    resultsContainer.innerHTML = "<p class='error-msg'>Dictionary is still loading... please wait a second and try again.</p>";
    return;
  }

  const availableCounts = getLetterCounts(inputLetters);
  
  // Filter matching words
  let matches = WORD_LIST.filter(word => {
    const isFormable = canFormWord(word, availableCounts);
    if (!isFormable) return false;

    // Filter by length if selected
    if (filterLength > 0 && word.length !== filterLength) {
      return false;
    }
    return true;
  });

  // Group matches by word length (descending)
  const grouped = {};
  matches.forEach(word => {
    const len = word.length;
    if (!grouped[len]) grouped[len] = [];
    grouped[len].push(word.toUpperCase());
  });

  displayResults(grouped, matches.length);
}

// Display Results
function displayResults(grouped, totalCount) {
  const resultsContainer = document.getElementById("resultsContainer");
  
  if (totalCount === 0) {
    resultsContainer.innerHTML = "<p class='no-results'>No matching words found.</p>";
    return;
  }

  let html = `<div class="results-header">Found <strong>${totalCount}</strong> word(s)</div>`;
  const lengths = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  lengths.forEach(len => {
    html += `
      <div class="length-group">
        <h3>${len}-Letter Words (${grouped[len].length})</h3>
        <div class="word-grid">
          ${grouped[len].map(word => `<span class="word-card">${word}</span>`).join('')}
        </div>
      </div>
    `;
  });

  resultsContainer.innerHTML = html;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // 1. Start downloading the dictionary immediately
  loadDictionary();

  // 2. Attach button & keypress listeners
  const unscrambleBtn = document.getElementById("unscrambleBtn");
  const lettersInput = document.getElementById("lettersInput");

  if (unscrambleBtn) {
    unscrambleBtn.addEventListener("click", unscrambleLetters);
  }

  if (lettersInput) {
    lettersInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        unscrambleLetters();
      }
    });
  }
});