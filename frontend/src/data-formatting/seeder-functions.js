const fs = require('fs');

const songSeeds = [];



// namesMetaStr, producerDivStr, bodyDivStr, media, visits, coverArt

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
    let producer; if (producerDivStr) producer = producerDivStr.replace(lastAnchor, '').replace(closedAnchor, pipe).replace(strayTagsRegex2, '$4');

    //? body
    let body; if (bodyDivStr) body = bodyDivStr.replace(brDivRegex, '\n').replace(amp, ampersand).replace(nbsp, space).replace(strayTagsRegex1, '$2');

    //$ media, visits, & cover art = raw

    songSeeds.push(`{userID: ${1}, artist: "${artist}", title: "${title}", producer: "${producer ? pipe + producer : ''}", body: \`${body}\`, media: \`${media}\`, visits: ${visits}, coverArt: "${coverArt}", createdAt: new Date(), updatedAt: new Date()}`)

    fs.writeFile('./song-seeds.js', `const songSeedsArray = [${songSeeds}]${'\n\n'}module.exports = { songSeedsArray };`, err => {
        if (err) {
            console.error(`A wild error has appeared in the bushes: ${err}`);
        } else {
            console.log('Successful scrape!');
        }
    })

    //? for testing
    // fs.writeFile('./song-seeds.js', `${producer}`, err => {
    //     if (err) {
    //         console.error(`A wild error has appeared in the bushes: ${err}`);
    //     } else {
    //         console.log('Successful scrape!');
    //     }
    // })
}

module.exports = { songSeeder };
