// Variables
const instructions = document.getElementById('code-editor-debug-instructions');
var lines_nodes = [];
const highlightedClassName = 'highlighted';

/**
 * Create the lines in the "instructions" div for the debugger.
 * @param {Array} lines - The lines.
 */
export function initDebugger(lines){

    // Remove each node
    instructions.innerHTML = '';
    lines_nodes = [];

    // Create each nodes
    lines.forEach(line => {
        
        const p = document.createElement('p');
        p.textContent = '\u00a0\u00a0\u00a0'.repeat(line.indentation) + line.line;
        lines_nodes.push(p);
        instructions.appendChild(p);

    });

}

/**
 * Create the lines in the "instructions" div for the debugger.
 * @param {Array} lines - The lines.
 */
export function debuggerJump(lineNumber){
    
    // Set all nodes class
    for (let i = 0; i < lines_nodes.length; i++) {
        const node = lines_nodes[i];
        
        if (i === lineNumber)
            node.className = highlightedClassName;
        else
            node.className = '';

    }

}