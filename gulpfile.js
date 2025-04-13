const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return src('./src/styles/**/*.scss').pipe(sass()).pipe(dest('./src/styles'));
}

function watchTask() {
  watch(['./src/styles/**/*.scss'], buildStyles);
}

exports.default = series(buildStyles, watchTask);
