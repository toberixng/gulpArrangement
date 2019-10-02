const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');

// use this to organise my all HTML files
gulp.task('processHTML', () => {
  gulp.src('blog.html')
    .pipe(gulp.dest('dist'));
});

// use this to organise my all javaScript files
gulp.task('processJS', () => {
  gulp.src('blog.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('processJS', () => {
  gulp.src('*.js')
    .pipe(jshint({
        esversion: 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist'));
});

