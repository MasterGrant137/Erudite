const fs = require('fs');
// file seeder write route: '../../../backend/db/seeders/file-name'
// final parameters: namesMetaStr, producerDivStr, bodyDivStr, mediaIFrameStr, visitsNum, coverArtMetaStr
// js Seeding template: `const obj = \`{${body}}\``
// dbEntry template: const dbEntry = `{${artist},${title},${producer},${body},${media},${visits},${coverArt}},`
const f1Seeder = (visitsNum) => {
    //? regex tier 1
    const nbsp = /&nbsp;/g
    const amp = /&amp;/g
    const closedAnchor = /<\/a>/g
    const space = '\u0020'
    const ampersand = '\u0026'
    const enDash = '\u2013'
    const pipe = '\u007C'

    //? regex tier 2
    const lastAnchor = /(<\/span><\/a>)/g
    const brDivRegex = /<br>|<(\/)?div>/g
    const strayTagsRegex1 = /(<(?:a|span|\/|).*?>)|(.*?)/g
    const strayTagsRegex2 = /(<(?:a|span|\/|).*?>)|(View All Credits)|(&nbsp;)|(.*?)/g

    // //? artist & title
    // const artistAndTitleArray = namesMetaStr.replace(nbsp, space).split(`${space}${enDash}${space}`);
    // const artist = artistAndTitleArray[0];
    // const title = artistAndTitleArray[1];

    //? producer
    // const producer = producerDivStr.replace(lastAnchor, '').replace(closedAnchor, pipe).replace(anchorTxtRegex, '$4');

    //? body
    // const body = bodyDivStr.replace(brDivRegex, '\n').replace(amp, ampersand).replace(strayTagsRegex1, '$2');

    //? visits = raw

    //? media & cover art = raw

console.log(visitsNum);
    fs.writeFile('./scraped-info.js', visitsNum, err => {
        if (err) {
            console.error(`A wild error has appeared in the bushes: ${err}`);
        } else {
            console.log('Successful scrape!');
        }
    })
}

module.exports = { f1Seeder };
