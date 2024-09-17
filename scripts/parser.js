function parseLines(code) {
    const lines = code.trim().split('\n');
    const result = [];

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine === "") return; // Ignore les lignes vides

        const indentation = line.match(/^\t*/)[0].length; // Utilise les tabulations pour l'indentation
        result.push({ indentation, line: trimmedLine, lineNumber: index + 1 }); // Ajoute le numéro de ligne
    });

    return result;
}

export function parseAST(code) {
    const lines = parseLines(code);
    const ast = [];
    const stack = [{ indentation: 0, block: ast }]; // Initialiser la pile avec le bloc racine (ast)

    lines.forEach(({ indentation, line, lineNumber }) => {
        // Obtenir le bloc courant
        const currentBlock = stack[stack.length - 1].block;

        if (line.startsWith('repeat')) {
            // Extraire le nombre de répétitions
            const repeatMatch = line.match(/^repeat (\d+):/);
            if (repeatMatch) {
                const repeatCount = parseInt(repeatMatch[1], 10);
                const repeatNode = { type: "repeat", times: repeatCount, body: [], lineNumber }; // Ajoute le numéro de ligne
                currentBlock.push(repeatNode);
                stack.push({ indentation, block: repeatNode.body }); // Pousser le corps (body) du repeat sur la pile
            }
        } else {
            // C'est une fonction, on l'ajoute directement dans le bloc courant
            const funcMatch = line.match(/^(\w+)\(\)$/);
            if (funcMatch) {
                const funcName = funcMatch[1];
                currentBlock.push({ type: "function", name: funcName, lineNumber }); // Ajoute le numéro de ligne
            }
        }

        // Si l'indentation actuelle est inférieure à celle de la pile, on remonte dans la hiérarchie
        while (stack.length > 1 && stack[stack.length - 1].indentation > indentation) {
            stack.pop(); // Retirer les blocs imbriqués quand on change de niveau d'indentation
        }
    });

    console.log(JSON.stringify(ast, null, 2)); // Debugging

    return ast;
}
