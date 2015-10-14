'use strict';

module.exports = {
	library_name : 'puremodels',
	library_distdir : './public/dist',
	app: {
		title: 'Puremodels',
		description: 'Javascript model utils',
		keywords: 'angular, node.js'
	},
	port: 3001,
	publicStaticContentDir : './public',
	assets : ['./assets/css.js', './assets/javascripts.js','./assets/less.js'],
	templateEngine: 'swig',

	templatesDir : 'public/'
};
