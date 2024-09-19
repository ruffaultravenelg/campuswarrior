////////////////
//// IMPORT ////
////////////////
import { parseLines } from "./parser.js";
//import { getMazePathLength } from "./maze.js";

/**
 * Calculate the score made by a code
 * @param {String} code - The code.
 */
function calculateScore(code){

    // Parse lines
    const linesCount = parseLines(code).length;

    // Max score
    //const maxScore = getMazePathLength();

    // Calculate score
    if (linesCount <= 8) return 10;
    if (linesCount > 8 && linesCount <= 11) return 5;
    return 0;

}

/**
 * Calculate the time won by the team
 * @param {String} code - The code.
 */
export function calculateTimeWon(code){

    // Calculate score
    const score = calculateScore(code);

    // Convert score into time
    return score;

}