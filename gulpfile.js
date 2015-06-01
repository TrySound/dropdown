var gulp = require('gulp');
var header = require('gulp-header');
var rename = require('gulp-rename');
var size = require('gulp-size');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
	var pkg = JSON.parse(require('fs').readFileSync('package.json', 'utf-8'));
	return gulp.src('src/*.js')
		.pipe(header([
			'/*!',
			' * <%= name %> <%= version %> <%= homepage %>',
			' * Copyright <%= new Date().getFullYear() %> <%= author %>',
			' */\n\n'
		].join('\n'), pkg))
		.pipe(gulp.dest('dist'))
		.pipe(size({ showFiles: true }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify({ preserveComments: 'some' }))
		.pipe(gulp.dest('dist'))
		.pipe(size({ showFiles: true }))
})

gulp.task('dev', function () {
	gulp.start(['build']);
	gulp.watch(['package.json', 'src/*.js'], ['build'])
})

gulp.task('default', ['build']);
