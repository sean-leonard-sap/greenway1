const burger = document.querySelector(".burger");

////
const auth = "563492ad6f917000010000015a4ab7f4c51d485199461361d501ea8a"; //ADD THE AUTH KEY
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

// functins
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5 });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5 });
    gsap.fromTo(".line3", { opacity: 1 }, { opacity: 0, duration: 0.75 });
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("myNav").style.opacity = "1";
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0 });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0 });
    gsap.fromTo(".line3", { opacity: 0 }, { opacity: 1, duration: 0.75 });
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("myNav").style.opacity = "0";
  }
}

//EventListeners
burger.addEventListener("click", navToggle);

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
            <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
            </div>
            <img src=${photo.src.large}></img>
            `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
