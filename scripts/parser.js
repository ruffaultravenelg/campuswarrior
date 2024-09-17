/**
 * Parses the code into an array of lines with indentation and line number.
 * @param {string} code - The input code to parse.
 * @returns {Array} Parsed lines with indentation, trimmed content, and line number.
 */
function parseLines(code) {
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
 * @param {string} code - The code to parse into an AST.
 * @returns {Array} The generated AST structure.
 */
export function parseAST(code) {
    const lines = parseLines(code);
    const ast = [];
    const stack = [{ indentation: 0, block: ast }]; // Initialize the stack with the root block (AST)

    lines.forEach(({ indentation, line, lineNumber }) => {
        const currentBlock = stack[stack.length - 1].block; // Get the current block from the stack

        // Handle `repeat` instruction
        if (line.startsWith('repeat')) {
            const repeatMatch = line.match(/^repeat (\d+):/);
            if (repeatMatch) {
                const repeatCount = parseInt(repeatMatch[1], 10);
                const repeatNode = { type: "repeat", times: repeatCount, body: [], lineNumber }; // Add line number to node
                currentBlock.push(repeatNode);
                stack.push({ indentation, block: repeatNode.body }); // Push the body of the repeat onto the stack
            }
        } else {
            // Handle function calls
            const funcMatch = line.match(/^(\w+)\(\)$/);
            if (funcMatch) {
                const funcName = funcMatch[1];
                currentBlock.push({ type: "function", name: funcName, lineNumber }); // Add line number to function node
            }
        }

        // Adjust stack when dedenting (i.e., moving up in the hierarchy)
        while (stack.length > 1 && stack[stack.length - 1].indentation > indentation) {
            stack.pop(); // Pop nested blocks when indentation decreases
        }
    });

    return ast;
}
