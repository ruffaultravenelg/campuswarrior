/**
 * Parses the code into an array of lines with indentation and line number.
 * @param {string} code - The input code to parse.
 * @returns {Array} Parsed lines with indentation, trimmed content, and line number.
 */
export function parseLines(code) {
    const lines = code.trim().split('\n');
    const result = [];

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine === "") return; // Skip empty lines

        const indentation = line.match(/^\t*/)[0].length; // Use tabs to calculate indentation
        result.push({ indentation, line: trimmedLine, lineNumber: index + 1 }); // Add line number
    });

    return result;
}

/**
 * Converts code into an Abstract Syntax Tree (AST) based on indentation.
 * @param {Array} lines - The lines objects to parse into an AST.
 * @returns {Array} The generated AST structure.
 */
export function parseAST(lines) {
    const ast = [];
    const stack = [{ indentation: -1, block: ast }]; // Initialize the stack with the root block (AST)

    lines.forEach(({ indentation, line, lineNumber }) => {
        
        // Pop nested blocks when indentation decreases
        while (stack.length > 1 && indentation <= stack[stack.length - 1].indentation) {
            stack.pop();
        }

        // Get current block
        const currentBlock = stack[stack.length - 1].block; // Get the current block from the stack

        // Handle `repeat` instruction
        if (line.startsWith('repeat')) {
            const repeatMatch = line.match(/^repeat (\d+):/);
            if (repeatMatch) {
                console.log('a');
                
                const repeatCount = parseInt(repeatMatch[1], 10);
                const repeatNode = { lineNumber, type: "repeat", times: repeatCount, body: [] }; // Add line number to node
                currentBlock.push(repeatNode);
                stack.push({ indentation:indentation, block: repeatNode.body }); // Push the body of the repeat onto the stack
            }
        } else {
            // Handle function calls
            const funcMatch = line.match(/^(\w+)\(\)$/);
            if (funcMatch) {
                const funcName = funcMatch[1];
                currentBlock.push({ lineNumber, type: "function", name: funcName }); // Add line number to function node
            }
        }

    });

    return ast;
}
