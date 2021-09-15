const fs = require('fs');
//file seeder write route: '../../../backend/db/seeders/file-name'
// final parameters: titleTagStr, producer, lyricsDivStr, media, visits, coverArt, backgroundArt
const f1Seeder = (titleTag) => {

    //? title
    const 

    //? body
    // const openDivRegex = /<div.*?>/g
    // const closeDivRegex = /<\/div>/g
    // const brTagRegex = /<br>/g
    // const body = body.replace(openDivRegex, '').replace(closeDivRegex, '').replace(brTagRegex, '\n');

    // console.log(songInfo);

    // const dbEntry = `{${artist},${title},${producer},${body},${media},${visits},${coverArt},${backgroundArt}},`

    //* change back to formattedLyrics after testing!
    fs.writeFile('./scraped-info.txt', dbEntry, err => {
        if (err) {
            console.error(`A wild error has appeared in the bushes: ${err}`);
        } else {
            console.log('Successful scrape!');
        }
    })
}

module.exports = { f1Seeder };
