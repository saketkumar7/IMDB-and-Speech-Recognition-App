let search = document.querySelector("#search");
search.addEventListener("keyup", (e) => {
  let searchText = e.target.value;
  SearchMovie(searchText);
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterkey_formBlock");
});
let speechSearch = document.getElementById("speechIcon");
speechSearch.addEventListener("click", () => {
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterkey_formBlock");

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  let p = document.createElement("p");
  recognition.interimResults = true;
  recognition.addEventListener("result", (e) => {
    let transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    search.value = transcript;
    if (e.results[0].isFinal) {
      p = document.createElement("p");
      p.innerHTML = transcript;
      let searchText = transcript;
      SearchMovie(searchText);
    }
  });
  recognition.start();
});

function SearchMovie(searchText) {
  let imdbApi = `http://www.omdbapi.com/?s=${searchText}&apikey=62c4b46`;
  window
    .fetch(imdbApi)
    .then((data) => {
      data
        .json()
        .then((movieData) => {
          let movies = movieData.Search;
          let output = [];
          for (let movie of movies) {
            if (movie.Poster === "N/A") {
              movie.Poster = "/images/ex.jpg";
            }
            output += `
            <div>
                 <img src="${movie.Poster}"/>
                 <h1>${movie.Title}</h1>
                 <p>${movie.Year}</p>
                 <a href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank">Movie Details</a>
            </div>  `;
          }
          /* let allImages = document.images;
          [...allImages].forEach((img) => {
            if (img.src === "N/A") {
              console.log(img);
            }
          });*/
          document.getElementById("template").innerHTML = output;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
//<img src="/images/ex.jpg" alt=""></img>
