const C = 400;
const K = 32;

function calcElo(aRating: number, bRating: number, winnerMultiplier: number){
    const aExpectedScore = 1 / (1 + Math.pow(10, (bRating - aRating) / C))
    const bExpectedScore = 1 / (1 + Math.pow(10, (aRating - bRating) / C))

    const newARating = aRating + K * (winnerMultiplier - aExpectedScore);
    const newBRating = bRating + K * ((1 - winnerMultiplier) - bExpectedScore);

    return [Math.round(newARating),Math.round(newBRating)]
}

/* 
    Calculate a factor that is inversally proportional of the amount of matches played by a player
*/
function calcKFactor(playedMatches: number): number {
    if(playedMatches < 10) {
        return 32
    } else if(playedMatches > 10 && playedMatches < 40) {
        return 32
    } else{
        return 32
    }
}


export {
    calcElo
}