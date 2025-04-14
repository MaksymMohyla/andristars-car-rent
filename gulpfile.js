const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');

const buildDir = './dist';

function buildStyles() {
  return src('./src/styles/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(dest(`${buildDir}/styles`));
}

function copyHTML() {
  return src('./src/*.html').pipe(dest(buildDir));
}

function copyJS() {
  return src('./src/scripts/**/*.js')
    .pipe(uglify())
    .pipe(dest(`${buildDir}/scripts`));
}

function cleanDist() {
  return src(buildDir, { read: false, allowEmpty: true }).pipe(clean());
}

function watchTask() {
  watch(['./src/styles/**/*.scss'], buildStyles);
  watch(['./src/*.html'], copyHTML);
  watch(['./src/scripts/**/*.js'], copyJS);
}

exports.build = series(cleanDist, parallel(buildStyles, copyHTML, copyJS));
exports.default = series(exports.build, watchTask);
