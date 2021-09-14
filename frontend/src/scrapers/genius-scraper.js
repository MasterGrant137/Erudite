const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const pretty = require('pretty');
const { geniusClientToken } = require('./genius-auth.json');

const artist = '137-us'
//? finding artist by ID
// const url = `https://api.genius.com/artists/${id}/songs?per_page=10`;
//? allowing for search by artist
const url = `https://api.genius.com/search?per_page=20/`;
// const fltr = '/search?per_page=10&page=';

// const searchUrl = `${url}${artist}`
const searchUrl = `${url}`


const geniusFetcher = () => {

console.log(geniusClientToken);
    axios.get(searchUrl, {
        headers: { 'Authorization': `Bearer ${geniusClientToken}` },
        data: { 'q': artist }
    })
    .then(res => {
        // const individualArtist = res.data.response.hits[0].result.primary_artist;
        const artistSongs = res.data.response.hits

        lyricsScraper()
    })
    .catch(err => {
        console.error(`You have this error bud: ${err}`)
    })
}


const lyricsScraper = () => {
    const $ = cheerio.load(res.data);

}




geniusFetcher();



// module.exports = geniusScraper();
