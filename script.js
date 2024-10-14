let APIKEYS = "6dd1b066be6641138c7c10fbaed1e344";
let URL = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("news"));
function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  let response = await fetch(`${URL}${query}&apikey=${APIKEYS}`);
  let data = await response.json();
  bindData(data.articles);
}
function bindData(articles) {
  console.log(articles);
  let container = document.getElementById("cards-container");
  let newCardTemlete = document.getElementById("template-news-card");
  container.innerHTML = "";
  articles.forEach((article) => {
    if (article.urlToImage === "null" || article.urlToImage === null) {
      return;
    }
    const cardClone = newCardTemlete.content.cloneNode(true);
    fillDataCard(cardClone, article);
    container.appendChild(cardClone);
  });
}
function fillDataCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  console.log(article.urlToImage);
  newsImg.src = article.urlToImage;
  console.log(article.title);
  newsTitle.innerHTML = article.title;
  console.log(article.source.name);
  newsSource.innerHTML = article.source.name;
  console.log(article.description);
  newsDesc.innerHTML = article.description;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
let input = document.querySelector(".news-input");
let button = document.querySelector("#search-button");
button.addEventListener("click", () => {
  let query = input.value;
  if (!query) return;
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
  fetchNews(query);
});
