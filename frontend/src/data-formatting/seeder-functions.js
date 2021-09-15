const fs = require('fs');
// file seeder write route: '../../../backend/db/seeders/file-name'
// final parameters: metaTitleStr, producer, lyricsDivStr, media, visits, coverArt
// js Seeding template: `const obj = \`{${body}}\``
// dbEntry template: const dbEntry = `{${artist},${title},${producer},${body},${media},${visits},${coverArt}},`
const f1Seeder = (lyricsDivStr) => {

    // //? artist & title
    // const artistAndTitleArray = producerStr.replace('&nbsp;', '\u0020').split(' \u2013 ');
    // const artist = artistAndTitleArray[0];
    // const title = artistAndTitleArray[1];

    //? body
    const brTagRegex = /<br>/g
    const strayTagsRegex = /(<(?:a|span|div|\/|).*?>)|(.*?)/g
    const body = lyricsDivStr.replace(brTagRegex, '\n').replace(strayTagsRegex, '$2');

    //? producer


    fs.writeFile('./scraped-info.js', body, err => {
        if (err) {
            console.error(`A wild error has appeared in the bushes: ${err}`);
        } else {
            console.log('Successful scrape!');
        }
    })
}

module.exports = { f1Seeder };
