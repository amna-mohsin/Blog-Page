let currentCategory = "All";
let currentPage = 1;
const postsPerPage = 12;

function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const cards = Array.from(document.querySelectorAll(".card"));

  let visibleCards = cards.filter(card => {
    const title = card.getAttribute("data-title").toLowerCase();
    const category = card.getAttribute("data-category");
    const matchesSearch = title.includes(searchTerm);
    const matchesCategory = currentCategory === "All" || category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  renderCards(visibleCards);
  renderPagination(visibleCards.length);
}

function renderCards(visibleCards) {
  const container = document.getElementById("postsContainer");
  const cards = Array.from(document.querySelectorAll(".card"));

  cards.forEach(card => card.style.display = "none");

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  visibleCards.slice(start, end).forEach(card => {
    card.style.removeProperty("display");
  });

  if (visibleCards.length === 0) {
    container.innerHTML = "<p>No posts found.</p>";
  }
}

function renderPagination(totalVisible) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalVisible / postsPerPage);
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      applyFilters();
    };
    pagination.appendChild(btn);
  }
}

function filterCategory(category) {
  currentCategory = category;
  currentPage = 1;

  document.querySelectorAll(".filters button").forEach(btn =>
    btn.classList.remove("active")
  );
  event.target.classList.add("active");

  applyFilters();
}

window.onload = () => applyFilters();
