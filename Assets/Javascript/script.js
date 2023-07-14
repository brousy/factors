var movieKey = "058146d0b6c44dd4946f65767dd0e064";
var inputEl = $("#actInput");
var buttonEl = $(".search-btn");
var projectsEl = $(".scrollable-content");
var posterEl = $("#poster");
var actorNameEl = $("#actorName");
var actorImageEl = $(".card-content img");
var heightEl = $(".card-content .col.s12:nth-child(2) h4");
var birthdayEl = $(".card-content .col.s12:nth-child(3) h4");
var actorName = "";

buttonEl.on("click", function (event) {
  event.preventDefault();
  actorName = inputEl.val();
  var newName = nameFormatter(actorName);
  fetchRequests(newName);
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
  var movies = movieData.results[0].known_for;
  var actorImage = movieData.results[0].profile_path;
  projectsEl.empty();
  console.log(actorImage);

  for (var i = 0; i < movies.length; i++) {
    if (movies[i].media_type === "movie") {
      var movieTitle = movies[i].original_title;
      var moviePosterPath = movies[i].poster_path;

      var movieElement = $("<div>")
        .addClass("row")
        .append(
          $("<div>").addClass("col s12").html($("<h4>").text(movieTitle))
        );

      projectsEl.append(movieElement);
      actorImageEl.attr("src", "https://image.tmdb.org/t/p/w500/" + actorImage);

      var moviePosterElement = $("<div>")
        .addClass("row")
        .append(
          $("<div>")
            .addClass("col s12")
            .html(
              $("<img>")
                .addClass("image")
                .attr(
                  "src",
                  "https://image.tmdb.org/t/p/w500/" + moviePosterPath
                )
            )
        );

      projectsEl.append(moviePosterElement);
    } // we need an else function to handle if the media type is "tv"
  }
}

function showActorInfo(actorData) {
  var actorHeight = metersToFeet(actorData);
  var actorBday = actorData[0].birthday;

  console.log("----------------------");
  console.log(actorName);
  console.log(actorHeight);
  console.log("Birthday: " + actorBday);

  // Update actor name
  actorNameEl.text(actorName);

  // Update actor height
  $(".card-content .height h4").text("Height: " + actorHeight);

  // Update actor birthday
  $(".card-content .birthday h4").text("Birthday: " + actorBday);
}

function nameFormatter(actorName) {
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
  var actorHeight =
    Math.floor(rawHeight) + "ft " + Math.ceil(truncHeight * 12) + "in";

  return actorHeight;
}
