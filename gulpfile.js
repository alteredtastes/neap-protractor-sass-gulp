var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    gulpAngularProtractor = require('gulp-angular-protractor');

//runs linter on all js and tests
gulp.task('lint', function() {
  return gulp
    .src([
      'public/javascripts/**/*.spec.js',
      'public/javascripts/*.spec.js',
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish)) //better styling for linter warnings
});

//runs lint on js including tests, then concats and minifies to dist
gulp.task('scripts', ['lint'], function() {
  return gulp
    .src([
      'public/javascripts/*.js', //get angular-app
      'public/javascripts/**/*.js', //get js from folders organized by section
      '!public/javascripts/**/*.spec.js', //avoid all protractor test files
      '!public/javascripts/*.spec.js', //avoid angular-app protractor test file
      '!public/javascripts/dist/*.js', //ignore previous dist file
    ])
    .pipe(concat('all.min.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('public/javascripts/dist'));
});

//runs protractor test
gulp.task('test', ['scripts'], function(callback) {
  return gulp
    .src(['../public/javascripts/**/*.spec.js'])
    .pipe(gulpAngularProtractor({
      'configFile': 'protractor.conf.js',
      'autoStartStopServer': true,
      'debug': false,
    }))
    .on('error', function(e) {
      throw e
    })
})
