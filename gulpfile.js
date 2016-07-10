'use strict';

var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	runSequence = require('run-sequence'),
	minifyCSS = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create();

// Bases
var bases = {
	app: 'app/',
	dist: 'dist/'
}

// Paths
var paths = {
	styles: [bases.app+'assets/scss/**/*.scss'],
	scripts: [bases.app+'assets/js/**/*.js'],
	images: [bases.app+'assets/img/**/*.{gif,jpg,png,jpeg}']
}

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

// Task Copy folders
gulp.task('copyFoldersFiles', function(){
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

// Gulp html
gulp.task('html', function(){
	return gulp.src(bases.app+'*.html')
		.pipe(gulp.dest(bases.dist))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Copy Fonts
gulp.task('fonts', function() {
	return gulp.src(bases.app+'assets/font/**/*')
		.pipe(gulp.dest(bases.dist+'assets/font'))
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
	gulp.watch(bases.app+'*.html', ['html']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.scripts, ['scripts'], function(){
		gulp.run('lint', 'scripts');
	});
});

// Default Task
gulp.task('default', function(callback) {
	runSequence('clean',
	['watch', 'copyFoldersFiles', 'html', 'fonts', 'styles', 'scripts', 'images'], callback)
});
