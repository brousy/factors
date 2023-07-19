var movieKey = "058146d0b6c44dd4946f65767dd0e064";

var inputEl = $("#actInput");
var buttonEl = $(".search-btn");
var projectsEl = $(".scrollable-content");
var posterEl = $("#poster");
var actorNameEl = $("#actorName");
var actorImageEl = $(".card-content img");
var heightEl = $(".card-content .col.s12:nth-child(2) h4");
var birthdayEl = $(".card-content .col.s12:nth-child(3) h4");
var cardEl = $(".info-cards");

var actorName = "";

buttonEl.on("click", function (event) {
  event.preventDefault();
  actorName = nameFormatter(inputEl.val());
  fetchRequests(actorName);

  let searchHistoryArr = JSON.parse(localStorage.getItem("history")) || [];
  $(".name-list").empty();

  if (!searchHistoryArr.includes(actorName)) {
    searchHistoryArr.push(actorName);
    localStorage.setItem("history", JSON.stringify(searchHistoryArr));
    $(".name-list").innerHTML = "";
  }

  for (let i = 0; i < searchHistoryArr.length; i++) {
    let btn = $("<button>");
    btn.attr("class", "button_top");
    btn.text(searchHistoryArr[i]);

    btn.on("click", function (event) {
      fetchRequests($(this).text());
      actorNameEl.text($(this).text());
    });

    $(".name-list").append(btn);
  }
});

function fetchRequests(newName) {
  var tmdbURL = "https://api.themoviedb.org/3/search/person?query=" + newName + "&api_key=" + movieKey; //the movie database API URL

  var celebURL = "https://api.api-ninjas.com/v1/celebrity?name=" + newName; //the celebrity API URL

  fetch(tmdbURL)
    .then(function (response) {
      if (!response.ok) {
        console.error(response);
      }
      return response.json();
    })
    .then(function (movieData) {
      console.log(movieData);
      showMovieInfo(movieData);
    });

  fetch(celebURL, {
    method: "GET",
    headers: {
      "X-API-Key": "zFb0KKRElJvaciVwbAZvzw==oTpqLnCAfZPLw1Bk",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        console.error(response);
      }
      return response.json();
    })
    .then(function (actorData) {
      showActorInfo(actorData);
    });
}

function showMovieInfo(movieData) {
  cardEl.removeClass("hidden");
  var movies = movieData.results[0].known_for;
  var actorImage = movieData.results[0].profile_path;
  projectsEl.empty();
  console.log(actorImage);
  // var parentEl = $('.dataParent');
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].media_type === "movie") {
      var movieTitle = movies[i].title;
      var moviePosterPath = movies[i].poster_path;
      var releaseDate = movies[i].release_date;
      var overview = movies[i].overview;

      var movieElement = $("<div>").addClass("row card-border")
        .append(
          $("<div>").addClass("col s3")
            .append(
              $("<img>").addClass("image")
                .attr("src", "https://image.tmdb.org/t/p/w500/" + moviePosterPath)
            )
        )
        .append(
          $("<div>").addClass("col s9")
            .append(
              $("<h3>").text(movieTitle),
              $("<h6>").text(releaseDate),
              $("<p>").text(overview).addClass("overview")
            )
        );

      actorImageEl.attr("src", "https://image.tmdb.org/t/p/w500/" + actorImage);

      projectsEl.append(movieElement);

    }

    else { //handles if a tv show comes up
      var movieTitle = movies[i].name;
      var moviePosterPath = movies[i].poster_path;
      var releaseDate = movies[i].first_air_date;
      var overview = movies[i].overview;

      var movieElement = $("<div>").addClass("row")
        .append(
          $("<div>").addClass("col s3")
            .append(
              $("<img>").addClass("image")
                .attr("src", "https://image.tmdb.org/t/p/w500/" + moviePosterPath)
            )
        )
        .append(
          $("<div>").addClass("col s9")
            .append(
              $("<h3>").text(movieTitle),
              $("<p>").text(overview),
              $("<h6>").text(releaseDate)
            )
        );

      actorImageEl.attr("src", "https://image.tmdb.org/t/p/w500/" + actorImage);

      projectsEl.append(movieElement);

    }
  }
}

function showActorInfo(actorData) {
  console.log(actorData);
  //maybe display if theyre still alive? we have that info in the API.
  // could possibly use a wiki API to display a summary of their life too. this is not required, just feeling like the actor card is bare.
  // Update actor name
  actorNameEl.text(nameFormatter(actorData[0].name));

  // Update actor height
  $(".card-content .height h4").text("Height: " + metersToFeet(actorData));

  // Update actor birthday
  $(".card-content .birthday h4").text("Birthday: " + actorData[0].birthday);
}

function nameFormatter(actorName) {
  actorName = actorName.toLowerCase();
  var nameArray = actorName.split(" ");
  actorName = "";
  for (var i = 0; i < nameArray.length; i++) {
    var wordArray = nameArray[i].split("");
    wordArray[0] = wordArray[0].toUpperCase();
    actorName += wordArray.join("") + " ";
  }

  return actorName;
}

function metersToFeet(actorData) {
  var rawHeight = actorData[0].height * 3.28084;
  var truncHeight = rawHeight - Math.trunc(rawHeight);

  //test for if they are exactly x feet tall (before i added this it said Danny Devito was 4' 12" instead of 5 ft)
  if (Math.ceil(truncHeight * 12) === 12) {
    var actorHeight = Math.ceil(rawHeight) + "ft";
  }

  //otherwise shows feet and inches.
  else {
    var actorHeight =
      Math.floor(rawHeight) + "ft " + Math.ceil(truncHeight * 12) + "in";
  }

  return actorHeight;
}