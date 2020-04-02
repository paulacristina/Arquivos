'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');


// Static server
gulp.task('browser-sync', gulp.series(function () {
    browserSync.init({
        server: {
            baseDir: "./assets/"
        }
    });
    gulp.watch(['./src/styles/*.scss', './*.html'], gulp.series(['sass'])).on('change', browserSync.reload);
    gulp.watch(['./src/js/*.js', './*.html'], gulp.series(['min-js'])).on('change', browserSync.reload);
    gulp.watch(['./src/*.html'], gulp.series(['minify'])).on('change', browserSync.reload);
    gulp.watch(['./src/images/*'], gulp.series(['image'])).on('change', browserSync.reload);
}));

gulp.task('min-js', gulp.series(function () {
    return gulp.src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(minify())
        .pipe(gulp.dest('./assets/js'))
}));

gulp.task('sass', gulp.series(function () {
    return gulp.src('./src/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/styles'));
}));

gulp.task('minify', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('assets'));
});

gulp.task('image', function () {
    return gulp.src('src/images/**/*')
      .pipe(image())
      .pipe(gulp.dest('assets/images'));
});


gulp.task('default', gulp.series(['minify', 'image', 'sass', 'min-js', 'browser-sync']));