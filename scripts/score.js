////////////////
//// IMPORT ////
////////////////
import { parseLines } from "./parser.js";
import { getMazePathLength } from "./maze.js";

/**
 * Calculate the score made by a code
 * @param {String} code - The code.
 */
function calculateScore(code){

    // Parse lines
    const lines = parseLines(code);

    // Max score
    const maxScore = getMazePathLength();

    // Calculate score
    return Math.max(maxScore - lines.length , 0);

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