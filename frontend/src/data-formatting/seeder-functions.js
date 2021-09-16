const fs = require('fs');

const songSeeds = [];



// file seeder write route: '../../../backend/db/seeders/file-name'

const songSeeder = (namesMetaStr, producerDivStr, bodyDivStr, media, visits, coverArt) => {
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
    const artistAndTitleArray = namesMetaStr.replace(nbsp, space).split(`${space}${enDash}${space}`);
    const artist = artistAndTitleArray[0];
    const title = artistAndTitleArray[1];

    //? producer
    const producer = producerDivStr.replace(lastAnchor, '').replace(closedAnchor, pipe).replace(strayTagsRegex2, '$4');

    //? body
    const body = bodyDivStr.replace(brDivRegex, '\n').replace(amp, ampersand).replace(strayTagsRegex1, '$2');

    //$ media, visits, & cover art = raw

    songSeeds.push(`{userID: ${1}, artist: "${artist}", title: "${title}", producer: "|${producer}", body: \`${body}\`, media: \`${media}\`, visits: ${visits}, coverArt: "${coverArt}", createdAt: new Date(), updatedAt: new Date()}`)

    fs.writeFile('./song-seeds.js', `const songSeedsArray = [${songSeeds}]${'\n\n'}module.exports = { songSeedsArray };`, err => {
        if (err) {
            console.error(`A wild error has appeared in the bushes: ${err}`);
        } else {
            console.log('Successful scrape!');
        }
    })
}

module.exports = { songSeeder };
