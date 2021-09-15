const fs = require('fs');
// file seeder write route: '../../../backend/db/seeders/file-name'
// final parameters: metaTitleStr, producer, lyricsDivStr, media, visits, coverArt
// js Seeding template: `const obj = \`{${body}}\``
// dbEntry template: const dbEntry = `{${artist},${title},${producer},${body},${media},${visits},${coverArt}},`
const f1Seeder = (producerStr) => {
    //? regex tier 1
    const nbsp = /&nbsp;/g
    const ampersand = /&amp;/g
    const space = /\u0020/
    const enDash= /\u2013/

    //? regex tier 2
    const brDivRegex = /<br>|<(\/)?div>/g
    const strayTagsRegex = /(<(?:a|span|\/|).*?>)|(.*?)/g

    // //? artist & title
    // const artistAndTitleArray = producerStr.replace(nbsp, space).split(`${space}${enDash}${space}`);
    // const artist = artistAndTitleArray[0];
    // const title = artistAndTitleArray[1];

    //? body
    // const body = lyricsDivStr.replace(brDivRegex, '\n').replace(ampersand, '\u0026').replace(strayTagsRegex, '$2');

    //? producer
    const producer = producerStr.replace(nbsp, space).replace(strayTagsRegex, '$1$2\u0020$3')

// console.log(producer);
    fs.writeFile('./scraped-info.js', producer, err => {
        if (err) {
            console.error(`A wild error has appeared in the bushes: ${err}`);
        } else {
            console.log('Successful scrape!');
        }
    })
}

module.exports = { f1Seeder };
