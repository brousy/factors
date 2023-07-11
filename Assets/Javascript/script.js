
var inputEl = $("#actInput");
var buttonEl =$("button");

function fetchRequests(newName) {
    var tmdbURL = 'https://api.themoviedb.org/3/search/person?query='+newName+'&api_key=058146d0b6c44dd4946f65767dd0e064';
    var celebURL = 'https://api.api-ninjas.com/v1/celebrity?name='+newName;
    fetch(tmdbURL) .then(function (response) {
            if (!response.ok) {
                console.error(response);
            }
            return response.json();
        }) .then(function (response) {
            console.log(response);
        })
    
    fetch(celebURL, {
        method: 'GET',
        headers: {
            'X-API-Key': 'zFb0KKRElJvaciVwbAZvzw==oTpqLnCAfZPLw1Bk'
        }
    }) .then(function (response){
        if (!response.ok) {
            console.error(response);
        }
        return response.json();
    }) .then(function (response) {
        console.log(response);
    })
}


buttonEl.on('click',function(event){
    event.preventDefault();
    handleSubmit();
})

function handleSubmit() {
    var actorName = inputEl.val();
    var newName = actorName.split(" ").join("%20");
    fetchRequests(newName);
}