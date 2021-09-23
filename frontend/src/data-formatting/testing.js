const visitsNum = '6.0K'


const decPlaceFinderRegex = /^(\d)(.*?)(\.)(.*?)(K)$/g
const strippedDecFinder = /^\dK$/g
const visits = visitsNum.replace(strippedDecFinder, '').replace(decPlaceFinderRegex, '$1$2$400')

console.log(visits);
