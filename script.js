const accessKey = "HBkq2bUiw1KVdJYxpuF-hHpEGbC0q6y2rsY1M0AANZo";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResalts = document.querySelector(".search-resalts");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1){
        searchResalts.innerHTML = "";
    }

    results.map((result) => {
        const imageWapper = document.createElement("div");
        imageWapper.classList.add("search-resalt");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLinl = document.createElement("a");
        imageLinl.href = result.links.html;
        imageLinl.target = "_blank";
        imageLinl.textContent = result.alt_description;

        imageWapper.appendChild(image);
        imageWapper.appendChild(imageLinl);
        searchResalts.appendChild(imageWapper);
    });

    page++
    if(page > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", (event) => {
    searchImages();
})