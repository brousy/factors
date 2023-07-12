
var inputEl = $("#actInput");
var buttonEl = $("button");



function fetchRequests(newName) {
    var tmdbURL = 'https://api.themoviedb.org/3/search/person?query=' + newName + '&api_key=058146d0b6c44dd4946f65767dd0e064'; //the movie database API URL
    var celebURL = 'https://api.api-ninjas.com/v1/celebrity?name=' + newName; //the celebrity API URL
    fetch(tmdbURL)
        .then(function (response) {
            if (!response.ok) {
                console.error(response);
            }
            return response.json();
        }).then(function (movieData) {
            console.log(movieData);
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
    }).then(function (response) {
        console.log(response);
    });

}

function showMovieInfo(movieData){
    var actor = movieData.results[0];
    var movies = [];
    movies = actor.known_for;
    for(i=0; i<movies.length; i++){
        var movie = movies[i].original_title;
        console.log(movie);

        var releaseDate = movies[i].release_date;
        console.log(releaseDate);

        var overview = movies[i].overview;
        console.log(overview);
    }
}




buttonEl.on('click', function (event) {
    event.preventDefault();
    handleSubmit();
})

function handleSubmit() {
    var actorName = inputEl.val();
    var newName = actorName.split(" ").join("%20");
    fetchRequests(newName);
}