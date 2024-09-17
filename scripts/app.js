/////////////////
//// IMPORTS ////
/////////////////
import { drawMaze, resetCharacterPosition } from "./maze.js";
import { parseAST } from "./parser.js";
import { execute } from "./interpreter.js";

/////////////////////////////////////
//// MODIFY BEHAVIOR OF TEXTAREA ////
/////////////////////////////////////

const codeInput = document.getElementById('code-input');

/**
 * Enhances the behavior of the textarea to support tabs and auto-indentation.
 */
codeInput.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Insert a tab character at the current cursor position
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

        // Move the cursor to the correct position after inserting the tab
        this.selectionStart = this.selectionEnd = start + 1;
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const start = this.selectionStart;

        // Find the position of the start of the current line
        const currentLineStart = this.value.lastIndexOf('\n', start - 1) + 1;

        // Extract the text of the current line up to the cursor
        const currentLineText = this.value.substring(currentLineStart, start);

        // Get the indentation (spaces or tabs) of the current line
        const indentation = currentLineText.match(/^\s*/)[0];

        // Insert a new line with the same indentation
        this.value = this.value.substring(0, start) + "\n" + indentation + this.value.substring(start);

        // Move the cursor to the correct position after the new line and indentation
        this.selectionStart = this.selectionEnd = start + 1 + indentation.length;
    }
});

///////////////////
//// DRAW MAZE ////
///////////////////

const mazeContainer = document.getElementById('maze-container');
const defaultMazeString = `
xxxxxxxx
x   Dx A
x  xxx x
x  x   x
x  x  xx
x  x  xx
x     xx
xxxxxxxx
`;

/**
 * Draw the default maze in the maze container.
 */
drawMaze(mazeContainer, defaultMazeString);

//////////////////////
//// EXECUTE CODE ////
//////////////////////

/**
 * Adds functionality to the "Run" button to execute the code input.
 */
document.getElementById('run-button').addEventListener('click', async () => {

    // Disable the code input textarea during execution
    codeInput.disabled = true;

    // Reset the character to the start position
    await resetCharacterPosition();

    // Get the code input from the textarea
    const code = codeInput.value;

    // Parse the input code into an Abstract Syntax Tree (AST)
    const ast = parseAST(code);

    // Execute the parsed AST
    await execute(ast);

    // Re-enable the code input after execution
    codeInput.disabled = false;
});
