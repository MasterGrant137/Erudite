const fs = require('fs');

const f1Seeder = (lyrics) => {

    // const lineTerminatorRegex = /([a-z])([^\s])([']?[A-Z])/g
    // const formattedLyrics = lyrics.replace(lineTerminatorRegex, '$1$2\n$3')
    // const matchingSubstring = lyrics.match(lineTerminatorRegex);
    // if (matchingSubstring) {
    //     console.log(matchingSubstring);
    // }

    // console.log(formattedLyrics);

    //file seeder write route: '../../../backend/db/seeders/file-name'


    console.log(lyrics);
    // fs.writeFile('./scraped-info.txt', `${lyrics}`, err => {
    //     if (err) {
    //         console.error(`A wild error has appeared in the bushes: ${err}`);
    //     } else {
    //         console.log('Successful scrape!');
    //     }
    // })
}

module.exports = { f1Seeder };
