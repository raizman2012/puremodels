'use strict';

var glob = require("glob");

var config = require('./config/config'),
	assets = require('./config/assets');

var bower_package_dir = 'C:/startup/ng-puremodels/';

module.exports = function(grunt) {
	var assetsAll = assets(config.assets).all;

	var library_src = assetsAll.javascripts.library_src;
	var less_src = assetsAll.less.src;

	// Project Configuration
	grunt.initConfig({
		less: {
			// Compile all targeted LESS files individually
			components: {
				options: {
					imports: {
						// Use the new "reference" directive, e.g.
						// @import (reference) "variables.less";
						reference: [
							"../lib/bootstrap/less/mixins.less",
							"../lib/bootstrap/less/variables.less"
						]
					}
				},
				files: [
					{
						expand: true,
						cwd : './public/less',
						// Compile each LESS component excluding "bootstrap.less",
						// "mixins.less" and "variables.less"
						src: ['*.less'],
						dest: './public/generated_css/',
						ext: '.css'
					}
				]
			}
		},

		cssjanus : {
			theme: {
				options : {
					generateExactDuplicates : true
				},
				files: assetsAll.cssjanus
			}
		},

		concat: {
			dist: {
				src: library_src,
				dest: config.library_distdir+'/'+config.library_name+'.js'
			}
		},

		copy: {
			bower_lib_project: {
				files: [
					{
						cwd: config.library_distdir,
						expand: true,
						flatten: true,
						src: ['*.*'],
						dest: bower_package_dir
					}
				]
			}
		},
		uglify: {
			dist: {
				files: [{
					src: config.library_distdir+'/*.js',
					dest: config.library_distdir+'/'+config.library_name+'.min.js'
				}]
			}
		},

		ngtemplates:  {
			'ng-puremodels':        {
				cwd:      'public',
				src:      'dev/directives/*.html',
				dest:     config.library_distdir+'/'+config.library_name+'.templates.js'
			}
		},

		ngdocs: {
			options: {
				dest: './public/docs',
				titleLink: '/'
			},
			api: {
				src: ['./public/dev/**/*.js', '!./public/dev/tests/*.js'],
				title: 'api'
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html'
				}
			}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},

		concurrent: {
			default: ['nodemon'],
			debug: ['nodemon'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// Release task(s).
	grunt.registerTask('release', ['concat:dist', 'uglify:dist', 'copy:bower_lib_project']);

	// Default task(s).
	grunt.registerTask('default', ['less', 'cssjanus', 'concurrent:default']);

	// Default task(s).
	grunt.registerTask('prod', ['ngdocs', 'less', 'cssjanus', 'concurrent:default']);
};