/* File: gulpfile.js */
// https://www.npmjs.com/package/gulp-build

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
    html5Lint = require('gulp-html5-lint'),
    imagemin = require('gulp-imagemin'),
    concatCss = require('gulp-concat-css'),
    connect = require('gulp-connect');
    assetpaths = require('gulp-assetpaths'),
    mainBowerFiles = require('gulp-main-bower-files');

gulp.task('webserver-app', [], function(){

  connect.server({
    root: 'app/',
    livereload: true,
    port: 9001,
    host: 'localhost',
    middleware: function(connect) {
        return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });

});

gulp.task('webserver-build', ['build'], function(){

  gulp.src(['build/*.html'])
    .pipe(assetpaths({
      newDomain: 'stylesheets',
      oldDomain : 'resources/css',
      docRoot : '.',
      filetypes : ['css'],
      templates: false
    }))

    .pipe(assetpaths({
      newDomain: 'javascript',
      oldDomain : 'bower_components/',
      docRoot : '.',
      filetypes : ['js'],
      templates: false
    }))

    .pipe(assetpaths({
      newDomain: 'images',
      oldDomain : 'resources/img',
      docRoot : '.',
      filetypes : ['jpg','jpeg','png','ico','gif'],
      templates: false
    }))
    .pipe(gulp.dest('build/'));

  connect.server({
    root: 'build/',
    livereload: true,
    port: 9000,
    host: 'localhost'
  });

});

gulp.task('build', [
  'minify-img',
  'minify-html',
  'uglify-components-js',
  'uglify-app-js',
  'less',
  'bower'
], function(){
  return gulp.src('app/resources/css/**/*.css')
    .pipe(concatCss("stylesheets/core.css"))
    .pipe(gulp.dest('build/'));
});

gulp.task('bower', function() {
  return gulp.src('bower.json')
    .pipe(mainBowerFiles())
    .pipe(uglify())
    .pipe(gulp.dest('build/javascript'));
});

gulp.task('minify-img', function(){
  gulp.src('app/resources/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'))
});

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

gulp.task('uglify-components-js', function (cb) {
  pump([
    gulp.src('app/components/**/*.js'),
    uglify(),
    gulp.dest('build/components')
  ],cb);

});

gulp.task('uglify-app-js', function (cb) {
  pump([
    gulp.src('app/*.js'),
    uglify(),
    gulp.dest('build/javascript')
  ],cb);

});
