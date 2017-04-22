var path = require('path');

module.exports = {
    entry: './app/counter.component.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};