'use strict'

const apiKey ='';
const searchURL ='';

function formatQuery(params){
const queryItems = Object.keys(params)
    .map(key => `${(key)}=${(params[key])}`)
return queryItems.join('&');
}


function getBmarks(query, maxResults=10){
    const params = {
        key: apiKey,
        q: query,
        part: 'snippet',
        maxResults
    };
    const queryString = formatQuery(params)
    const url = searchURL + '?' + queryString;

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const SearchTerm =$('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getBmarks(searchTerm, maxResults);
    });
}

$(watchform);