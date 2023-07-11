var tmdbURL = 'https://api.themoviedb.org/3/search/person?query=james%20franco&api_key=058146d0b6c44dd4946f65767dd0e064';

fetch(tmdbURL)
.then(function(response){
    if(!response.ok){
        console.error(response);
    }
    return response.json();
})
.then(function(response){
    console.log(response);
})

//query movie name
//use credits endpoint
//fetch('https://api.themoviedb.org/3/search/person?query=james%20franco&include_adult=false&language=en-US&page=1', options)