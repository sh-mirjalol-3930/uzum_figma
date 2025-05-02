const wrap = document.querySelector(".wrapper");
const API_url = "https://dummyjson.com/products";

function renderCard(data) {
    const fragment = document.createDocumentFragment();
    data.forEach((products) => {
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.id = products.id;
        card.innerHTML = `
        <img name="card-image" src=${products.images[0]} alt="">
        <h3>${products.title}</h3>
        <p>${products.category}</p>
        <p>${products.price}</p>`;
        fragment.append(card);
    });
    wrap.append(fragment);
}

async function fetchData() {
    const response = await fetch(API_url);
    const promise = response.json();
    promise
        .then((res) => {
            console.log(res);
            renderCard(res.products);
        })

        .catch((err) => {
            console.log(err);
        });
}

window.onload = () => {
    fetchData();
};

wrap.addEventListener("click", (event) => {
    let name = event.target.name;
    console.log(name);

    if (name === "card-image") {
        const id = event.target.closest(".card").dataset.id;
        open(`/pages/product.html?q=${id}`, "_self");
    }
});
