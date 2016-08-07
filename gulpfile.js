var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    gulpAngularProtractor = require('gulp-angular-protractor'),
    sass = require('gulp-sass');

var paths = {
  scripts: [
    'public/javascripts/*.js', //get angular-app
    'public/javascripts/**/*.js', //get js from feature folders
    '!public/javascripts/**/*.spec.js', //don't concat/minify protractor tests
    '!public/javascripts/*.spec.js', //don't concat/minify protractor tests
    '!public/javascripts/dist/*.js', //ignore previous dist file
  ],
  style: 'public/stylesheets/**/*.scss', //get scss to compile to css
  lint: [
    'public/javascripts/*.js',
    'public/javascripts/**/*.js',
    'public/javascripts/**/*.spec.js', //lint the protractor tests
    'public/javascripts/*.spec.js', //lint the protractor tests
    '!public/javascripts/dist/*.js' //ignore previous dist file
  ],
  test: '../public/javascripts/**/*.spec.js',
  watch: [
    'public/*.html',
    'public/javascripts/*.{js,html}',
    'public/javascripts/**/*.{js,html}',
    'public/stylesheets/sass/**/*.scss',
    '!public/javascripts/dist/*.js'
  ]
}

//compiles scss
//runs lint on js & test files
//concats & minifies to dist
gulp.task('scripts', ['style', 'lint'], function() {
  return gulp
  .src(paths.scripts)
  .pipe(concat('all.min.js'))
  .pipe(ngAnnotate({add: true}))
  .pipe(uglify({mangle: true}))
  .pipe(gulp.dest('./public/javascripts/dist'));
});

//compiles style.scss to style.css
gulp.task('style', function() {
  return gulp
    .src('./public/stylesheets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/css/'));
});

//runs linter on js & test files
gulp.task('lint', function() {
  return gulp
    .src(paths.lint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish)) //better styling for linter warnings
});

//runs protractor test
gulp.task('test', ['scripts'], function(callback) {
  return gulp
    .src(paths.test)
    .pipe(gulpAngularProtractor({
      'configFile': 'protractor.conf.js',
      'autoStartStopServer': true,
      'debug': false,
    }))
    .on('error', function(e) {throw e;})
});

gulp.task('default', function() {
  gulp.watch(paths.watch, ['scripts']);
}); //reruns scripts automatically on changes to path.watch files
