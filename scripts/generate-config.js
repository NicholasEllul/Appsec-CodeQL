// scripts/generate-config.js

const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const template = fs.readFileSync('config/codeql-template.yml', 'utf8');

const inputs = {
  pathsIgnored: process.env.INPUT_PATHS_IGNORED.split(','),
  queries: JSON.parse(process.env.QUERIES),
  repo: process.env.REPO,
};
console.log(`>>>>>`, JSON.stringify(inputs, null, 2));

// const loadConfig = (repo) => {
//   return fs.readFileSync('./qls-packs' + repo + '.qls');
// };

// combine queries and repo config
// const q = {...JSON.parse(process.env.QUERIES) || {}, ...loadConfig(reponame)}

const output = ejs.render(template, {
  pathsIgnored: inputs.pathsIgnored,
  queries: inputs.queries
});
console.log(output);
fs.writeFileSync('.github/codeql-config.yml', output);
fs.writeFileSync('codeql-config.yml', output);
