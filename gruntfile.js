module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	var config = grunt.file.readYAML('gruntconfig.yml');

	grunt.initConfig({
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
			sass: {
				files: config.scssDir + 'style.scss',
				tasks: ["sass"]
			}
		}
	});

	grunt.registerTask('default', [
		'sass',
		'jshint',
		'watch'
	]);
	grunt.registerTask('build',[
		'copy'
	]);
};