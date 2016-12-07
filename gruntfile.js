module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	var config = grunt.file.readYAML('gruntconfig.yml');

	grunt.initConfig({
		express: {
			all: {
				options: {
					bases: ['/Users/oscar/Desktop/Projects/responsive-portfolio/src'],
					port: 8080,
					livereload: true
				}
			}
		},
		sass: {
			dist: {
				src: config.scssDir + 'style.scss',
				dest: config.cssSrcDir + 'style.css'
			} 
		},
		jshint: {
			options: {
				"eqeqeq": true
			},
			all: [
				'gruntfile.js',
				config.jsSrcDir + '*.js'
			]
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src/css', src: ['*.css'], dest: config.cssDistDir, filter: 'isFile'},
					{expand: true, cwd: 'src/js', src: ['*.js'], dest: config.jsDistDir, filter: 'isFile'},
					{expand: true, cwd: 'src', src: ['*.html'], dest: 'dist/', filter: 'isFile'}
				]
			}
		},
		watch: {
			all: {
				files: '**/*.html',
				options: {
					livereload: true
				}
			},
			sass: {
				files: config.scssDir + 'style.scss',
				tasks: ["sass"]
			}
		},
		open: {
			all: {
				path: 'http://localhost:8080/index.html'
			}
		}
	});

	grunt.registerTask('default', [
		'sass',
		'jshint',
	]);
	grunt.registerTask('build',[
		'copy'
	]);
	grunt.registerTask('serve',[
		'express',
		'open',
		'watch'
	]);
};