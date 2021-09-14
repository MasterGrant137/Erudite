const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const { geniusClientToken } = require('./genius-auth.json');

const url = 'https://api.genius.com/artists/16775/songs?per_page=10';
// const fltr = '/search?per_page=10&page=';

const artist = '137-us'
// const searchUrl = `${url}${artist}`
const searchUrl = `${url}`


const geniusFetcher = () => {
   
console.log(geniusClientToken);
    axios.get(searchUrl, {
        headers: { 'Authorization': `Bearer ${geniusClientToken}` },
        // data: { 'q': artist }
    })
    .then(res => {
        const $ = cheerio.load(res.data);
        console.log(res.data.response.songs[0].url);
    })
    .catch(err => {
        console.error(`You have this error bud: ${err}`)
    })
}


const geniusScraper = () => {

}




geniusFetcher();



// module.exports = geniusScraper();
