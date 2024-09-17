/**
 * Parses the provided code string into an Abstract Syntax Tree (AST).
 * @param {string} code - The code to parse.
 * @returns {Array} The AST representation of the code.
 */
export function parseAST(code) {
    // Split the code into non-empty lines
    const lines = code.split('\n').filter(line => line.trim() !== '');
    const ast = [];
    const stack = [{ indentLevel: -1, body: ast }]; // Stack to track indentation levels

    lines.forEach(line => {
        const indentLevel = line.search(/\S/); // Find the indentation level
        const trimmedLine = line.trim();

        // Handle loop statements (e.g., "repeat 3:")
        const loopMatch = trimmedLine.match(/^repeat\s+(\d+):$/);
        if (loopMatch) {
            const times = parseInt(loopMatch[1], 10);
            const loopNode = { type: 'loop', times, body: [] };
            
            // Add the loop node at the correct level in the AST
            while (indentLevel <= stack[stack.length - 1].indentLevel) {
                stack.pop(); // Exit scopes until the correct indentation level is reached
            }
            stack[stack.length - 1].body.push(loopNode);
            stack.push({ indentLevel, body: loopNode.body });
            return;
        }

        // Handle function calls (e.g., "left()", "right()")
        const funcMatch = trimmedLine.match(/^(left|right|up|down)\(\)$/);
        if (funcMatch) {
            const funcNode = { type: 'function', name: funcMatch[1] };

            // Add the function node at the correct level in the AST
            while (indentLevel <= stack[stack.length - 1].indentLevel) {
                stack.pop();
            }
            stack[stack.length - 1].body.push(funcNode);
            return;
        }

        // If the line doesn't match any known pattern, throw a syntax error
        throw new Error(`Syntax error at line: "${line}"`);
    });

    return ast;
}
