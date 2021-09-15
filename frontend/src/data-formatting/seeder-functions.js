const fs = require('fs');
// file seeder write route: '../../../backend/db/seeders/file-name'
// final parameters: metaTitleStr, producer, lyricsDivStr, media, visits, coverArt, backgroundArt
// js Seeding template: `const obj = \`{${body}}\``
const f1Seeder = (metaTitleStr) => {

    //? artist & title
    const artistAndTitleRegex = /(<title>)(.*?)(\sLyrics \| Genius Lyrics)(<\/title>)/g
    const artistAndTitleArray = metaTitleStr.replace(artistAndTitleRegex, '$2').split(' \u2013 ');
    const artist = artistAndTitleArray[0].replace('&nbsp;', '\u0020');
    const title = artistAndTitleArray[1];

    console.log(artist, title);

    //? body
    // const divTag = /<div.*?>|<\/div>/g
    // const brTagRegex = /<br>/g
    // const body = lyricsDivStr.replace(divTag, '').replace(brTagRegex, '\n');

    // const dbEntry = `{${artist},${title},${producer},${body},${media},${visits},${coverArt},${backgroundArt}},`

    // fs.writeFile('./scraped-info.js', artistAndTitleArray, err => {
    //     if (err) {
    //         console.error(`A wild error has appeared in the bushes: ${err}`);
    //     } else {
    //         console.log('Successful scrape!');
    //     }
    // })
}

module.exports = { f1Seeder };
