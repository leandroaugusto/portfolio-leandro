'use strict';

var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	flatten = require('gulp-flatten'),
	imagemin = require('gulp-imagemin'),
	runSequence = require('run-sequence'),
	minifyCSS = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	mainBowerFiles = require('main-bower-files'),
	browserSync = require('browser-sync').create(),
	gulpHandlebars = require('gulp-compile-handlebars');

// Bases
var bases = {
	app: 'app/',
	dist: 'dist/'
}

// Paths
var paths = {
	styles: [bases.app+'assets/scss/*.scss'],
	scripts: [bases.app+'assets/js/*.js', '!'+bases.app+'assets/js/components/'],
	images: [bases.app+'assets/img/**/*.{gif,jpg,png,jpeg}']
}

// Path Json
var dataObj = require('./'+bases.app+'data/data.json');

// JS Lint
gulp.task('lint', function() {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Clean Directories
gulp.task('clean', function() {
	return del(['dist']);
});

// Task Browser Sync
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
	})
});

// Handlebars
gulp.task('handlebars', function() {
	var options = {
		helpers: {
			inc: function(value, options){
				return parseInt(value) + 1;
			}
		}
	}
	return gulp.src(bases.app+'*.html')
		.pipe(gulpHandlebars(dataObj, options))
		.pipe(gulp.dest(bases.dist))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Task Copy folders
gulp.task('copyAssets', function(){
	// Fonts files
	gulp.src(bases.app+'assets/font/**/*')
		.pipe(gulp.dest(bases.dist+'assets/font'))
	// Jobs folder
	gulp.src(bases.app+'trabalhos/**')
	.pipe(gulp.dest(bases.dist+'trabalhos/'));
	// Others files
	gulp.src(bases.app+'*.{ico,png,php,txt}')
	.pipe(gulp.dest(bases.dist));
	// CNAME
	return gulp.src(bases.app+'CNAME')
		.pipe(gulp.dest(bases.dist));
});

// Components
gulp.task('components', function() {
	return gulp.src(mainBowerFiles(), {base: bases.app+'assets/js/components'})
		.pipe(flatten({includeParents:[1,2]}))
		.pipe(gulp.dest(bases.dist+'assets/js/components'));
});

// Task Styles
gulp.task('styles', function() {
	return gulp.src(paths.styles)
		.pipe(sourcemaps.init())
	    .pipe(concat('main.min.css'))
	    .pipe(sass({style: 'expanded'}))
		.pipe(minifyCSS())
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest(bases.dist+'assets/css'))
	    .pipe(browserSync.reload({
			stream: true
		}));
});

// Task Scripts
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(bases.dist+'assets/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Task images
gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(bases.dist+'assets/img'));
});
 
// Rerun the task when a file changes
gulp.task('watch', ['browserSync'], function() {
	gulp.watch(bases.app+'*.html', ['handlebars']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.scripts, ['scripts'], function(){
		gulp.run('lint', 'scripts');
	});
});

// Default Task
gulp.task('default', function(callback) {
	runSequence('clean',
	['watch', 'handlebars', 'copyAssets', 'components', 'styles', 'scripts', 'images'], callback)
});
