// scripts/generate-config.js

const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const template = fs.readFileSync('config/codeql-template.yml', 'utf8');



function printDirectoryTree(dir, indent = '') {
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    // Print the current file or directory
    console.log(`${indent}${files.length - 1 === index ? '└─' : '├─'} ${file}`);

    // If it's a directory, recursively print its contents
    if (isDirectory) {
      printDirectoryTree(filePath, `${indent}${files.length - 1 === index ? '  ' : '│ '}`);
    }
  });
}




console.log('>>>>>', process.env.INPUT_PATHS_IGNORED);
console.log('>>>>>', process.env.INPUT_RULES_IGNORED);
const output = ejs.render(template, {
  pathsIgnored: process.env.INPUT_PATHS_IGNORED.split(','),
  rulesIgnored: process.env.INPUT_RULES_IGNORED.split(',')
});
console.log(output);
printDirectoryTree('./');
fs.writeFileSync('.github/codeql-config.yml', output);
