const path = require('path');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typeDefsArray = loadFilesSync(path.join(__dirname, './**/*.schema.js'));
module.exports = mergeTypeDefs(typeDefsArray);