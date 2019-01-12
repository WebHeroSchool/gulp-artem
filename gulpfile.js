const gulp = require('gulp');
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
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const short = require('postcss-short');
const assets = require('postcss-assets');
const presetEnv = require('postcss-preset-env');
const glob = require('glob');
const rename = require('gulp-rename');
const handlebars = require('gulp-compile-handlebars');
const eslint = require('gulp-eslint');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const rulesCSS = require('./.stylelintrc.json');
const rulesJS = require('./.eslintrc.json');
const templateData = require('./dev/data.json');

const paths = {
  src: {
    dir: 'dev',
    css: 'dev/css/**/*.css',
    js: 'dev/js/**/*.js',
  },
  build: {
    dir: 'build',
    css: 'build/css',
    js: 'build/js',
  },
  buildNames: {
    css: 'styles.min.css',
    js: 'index.min.js',
  },
  templates: 'dev/templates/**/*.hbs',
  lint: {
    scripts: ['**/*.js', '!node_modules/**/*', '!build/**/*', '!gulpfile.js'],
    styles: ['**/*.css', '!node_modules/**/*', '!build/**/*'],
  },
};

env({
  file: '.env',
  type: 'ini',
});

gulp.task('compile', () => {
  glob(paths.templates, (err, files) => {
    if (!err) {
      const options = {
        ignorePartials: true,
        batch: files.map(item => item.slice(0, item.lastIndexOf('/'))),
        helpers: {
          // helper for capitalize every word in sentense
          capitalizeEveryWord: str => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          // helper return true if age > 18, and false if age < 18
          isOld: age => age > 18,
        },
      };
      return gulp.src(`${paths.src.dir}/index.hbs`)
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.build.dir));
    }
  });
});

gulp.task('build-css', () => {
  const plugins = [
    autoprefixer({
      browsers: ['last 2 version'],
    }),
    nested,
    short,
    assets({
      loadPaths: ['dev/images/'],
    }),
    presetEnv,
  ];
  return gulp.src([paths.src.css])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(concat(paths.buildNames.css))
    .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build.css));
});

gulp.task('build-js', () => gulp.src([paths.src.js])
  .pipe(sourcemaps.init())
  .pipe(concat(paths.buildNames.js))
  .pipe(babel({
    presets: ['@babel/env'],
  }))
  .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.build.js)));

gulp.task('clean', () => gulp.src('build', { read: false })
  .pipe(clean()));

gulp.task('build', ['build-css', 'build-js']);

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch(paths.src.css, ['css-watch']);
  gulp.watch(paths.src.js, ['js-watch']);
});

gulp.task('eslint', () => {
  gulp.src(paths.lint.scripts)
    .pipe(eslint(rulesJS))
    .pipe(eslint.format());
});

gulp.task('stylelint', () => {
  gulp.src(paths.lint.styles)
    .pipe(postcss([
      stylelint(rulesCSS),
      reporter({
        clearAllMessages: true,
        throwError: false,
      }),
    ]));
});

gulp.task('lint', ['eslint', 'stylelint']);

gulp.task('css-watch', ['build-css'], () => browserSync.reload());
gulp.task('js-watch', ['build-js'], () => browserSync.reload());

gulp.task('default', ['build']);
gulp.task('prod', ['build']);
gulp.task('dev', ['build', 'server']);
