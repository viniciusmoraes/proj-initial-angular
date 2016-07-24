/* File: gulpfile.js */

// grab our gulp packages
var path = require('path'),
    pump = require('pump'),
    gulp  = require('gulp'),
    gutil = require('gulp-util'),
    htmlmin = require('gulp-htmlmin'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify');

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
