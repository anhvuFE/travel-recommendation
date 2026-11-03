// ===== TravelWander search logic =====

// Wire up the nav buttons once the page has loaded.
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const input = document.getElementById("searchInput");

  if (searchBtn) searchBtn.addEventListener("click", handleSearch);
  if (clearBtn) clearBtn.addEventListener("click", handleClear);

  // Allow pressing Enter in the search box.
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSearch();
    });
  }
});

// Fetch the data file and return the matching recommendations.
async function handleSearch() {
  const resultsEl = document.getElementById("results");
  const input = document.getElementById("searchInput");

  // The results container only exists on the Home page. If a search is run
  // from About/Contact, redirect Home and carry the keyword along.
  if (!resultsEl) {
    const term = input ? input.value.trim() : "";
    window.location.href =
      "index.html" + (term ? "?q=" + encodeURIComponent(term) : "");
    return;
  }

  const keyword = input.value.trim().toLowerCase();
  if (!keyword) {
    resultsEl.innerHTML =
      '<p style="grid-column:1/-1">Please type a keyword such as "beach", "temple" or "country".</p>';
    return;
  }

  let data;
  try {
    const res = await fetch("travel_recommendation_api.json");
    data = await res.json();
  } catch (err) {
    resultsEl.innerHTML =
      '<p style="grid-column:1/-1">Sorry, could not load recommendations.</p>';
    return;
  }

  const recommendations = getRecommendations(data, keyword);

  if (recommendations.length === 0) {
    resultsEl.innerHTML =
      '<p style="grid-column:1/-1">No results found. Try "beach", "temple" or "country".</p>';
    return;
  }

  renderResults(resultsEl, recommendations);
}

// Map a keyword to the right category. Handles singular/plural and case.
function getRecommendations(data, keyword) {
  if (keyword.includes("beach")) {
    return data.beaches;
  }
  if (keyword.includes("temple")) {
    return data.temples;
  }
  if (keyword.includes("countr")) {
    // "country" / "countries" -> flatten every city from every country.
    return data.countries.flatMap((country) => country.cities);
  }
  return [];
}

// Build the result cards.
function renderResults(container, items) {
  container.innerHTML = items
    .map(
      (item) => `
        <article class="result-card">
          <img src="${item.imageUrl}" alt="${item.name}" />
          <div class="body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        </article>`
    )
    .join("");
}

function handleClear() {
  const input = document.getElementById("searchInput");
  const resultsEl = document.getElementById("results");
  if (input) input.value = "";
  if (resultsEl) resultsEl.innerHTML = "";
}

function handleContactSubmit(event) {
  // Let the mailto form submit, then reset the fields.
  alert("Thanks! Your message is ready to send from your email client.");
  return true;
}

// If we arrived on Home with ?q=... from another page, run that search.
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  const input = document.getElementById("searchInput");
  const resultsEl = document.getElementById("results");
  if (q && input && resultsEl) {
    input.value = q;
    handleSearch();
  }
});
