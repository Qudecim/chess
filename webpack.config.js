const path = require('path')

module.exports = {
	entry: './source/main.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js'
	}
}
