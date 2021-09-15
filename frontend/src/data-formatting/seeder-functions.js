const fs = require('fs');

const f1Seeder = (lyrics) => {

    // const brRegex = /<div.*?>|<\/div>|<br>/g
    const openDivRegex = /<div.*?>/g
    const closeDivRegex = /<\/div>/g
    const brTagRegex = /<br>/g

    const formattedLyrics = lyrics.replace(openDivRegex, '').replace(closeDivRegex, '').replace(brTagRegex, '\n');
    //file seeder write route: '../../../backend/db/seeders/file-name'

    // console.log(lyrics);
    fs.writeFile('./scraped-info.txt', formattedLyrics, err => {
        if (err) {
            console.error(`A wild error has appeared in the bushes: ${err}`);
        } else {
            console.log('Successful scrape!');
            console.log(new Date().getTime());
        }
    })
}

module.exports = { f1Seeder };
