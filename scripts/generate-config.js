// scripts/generate-config.js

const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const template = fs.readFileSync('config/codeql-template.yml', 'utf8');


const output = ejs.render(template, {
  pathsIgnored: process.env.INPUT_PATHS_IGNORED.split(','),
  rulesIgnored: process.env.INPUT_RULES_IGNORED.split(',')
});
console.log(output);
fs.writeFileSync('.github/codeql-config.yml', output);
