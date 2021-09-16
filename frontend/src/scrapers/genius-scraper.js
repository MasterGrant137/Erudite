const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const { geniusClientToken } = require('./genius-auth.json');
const { f1Seeder } = require('../data-formatting/seeder-functions');

// const artist = '137-us'
const artist = 'System-of-a-Down'
//? finding artist by ID
// const url = `https://api.genius.com/artists/${id}/songs?per_page=10`;
//? allowing for search by artist
const url = `https://api.genius.com/search?per_page=1/`;
// const fltr = '/search?per_page=10&page=';

// const searchUrl = `${url}${artist}`
const searchUrl = `${url}`


const geniusFetcher = () => {
    axios.get(searchUrl, {
        headers: { 'Authorization': `Bearer ${geniusClientToken}` },
        data: { 'q': artist }
    })
    .then(res => {
        // const primaryArtistObj = res.data.response.hits[0].result.primary_artist;
        const artistSongsArr = res.data.response.hits

        lyricsScraper(artistSongsArr)
    })
    .catch(err => {
        console.error(`A wild error appeared: ${err}`)
    })
}


const lyricsScraper = (artistSongsArr) => {
    artistSongsArr.forEach(song => {
        axios.get(`${song.result.url}`)
            .then(res => {
                const $ = cheerio.load(res.data);
                const html = pretty($.html());

                const namesMeta = $('meta[property=og:title]').attr().content;
                const producerDiv = $('.HeaderMetadata__Section-sc-1p42fnf-2').find('a');
                const bodyDiv = $('.Lyrics__Container-sc-1ynbvzw-8').each((idx, div) => $(div));
                const mediaIFrame = $('.MusicVideo__Container-sc-1980jex-0').find('iFrame');
                const pyongsSpan = $('.LabelWithIcon__Label-sc-1ri57wg-1').get(3).children[0].data;
                const coverArtMeta = $('meta[property=og:image]').attr('content');
            
                //? new Date().getTime() shows toString() to be as performant as interpolation
                f1Seeder(`${pyongsSpan}`);
            })
            .catch(err => {
                console.log(`End of the line error: ${err}`);
            })
    });
}




geniusFetcher();



// module.exports = geniusScraper();
