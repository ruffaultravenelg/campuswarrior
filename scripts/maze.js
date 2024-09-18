/////////////////
//// IMPORTS ////
/////////////////
import { delay } from "./util.js";

///////////////////////////////////
//// MAZE DRAWING AND MOVEMENT ////
///////////////////////////////////

let mazeRows;
let startPosition;
let endPosition;
let characterPosition;
let maze_container;
const bumpForce = 8;

// Create the character element
const character = document.createElement('div');
character.className = 'character';

/**
 * Draws the maze inside the provided container and initializes the character's position.
 * @param {HTMLElement} container - The container to render the maze.
 * @param {string} maze - The string representation of the maze layout.
 */
export function drawMaze(container, maze) {
    // Set the container reference
    maze_container = container;

    // Set default start position
    startPosition = { x: 1, y: 1 };

    // Clean the container before rendering
    container.innerHTML = '';

    // Clean up any extra spaces from the maze string and convert it to rows
    const cleanedMazeString = maze.trim();
    mazeRows = cleanedMazeString.split('\n');

    // Set grid layout based on the maze dimensions
    container.style.gridTemplateColumns = `repeat(${mazeRows[0].length}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${mazeRows.length}, 1fr)`;

    // Generate maze cells based on the string representation
    mazeRows.forEach((row, rowIndex) => {
        Array.from(row).forEach((cellChar, colIndex) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Apply class based on the character in the maze string
            switch (cellChar) {
                case 'x':
                    cell.classList.add('wall');
                    break;
                case 'D':
                    cell.classList.add('start');
                    startPosition = { x: colIndex, y: rowIndex };
                    break;
                case 'A':
                    cell.classList.add('end');
                    endPosition = { x: colIndex, y: rowIndex };
                    break;
                default:
                    cell.classList.add('path');
                    break;
            }

            // Append the cell to the container
            container.appendChild(cell);
        });
    });

    // Set the character's initial position, default to (1, 1) if no start position
    characterPosition = startPosition;

    // Add the character to the maze and update its position
    container.appendChild(character);
    updateCharacterPosition(container);
}

/////////////////////////////
///// CHARACTER CONTROL /////
/////////////////////////////

/**
 * Updates the character's position on the grid based on current coordinates.
 * @param {HTMLElement} container - The container holding the maze.
 */
async function updateCharacterPosition(container) {
    
    // Get cells size
    const cellWidth = container.offsetWidth / mazeRows[0].length;
    const cellHeight = container.offsetHeight / mazeRows.length;

    // Update position
    character.style.left = `${characterPosition.x * cellWidth}px`;
    character.style.top = `${characterPosition.y * cellHeight}px`;

    // Update character size
    character.style.width = `${cellWidth}px`;
    character.style.height = `${cellHeight}px`;

    // Wait for animation
    await delay(500);
}

/**
 * Animate the character to a specific (x, y) offset, used for bumping into walls.
 * @param {number} x - The x offset to move to.
 * @param {number} y - The y offset to move to.
 */
export async function bump(x, y) {
    character.style.transform = `translate(${x}px, ${y}px)`; 
    await delay(250)
    character.style.transform = '';
    await delay(250)
}

/**
 * Teleports the character to a specific (x, y) position.
 * @param {number} x - The x-coordinate to move to.
 * @param {number} y - The y-coordinate to move to.
 */
export async function teleport(x, y) {
    characterPosition = { x, y };
    await updateCharacterPosition(maze_container);
}

/**
 * Moves the character one step to the left.
 */
export async function left() {
    if (mazeRows[characterPosition.y][characterPosition.x - 1] !== 'x') {
        characterPosition.x -= 1;
        await updateCharacterPosition(maze_container);
    } else {
        await bump(-bumpForce, 0);
    }
}

/**
 * Moves the character one step to the right.
 */
export async function right() {
    if (mazeRows[characterPosition.y][characterPosition.x + 1] !== 'x') {
        characterPosition.x += 1;
        await updateCharacterPosition(maze_container);
    } else {
        await bump(bumpForce, 0);
    }
}

/**
 * Moves the character one step up.
 */
export async function up() {
    if (mazeRows[characterPosition.y - 1][characterPosition.x] !== 'x') {
        characterPosition.y -= 1;
        await updateCharacterPosition(maze_container);
    } else {
        await bump(0, -bumpForce);
    }
}

/**
 * Moves the character one step down.
 */
export async function down() {
    if (mazeRows[characterPosition.y + 1][characterPosition.x] !== 'x') {
        characterPosition.y += 1;
        await updateCharacterPosition(maze_container);
    } else {
        await bump(0, bumpForce);
    }
}

//////////////////////////////////
//// RESET CHARACTER POSITION ////
//////////////////////////////////

/**
 * Resets the character back to the starting position.
 */
export async function resetCharacterPosition() {
    await teleport(startPosition.x, startPosition.y);
}