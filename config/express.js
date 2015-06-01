'use strict';

/**
 * Module dependencies.
 */
var config = require('./config'),
	assets = require('./assets'),
	snippets = require('./snippets'),
	fs = require('fs'),
	glob = require('glob'),
	http = require('http'),
	express = require('express'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash'),
	consolidate = require('consolidate'),
	path = require('path');

var _ = require('underscore');

module.exports = function() {
	// Initialize express app
	console.log('Initialize express app');
	var app = express();



	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;

	// Setting static assets: javascripts, css
	app.locals.assets = assets(config.assets);

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// CookieParser should be above session
	app.use(cookieParser());

	app.use(function(req, res, next) {
		if (req.cookies !== undefined) {
			res.locals.language = req.cookies.language;
		} else {
			res.locals.language = 'english';
		}
		//console.log('res.locals.language:'+res.locals.language);
		next();
	});

	// connect flash for flash messages
	app.use(flash());

	// Setting the app router and static folder
	app.use(express.static(path.resolve(config.publicStaticContentDir)));

	// load metainfo about snippets
	var allSnippets = {};
	snippets.readMetatags(glob.sync('modules/snippets/views/**/*.html', {cwd: config.templatesDir}), allSnippets, config.templatesDir);

	// create status html
	var status = '<html>\n';
	status += '<table border>';
	_.each(allSnippets, function(value, key) {
		var statusColor = 'white';
		if (value.ready !== undefined) {
			statusColor = 'green';
		}
		status += '<tr>';
		status += '<td>'+path.basename(key)+'</td>';
		status += '<td bgcolor=\"'+statusColor+'\">STATUS</td>';
		status += '</tr>\n';
	});
	status += '\n</table>';
	status += '\n</html>';
	//fs.writeFile('status.html', status);

	console.log('create routers');
	app.get('/', function (req, res) {
		res.render('index', { });
	});

	app.get('/test.html', function (req, res) {
		res.render('test', { test : 'leo'});
	});

	app.get('/snippets', function (req, res) {

		res.json(allSnippets);
	});

	app.get('/snippet/:snippetId', function (req, res) {
		var snippetId = req.params['snippetId'];
		if (snippetId === undefined) {
			return undefined;
		}
		var snippetInfo = snippets.findBySnippetId(snippetId, allSnippets);
		console.log('snippetInfo:', snippetInfo);
		res.json(snippetInfo);
	});

	app.get('/resources', function (req, res) {
		var article = { test : 'bla'};
		var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
		var bowerJson = JSON.parse(fs.readFileSync('bower.json', 'utf8'));

		var infosAboutDependencies = [];
		for (var curr in packageJson.dependencies) {

			var subpackageJson = JSON.parse(fs.readFileSync('node_modules/'+curr+'/package.json', 'utf8'));
			infosAboutDependencies.push({
				name : subpackageJson.name,
				description : subpackageJson.description,
				licence : subpackageJson.licence,
				homepage : subpackageJson.homepage
			});
		}

		var info = {
			packageJson : packageJson,
			infosAboutDependencies : infosAboutDependencies,
			bowerJson : bowerJson
		};

		res.json(info);
	});

	// i18n support
	app.get('/setlanguage', function (req, res) {
		if (req.query.language) {
			res.cookie('language', req.query.language, {maxAge: 20000});
			res.redirect('back');
		}
	});
	app.get('/toggleEnglishHebrew', function (req, res) {
		if (req.cookies.language === 'hebrew') {
			console.log('/toggleEnglishHebrew req.cookies.language set to: english');
			res.cookie('language', 'english', {maxAge: 20000});
		} else {
			console.log('/toggleEnglishHebrew req.cookies.language set to: hebrew');
			res.cookie('language', 'hebrew', {maxAge: 20000});
		}

		res.redirect('back');
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	// Return Express server instance
	console.log('Return Express server instance');
	return app;
};