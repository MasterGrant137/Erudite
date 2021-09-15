const fs = require('fs');

const f1Seeder = (lyrics) => {

    // const lineTerminatorRegex = /(\W|—)?[^\s][A-Z]/g
    // const lineTerminatorRegex = /[^\s][A-Z]/g
    const lineTerminatorRegex = /([a-z])([^\s])([']?[A-Z])/g
    const formattedLyrics = lyrics.replace(lineTerminatorRegex, '$1$2\n$3')
    // const matchingSubstring = lyrics.match(lineTerminatorRegex);
    // if (matchingSubstring) {
    //     console.log(matchingSubstring);
    // }

    console.log(formattedLyrics);

    // fs.writeFile('../../../backend/scraped-info.txt', `${lyrics}`, err => {
    //     if (err) {
    //         console.error(`A wild error has appeared in the bushes: ${err}`);
    //     } else {
    //         console.log('Successful scrape!');
    //     }
    // })
}

module.exports = { f1Seeder };
