const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const { geniusClientToken } = require('./genius-auth.json');
const curatedArtistArray = require('./curated-artist-array.json');
const { songSeeder } = require('../data-formatting/seeder-functions');

const depth = 10;

//? finding artist by artistID
// const searchUrl = `https://api.genius.com/artists/${id}/songs?per_page=10`;

//? allows for search by artist
const searchUrl = `https://api.genius.com/search?per_page=${depth}/`;


const geniusFetcher = () => {
    curatedArtistArray.forEach(artist => {
        axios.get(searchUrl, {
            headers: { 'Authorization': `Bearer ${geniusClientToken}` },
            data: { 'q': artist }
        })
        .then(res => {
            const artistSongsArr = res.data.response.hits
            lyricsScraper(artistSongsArr)
        })
        .catch(err => {
            console.error(`A wild error appeared: ${err}`)
        })
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
                const pyongsSpan = $('.LabelWithIcon__Label-sc-1ri57wg-1').last().text();
                const coverArtMeta = $('meta[property=og:image]').attr('content');

                songSeeder(`${namesMeta}`, `${producerDiv}`, `${bodyDiv}`, `${mediaIFrame}`, `${pyongsSpan}`, `${coverArtMeta}`);
            })
            .catch(err => {
                console.log(`End of the line error: ${err}`);
            })
    }, );
}


geniusFetcher();
