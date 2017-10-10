// Node modules
import PATH from 'path';

import Chalk from 'chalk';
import Stack from 'stack-trace';
import Columnify from 'columnify';


export default function prepareStackTrace(error) {
    const main = process.mainModule ? PATH.dirname(process.mainModule.filename) : '';
    const modx = new RegExp(`node_modules${PATH.sep}`);
    const intx = new RegExp(`^internal${PATH.sep}`);
    const rules = [
        { type: 'internal', find: intx, color: Chalk.gray, del: true },
        { type: 'module', find: modx, color: Chalk.gray.bold, del: true },
        { type: 'app', find: main, color: Chalk.red.bold, del: false },
    ];
    const lines = Stack.parse(error)
        .map(function stackMapper(f) {
            if (f.fileName === __filename) return null;
            // const index = f.fileName.search(rules[1].find);
            let found = false;
            let rule = rules
                .map(function ruleMapper(r) {
                    if (found) return null;
                    const match = f.fileName.match(r.find);
                    if (match === null) return null;
                    found = true;
                    const index = r.del ? match.index + match[0].length : match.index;
                    return Object.assign({ file: f.fileName.slice(index) }, r);
                })
                .filter(Boolean)
                .shift();
            if (!found) rule = { type: 'native', file: f.fileName, color: Chalk.gray };
            return {
                type: rule.color(rule.type),
                pos: rule.color(`[${f.lineNumber}:${f.columnNumber}]`),
                file: rule.color(rule.file),
                cont: rule.color(f.functionName),
            };
        })
        .filter(Boolean);
    const stack = Columnify(lines, { showHeaders: false, align: 'left' });
    const name = Chalk.white.bgRed(` ${error.name || 'Error'} `);
    const mesg = Chalk.white.bold(` ${error.message} `);
    error.stack = `\n${name}${mesg}\n\n${stack}\n`; // eslint-disable-line
    return error;
}