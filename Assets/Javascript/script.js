var movieKey = '058146d0b6c44dd4946f65767dd0e064';
var inputEl = $("#actInput");
var buttonEl = $("button");



function fetchRequests(newName) {
    var tmdbURL = 'https://api.themoviedb.org/3/search/person?query=' + newName + '&api_key=' + movieKey; //the movie database API URL
    var celebURL = 'https://api.api-ninjas.com/v1/celebrity?name=' + newName; //the celebrity API URL
    fetch(tmdbURL)
        .then(function (response) {
            if (!response.ok) {
                console.error(response);
            }
            return response.json();
        }).then(function (movieData) {
            // console.log(movieData);
            showMovieInfo(movieData);
        });




    fetch(celebURL, {
        method: 'GET',
        headers: {
            'X-API-Key': 'zFb0KKRElJvaciVwbAZvzw==oTpqLnCAfZPLw1Bk'
        }
    }).then(function (response) {
        if (!response.ok) {
            console.error(response);
        }
        return response.json();
    }).then(function (actorData) {
        showActorInfo(actorData);
    });

}

function handleSubmit() {
    var actorName = inputEl.val();
    var newName = actorName.split(" ").join("%20");
    fetchRequests(newName);

}

function showMovieInfo(movieData) {
    var posterPath;
    var profilePath = movieData.results[0].profile_path;

    console.log('https://image.tmdb.org/t/p/original' + profilePath);
    //display images in html
    //<img src = 'https://image.tmdb.org/t/p/original' + posterPath>
    //<img src = 'https://image.tmdb.org/t/p/original' + profilePath>

    //file path url for posters https://image.tmdb.org/t/p/original{path here}
    var knownFor = [];
    knownFor = movieData.results[0].known_for;
    for (i = 0; i < knownFor.length; i++) {
        if (knownFor[i].media_type === "movie") {
            var movie = knownFor[i].title;
            console.log(movie);
            var releaseDate = knownFor[i].release_date;
            console.log(releaseDate);

            var overview = knownFor[i].overview;
            console.log(overview);

            posterPath = knownFor[i].poster_path;
        }

        else{
            var showName = knownFor[i].name;
            console.log(showName);

            var firstAirDate = knownFor[i].first_air_date;
            console.log(firstAirDate);

            var overview = knownFor[i].overview;
            console.log(overview);
        }
    }

}

function showActorInfo(actorData) {
    var actorName = nameFormatter(actorData);

    console.log("----------------------");
    console.log(actorName);

    var actorAge = actorData[0].age + "yrs old";
    console.log(actorAge);
    var actorBday = actorData[0].birthday;
    console.log("Birthday: " + actorBday);

    var actorHeight = metersToFeet(actorData);
    console.log(actorHeight);
}

function nameFormatter(actorData) {
    fixNameArray = actorData[0].name.toLowerCase(); //forces all letter to be lowercase
    nameArray = fixNameArray.split(" "); //makes an array of the actors first, last, and/or middle name
    var actorName = ""; //initialize string builder
    var wordArray; //intializie array for each letter

    for (i = 0; i < nameArray.length; i++) {
        wordArray = nameArray[i].split(""); //splits name up into individual letters
        wordArray[0] = wordArray[0].toUpperCase(); //makes the first letter uppercase
        actorName = actorName + wordArray.join("") + " "; //puts the full name back together
    }

    return actorName;
}

function metersToFeet(actorData) {
    var rawHeight = actorData[0].height * 3.28084;
    var truncHeight = rawHeight - Math.trunc(rawHeight);
    var actorHeight = Math.floor(rawHeight) + "ft " + Math.ceil((truncHeight * 12)) + "in";

    return actorHeight;
}


//event listener
buttonEl.on('click', function (event) {
    event.preventDefault();
    handleSubmit();
})