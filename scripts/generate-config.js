// scripts/generate-config.js

const fs = require('fs');
const ejs = require('ejs');

const template = fs.readFileSync('codeql-template.yml', 'utf8');



console.log('>>>>>', process.env.INPUT_PATHS-IGNORED)
console.log('>>>>>', process.env.INPUT_RULES-IGNORED)
const output = ejs.render(template, {
  pathsIgnored: process.env.INPUT_PATHS-IGNORED.split(','),
  rulesIgnored: process.env.INPUT_RULES-IGNORED.split(',')
});

fs.writeFileSync('.github/codeql-config.yml', output);