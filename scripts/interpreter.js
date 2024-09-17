// Imports for movement functions
import { right, left, up, down } from "./maze.js";

/**
 * Main function to execute the provided code.
 * @param {Array} code - Array of parsed instructions (AST).
 */
export async function execute(code) {
    await executeScope(code);
}

/**
 * Executes a list of instructions within the current scope.
 * @param {Array} instructions - Array of instructions to execute.
 */
async function executeScope(instructions) {
    for (let i = 0; i < instructions.length; i++) {
        await executeInstruction(instructions[i]);
    }
}

/**
 * Executes a single instruction based on its type.
 * @param {Object} instruction - The instruction object containing type and details.
 */
async function executeInstruction(instruction) {
    switch (instruction.type) {
        case 'function':
            await executeFunction(instruction);
            break;
    
        case 'repeat':
            await executeRepeat(instruction);
            break;

        default:
            throw new Error(`Unknown instruction type "${instruction.type}".`);
    }
}

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

/**
 * Executes a repeat block.
 * @param {Object} instruction - The loop instruction object.
 */
async function executeRepeat(instruction) {
    for (let i = 0; i < instruction.times; i++) {
        await executeScope(instruction.body);
    }
}
