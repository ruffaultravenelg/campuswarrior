/////////////////
// IMPORTS    //
/////////////////
import { drawMaze, resetCharacterPosition } from "./maze.js";
import { parseAST } from "./parser.js";
import { execute } from "./interpreter.js";

////////////////////////////////////////
// MODIFY BEHAVIOR OF TEXTAREA        //
////////////////////////////////////////
const codeInput = document.getElementById('code-input');

codeInput.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Insert a tab character at the current cursor position
        this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);

        // Move the cursor to the correct position after the tab
        this.selectionStart = this.selectionEnd = start + 1;
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const start = this.selectionStart;

        // Find the position of the start of the current line
        const currentLineStart = this.value.lastIndexOf('\n', start - 1) + 1;
        
        // Get the part of the current line before the cursor
        const currentLineText = this.value.substring(currentLineStart, start);
        
        // Determine the indentation of the current line
        const indentation = currentLineText.match(/^\s*/)[0];
        
        // Insert a new line with the same indentation
        this.value = this.value.substring(0, start) +
            "\n" + indentation + this.value.substring(start);
        
        // Move the cursor to the correct position after the indentation
        this.selectionStart = this.selectionEnd = start + 1 + indentation.length;
    }
});

/////////////////
// DRAW MAZE   //
/////////////////
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

// Draw the default maze
drawMaze(mazeContainer, defaultMazeString);

//////////////////////
// EXECUTE CODE     //
//////////////////////
document.getElementById('run-button').addEventListener('click', async () => {

    // Disable the code input textarea
    codeInput.disabled = true;

    // Reset character position
    await resetCharacterPosition();

    // Get the code from the textarea
    const code = codeInput.value;
    
    // Parse the code into an AST (Abstract Syntax Tree)
    const ast = parseAST(code);

    // Execute the AST
    await execute(ast);

    // Re-enable code editing
    codeInput.disabled = false;
});
