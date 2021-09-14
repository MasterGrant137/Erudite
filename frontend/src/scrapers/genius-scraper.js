const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const pretty = require('pretty');
const { geniusClientToken } = require('./genius-auth.json');

const artist = '137-us'
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
                //! const html = pretty($.html());
                //! const title = $('h1').get(0).children[0].data

                // const lyrics = $('body').children().find('div').each((idx, div) => {
                //    $(div).attribs
                // })
                // const lyrics = $('div').each((idx, ele) => {
                //    $(ele)
                // })
                const lyricsDiv = $('.Lyrics__Container-sc-1ynbvzw-8').text()

                console.log(lyricsDiv);
                // fs.writeFile('./scraped-info.txt', pretty(`${lyricsDiv}`), err => {
                //     if (err) {
                //         console.error(`A wild error has appeared in the bushes: ${err}`);
                //     } else {
                //         console.log('Successful scrape!');
                //     }
                // })
            })
            .catch(err => {
                console.log(`End of the line error: ${err}`);
            })
    });
}




geniusFetcher();



// module.exports = geniusScraper();
