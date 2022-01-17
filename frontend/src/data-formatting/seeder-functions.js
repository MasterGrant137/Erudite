const fs = require('fs');

const songSeedsSet = new Set();

const songSeeder = (namesMetaStr, producerDivStr, bodyDivStr, media, visitsNum, coverArt) => {
    //? regex tier 1
    const nbsp = /&nbsp;/g
    const amp = /&amp;/g
    const closedAnchor = /<\/a>/g
    const space = '\u0020'
    const ampersand = '\u0026'
    const enDash = '\u2013'
    const pipe = '\u007C'

    //? regex tier 2
    const lastAnchorRegex = /(<\/span><\/a>)/g
    const decPlaceFinderRegex = /^(\d)(.*?)(\.?)(.*?)(K)$/g
    const strippedDecFinder = /^\dK$/g
    const brDivRegex = /<br>|<(\/)?div>/g
    const strayTagsRegex1 = /(<(?:a|span|\/|).*?>)|(.*?)/g
    const strayTagsRegex2 = /(<(?:a|span|\/|).*?>)|(View All Credits)|(&nbsp;)|(.*?)/g

    // //? artist & title
    const artistAndTitleArray = namesMetaStr.replace(nbsp, space).split(`${space}${enDash}${space}`);
    const artist = artistAndTitleArray[0];
    const title = artistAndTitleArray[1];

    //? producer
    const producer = producerDivStr.replace(lastAnchorRegex, '$1000').replace(closedAnchor, pipe).replace(strayTagsRegex2, '$4');

    //? body
    const body = bodyDivStr.replace(brDivRegex, '\n').replace(amp, ampersand).replace(nbsp, space).replace(strayTagsRegex1, '$2');

    //? visits
    const visits = visitsNum.replace(strippedDecFinder, '').replace(decPlaceFinderRegex, '$1$2$400')

    //$ media, & cover art = raw

    //? user
    const max = 4;
    const min = 1;
    const userID = Math.floor(Math.random() * (max - min) + min);

    songSeedsSet.add(`{userID: ${userID}, artist: "${artist}", title: "${title}", producer: "${producer ? pipe + producer : ''}", body: \`${body}\`, media: \`${media}\`, visits: ${visits}, coverArt: "${coverArt}", createdAt: new Date(), updatedAt: new Date()}`);

    fs.writeFile('./song-seeds.js', `const songSeedsArray = [${Array.from(songSeedsSet)}]${'\n\n'}module.exports = { songSeedsArray };`, err => {
        if (err) {
            console.error(`A wild error has appeared in the bushes: ${err}`);
        } else {
            console.log(`Successful scrape! Count: ${songSeedsSet.size}` );
        }
    })
}

module.exports = { songSeeder };
