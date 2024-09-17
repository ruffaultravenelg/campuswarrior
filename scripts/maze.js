///////////////////
//// DRAW MAZE ////
///////////////////
let mazeRows;
let startPosition;
let endPosition;
let characterPosition;
let maze_container;
const character = document.createElement('div');
character.id = 'character';

export function drawMaze(container, maze) {
    // Set container
    maze_container = container;

    // Clean container
    container.innerHTML = '';

    // Remove extra spaces in the maze string
    const cleanedMazeString = maze.trim();

    // Convert the string into an array of rows
    mazeRows = cleanedMazeString.split('\n');

    container.style.gridTemplateColumns = `repeat(${mazeRows[0].length}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${mazeRows.length}, 1fr)`;

    // Generate the maze cells
    mazeRows.forEach((row, rowIndex) => {
        Array.from(row).forEach((cellChar, colIndex) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Apply the appropriate class
            if (cellChar === 'x') {
                cell.classList.add('wall');
            } else if (cellChar === 'D') {
                cell.classList.add('start');
                startPosition = { x: colIndex, y: rowIndex };
            } else if (cellChar === 'A') {
                cell.classList.add('end');
                endPosition = { x: colIndex, y: rowIndex };
            } else {
                cell.classList.add('path');
            }

            // Add the cell to the maze
            container.appendChild(cell);
        });
    });

    // Check if a start position was found
    if (startPosition) {
        // Initial position of the character
        characterPosition = startPosition;
    } else {
        // Default to (1, 1) if no start cell was specified
        characterPosition = { x: 1, y: 1 };
    }

    // Add the character to the maze
    container.appendChild(character);

    // Initialize the character's position
    updateCharacterPosition(container);
}

/////////////////////
///// CHARACTER /////
/////////////////////
// Initial position of the character
characterPosition = { x: 1, y: 1 };

// Function to update the character's position
async function updateCharacterPosition(container) {
    const cellWidth = container.offsetWidth / mazeRows[0].length;
    const cellHeight = container.offsetHeight / mazeRows.length;

    character.style.left = `${characterPosition.x * cellWidth}px`;
    character.style.top = `${characterPosition.y * cellHeight}px`;

    await delay(500);
}

// Functions to move the character
export async function teleport(x, y) {
    characterPosition = { x, y };
    await updateCharacterPosition(maze_container);
}

export async function left() {
    if (mazeRows[characterPosition.y][characterPosition.x - 1] !== 'x') {
        characterPosition.x -= 1;
        await updateCharacterPosition(maze_container);
    }
}

export async function right() {
    if (mazeRows[characterPosition.y][characterPosition.x + 1] !== 'x') {
        characterPosition.x += 1;
        await updateCharacterPosition(maze_container);
    }
}

export async function up() {
    if (mazeRows[characterPosition.y - 1][characterPosition.x] !== 'x') {
        characterPosition.y -= 1;
        await updateCharacterPosition(maze_container);
    }
}

export async function down() {
    if (mazeRows[characterPosition.y + 1][characterPosition.x] !== 'x') {
        characterPosition.y += 1;
        await updateCharacterPosition(maze_container);
    }
}

//////////////////////////
///// RESET CHARACTER ////
//////////////////////////
export async function resetCharacterPosition() {
    await teleport(startPosition.x, startPosition.y);
}

//////////////////////
//// DELAY HELPER ////
//////////////////////
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
