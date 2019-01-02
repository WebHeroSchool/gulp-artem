const gulp = require("gulp");
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const env = require('gulp-env');
const clean = require('gulp-clean');
const postcss = require('gulp-postcss');

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

env({
  file: '.env',
  type: 'ini',
});

gulp.task("build-css", () => {
  const plugins = [];
  return gulp.src([paths.src.css])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(concat(paths.buildNames.css))
    .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
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
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build.js));
});

gulp.task('clean', function () {
  return gulp.src('build', { read: false })
    .pipe(clean());
});

gulp.task("build", ["build-css", "build-js"]);

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(paths.src.css, ['css-watch']);
  gulp.watch(paths.src.js, ['js-watch']);
});

gulp.task('css-watch', ['build-css'], () => browserSync.reload());
gulp.task('js-watch', ['build-js'], () => browserSync.reload());

gulp.task('default', ['build']);
gulp.task('prod', ['build']);
gulp.task('dev', ['build', 'server']);
