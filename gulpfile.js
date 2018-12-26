const gulp = require("gulp");
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  src: {
    css: 'dev/css/**/*.css',
    js: 'dev/js/**/*.js'
  },
  build: {
    css: 'build/css',
    js: 'build/js'
  },
  buildNames: {
    css: 'styles.min.css',
    js: 'index.min.js'
  }
};

gulp.task("build-css", () => {
  return gulp.src([paths.src.css])
    .pipe(sourcemaps.init())
    .pipe(concat(paths.buildNames.css))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build.css));
});

gulp.task("build-js", () => {
  return gulp.src([paths.src.js])
    .pipe(sourcemaps.init())
    .pipe(concat(paths.buildNames.js))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build.js));
});

gulp.task("build", ["build-css", "build-js"]);

gulp.task('watch', () => {
  gulp.watch(paths.src.css, ['build-css']);
  gulp.watch(paths.src.js, ['build-js']);
})
