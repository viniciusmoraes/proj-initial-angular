/* File: gulpfile.js */

// grab our gulp packages
var path = require('path'),
    pump = require('pump'),
    stylish = require('jshint-stylish'),
    gulp  = require('gulp'),
    gutil = require('gulp-util'),
    htmlmin = require('gulp-htmlmin'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    html5Lint = require('gulp-html5-lint');

gulp.task('hml-lint', function() {
  return gulp.src('app/*.html')
    .pipe(html5Lint());
});

gulp.task('jlint', function() {
  return gulp.src('app/components/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('less', function () {
  return gulp.src('app/resources/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('app/resources/css'));
});

gulp.task('minify-html', function() {
  return gulp.src(['app/**/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
});

gulp.task('uglify-js', function (cb) {
  pump([
    gulp.src('app/components/**/*.js'),
    uglify(),
    gulp.dest('build/components')
  ],cb);
});
