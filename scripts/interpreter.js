/////////////////
// IMPORTS    //
/////////////////
import { right, left, up, down } from "./maze.js";

/////////////////
// EXECUTE    //
/////////////////
/**
 * Main function to execute the provided code.
 * @param {Array} code - Array of parsed instructions (AST).
 */
export async function execute(code) {
    await executeScope(code);
}

///////////////////////
// EXECUTE SCOPE    //
///////////////////////
/**
 * Executes a list of instructions within the current scope.
 * @param {Array} instructions - Array of instructions to execute.
 */
async function executeScope(instructions) {
    for (let i = 0; i < instructions.length; i++) {
        await executeInstruction(instructions[i]);
    }
}

/////////////////////////////
// EXECUTE INSTRUCTION    //
/////////////////////////////
/**
 * Executes a single instruction based on its type.
 * @param {Object} instruction - The instruction object containing type and details.
 */
async function executeInstruction(instruction) {
    switch (instruction.type) {
        case 'function':
            await executeFunction(instruction);
            break;
    
        case 'loop':
            await executeLoop(instruction);
            break;

        default:
            throw new Error(`Unknown instruction type "${instruction.type}".`);
    }
}

//////////////////////////
// EXECUTE FUNCTION    //
//////////////////////////
/**
 * Executes a movement function based on the instruction name.
 * @param {Object} instruction - The function instruction object.
 */
async function executeFunction(instruction) {
    switch (instruction.name) {
        case 'left':
            await left();
            break;
        case 'right':
            await right();
            break;
        case 'up':
            await up();
            break;
        case 'down':
            await down();
            break;
        default:
            throw new Error(`Unknown function "${instruction.name}".`);
    }
}

//////////////////////
// EXECUTE LOOP    //
//////////////////////
/**
 * Executes a loop instruction a specified number of times.
 * @param {Object} instruction - The loop instruction object.
 */
async function executeLoop(instruction) {
    for (let i = 0; i < instruction.times; i++) {
        await executeScope(instruction.body);
    }
}
