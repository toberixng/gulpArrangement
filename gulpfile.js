const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');

// use this to organise my all HTML files
gulp.task('processHTML', () => {
  gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

// use this to organise my all javaScript files
gulp.task('processJS', () => {
  gulp.src('blog.babel.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('processIMG', () => {
  gulp.src('./images/octopus.svg')
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('processJS', () => {
  gulp.src('*.js')
    .pipe(jshint({
        esversion: 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist'));
});

gulp.task('processJS', () => {
  gulp.src('blog.babel.js')
    .pipe(jshint({
      esversion: 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('babelPolyfill', () => {
  gulp.src('node_modules/babel-polyfill/browser.js')
    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

gulp.task('processJS', () => {
  gulp.src('blog.babel.js')
    .pipe(jshint({
      esversion: 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', (callback) => {
  runSequence(['processHTML', 'processJS', 'babelPolyfill'], callback);
});

// use this to watch all the files
gulp.task('watch', () => {
  gulp.watch('*.js', ['processJS']);
  gulp.watch('*.html', ['processHTML']);
});

gulp.task('default', (callback) => {
  runSequence(['processHTML', 'processJS', 'babelPolyfill'], 'watch', callback);
});

const browserSync = require('browser-sync').create();
gulp.task('browserSync', () => {
  browserSync.init({
    server: './dist',
    port: 8080,
    ui: {
      port: 8081
    }
  });
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('*.js', ['processJS']);
  gulp.watch('*.html', ['processHTML']);

  gulp.watch('dist/*.js', browserSync.reload);
  gulp.watch('dist/*.html', browserSync.reload);
});

