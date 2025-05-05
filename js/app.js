const wrap = document.querySelector(".wrapper");
const categoryEl = document.querySelector(".categoryBar");
const seeMoreBtn = document.querySelector(".yana button");
const API_url = "https://dummyjson.com/products";
const allBtn = document.querySelector(".alldata");

let currentLimit = 8;
let selectedCategory = "";

function renderCard(data) {
    const fragment = document.createDocumentFragment();
    data.forEach((product) => {
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.id = product.id;
        card.innerHTML = `
            <img name="card-image" src="${product.images[0]}" alt="">
            <h3>${product.title}</h3>
            <p>${product.category}</p>
            <p>$${product.price}</p>
        `;
        fragment.append(card);
    });
    wrap.append(fragment);
}

async function fetchData(limit = 8, category = "") {
    try {
        const url = category
            ? `${API_url}/category/${category}?limit=${limit}`
            : `${API_url}?limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        wrap.innerHTML = "";
        renderCard(data.products);
    } catch (err) {
        console.log("Xatolik: ", err);
    }
}

async function fetchCategories() {
    try {
        const response = await fetch(`${API_url}/categories`);
        const categories = await response.json();
        renderCategories(categories);
    } catch (err) {
        console.log("Kategoriya xatosi: ", err);
    }
}

function renderCategories(categories) {
    const fragment = document.createDocumentFragment();
    categories.forEach((category) => {
        const button = document.createElement("button");
        button.className = "category-btn";
        button.textContent = category.name;

        button.dataset.category = category.name;
        fragment.append(button);
    });
    categoryEl.append(fragment);
}

categoryEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("category-btn")) {
        selectedCategory = event.target.dataset.category;
        currentLimit = 8;
        wrap.innerHTML = "";
        fetchData(currentLimit, selectedCategory);
    }
});

wrap.addEventListener("click", (event) => {
    if (event.target.name === "card-image") {
        const id = event.target.closest(".card").dataset.id;
        window.location.href = `/pages/product.html?q=${id}`;
    }
});

seeMoreBtn.addEventListener("click", () => {
    currentLimit += 4;
    fetchData(currentLimit, selectedCategory);
});

window.onload = () => {
    fetchCategories();
    fetchData(currentLimit, selectedCategory);
};

allBtn.addEventListener("click", () => {
    selectedCategory = "";
    currentLimit = 8;
    fetchData(currentLimit, selectedCategory);
});
