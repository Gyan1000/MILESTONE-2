//I HAVE DISPLAY TWO PAGE INFORMATION WITN IN SINGLE PAGE;AS YOU CLICK ON MOVIE-CARD(INDEX-PAGE) YOU CAN SEE MOVE DETAIL INFORMATION(DETAIL_PAGE) ON THE SAME PAGE
//AS YOU CLICK BACK-BUTOON AGAIN YOU WILL COME BACK ON MOVE-CARD PAGE(INDEX_PAGE)
let data,
  indexPageContent,
  indexPage_heading_content,
  text_id,
  detailPage_Heading,
  text_index = 0,
  setInterval_id,
  heading_textcontent = "SHOW DETAILS",
  indexPage_heading,
  displayMovie,
  main_container,
  mymovie,
  movieContent,
  movie_container;

function initialization() {
  movie_container = document.getElementById("m-container");

  movieContent = document.getElementById("movieContent");

  mymovie = document.getElementsByClassName("mymovie");
  main_container = document.querySelector(".main-container");

  displayMovie = document.getElementById("m-container");

  indexPage_heading = document.getElementById("heading_content");

  heading_textcontent = "SHOW DETAILS";
}
// load movies from API
async function loadMovies(searchMovie) {
  const URL = `http://www.omdbapi.com/?s=${searchMovie}&apikey=d94d125c`;
  const res = await fetch(`${URL}`);
  data = await res.json();

  if (data.Response == "True") {
    displayMovieList(data.Search);
    console.log("loadMovies.. ", data.Search);
    showMovie(data.Search);
  } else {
    movie_container.innerHTML = `<h1 class="error-message" id="error">Sorry to say Movie is not found</h1>`;
  }
}

function findMovies() {
  let movieSearchBox = document.getElementById("search-box");
  let searchMovie = movieSearchBox.value.trim();
  console.log(".......find movie", searchMovie);
  if (searchMovie.length > 0) {
    // movie name enter by user that should be greater than 0 so loadmovie() will be called
    loadMovies(searchMovie);
  } else {
    movie_container.innerHTML = `<h1 class="error-message" id="error">Input Box is  Empty</h1>`;
  }
}

function displayMovieList(movies) {
  displayMovie.innerHTML = " "; // for removing error message;
  let movieList = "";

  for (let id = 0; id < movies.length; id++) {
    if (movies[id].Poster != "N/A") moviePoster = movies[id].Poster;
    else {
      // here I assign images-not-found image url in moviePoster variable;
      moviePoster =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpfTuch8F_PkEaqS6nATu1Bwm6ppJrPcghMg&usqp=CAU";
    }

    movieList = `<div class="mymovie" onclick=displayDetailPage(this)>
  
             <div class = "img-container">
            
               <img src = "${moviePoster}" alt="image Not found">
             </div>
           
             <div class = "info1">

              <p> ${movies[id].Title}<i style='font-size:0'>${movies[id].Year}</i></p>
             
              <button class="movie-button">watch Now</button>
              <span id="toltip">CLICK ME</span>
             </div>  
             
           </div>`;

    //   assign movieList to mymovie container
    displayMovie.innerHTML += movieList;
  }

  indexPageContent = displayMovie.innerHTML;
  indexPage_heading_content = indexPage_heading.innerHTML;
}
// details page info

function displayDetailPage(movie_card) {
  const info = data.Search;
  console.log("m..t", movie_card.innerText.split("/n"));
  for (let i = 0; i < mymovie.length; i++) {
    if (info[i].Title + info[i].Year == movie_card.innerText.split("\n")[0]) {
      indexPage_heading.innerHTML = "";
      displayMovie.innerHTML = "";
      heading_textcontent = "SHOW DETAILS";
      movieContent.innerHTML = `<header class="header-section">
     

          <div class="heading">
  
              <h1 id="detailPage-Heading"></h1>
  
           </div>
  
           <div id="back-btn" style='padding-top: 1rem'>
           
            <button onclick=getStoreIndexPageContent()> <i class="fa-solid fa-arrow-left fa-lg anchor" style="color: #000000"></i></button>
           
          </div>
  
         </header>   


        <div id="movie-content-heading">
        <div id="movie-page-img-box" class="anchor">
          <img src="${info[i].Poster}" alt='image not found'>
          </div>
       
        <div id="movie-page-info">
        
        <h4 class="m-des"><span class='movie_info'>SHOW TITLE:</span></br>${info[i].Title}</h4>

         <p class="m-des"></br><span class='movie_info'>RELEASED YEAR:</span></br>${info[i].Year}</p>

         <p class="m-des"><BR/><span class='movie_info'>TYPE:</span></br>${info[i].Type}</p>
          </div>
          
         </div>
       
       `;
      console.log(info[i].Title);

      console.log(displayMovie);
      // set background-color in detailPage
      setInterval_id = setInterval(() => {
        main_container.style.backgroundColor = radomColor();
      }, 1000);

      // /indexPage text-effect
      detailPage_Heading = document.getElementById("detailPage-Heading");
      // detailPage_Heading=indexPage_heading;
      console.log("........h_t", detailPage_Heading);

      displayText();

      break;
    }
  }
}

//again display indexPage
function getStoreIndexPageContent() {
  //STOP randomColor()
  console.log(
    "clear setTimeinterval of detailsPage background-color: ",
    clearInterval(setInterval_id)
  );

  // restore indexPage background-color
  main_container.style.backgroundColor = "black";

  //STOP displayText()
  console.log(
    "clear setTimeinterval of detailsPage text-display effect: ",
    clearInterval(text_id)
  );
  //text-index re-initialization for display text in detailPage from 0 index;
  text_index = 0;

  movieContent.innerHTML = "";
  indexPage_heading.innerHTML = indexPage_heading_content;
  displayMovie.innerHTML = indexPageContent;

  console.log(
    "......indexPage_heading",
    indexPage_heading,
    "indexPage content.. ",
    displayMovie
  );
}

function radomColor() {
  let colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += colors[Math.floor(Math.random() * colors.length)];
  }

  return color;
}

function displayText() {
  if (heading_textcontent.length > text_index) {
    detailPage_Heading.textContent += heading_textcontent.charAt(text_index);
    text_index++;
  } else {
    detailPage_Heading.textContent = " ";
    text_index = 0;
  }
  text_id = setTimeout(displayText, 500);
  console.log("display Text......");
}
