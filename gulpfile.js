const gulp = require("gulp");
const babel = require('gulp-babel');

gulp.task("css", () => {
  return gulp.src("dev/css/*.css")
    .pipe(gulp.dest("build/css"));
});

gulp.task("js", () => {
  return gulp.src("dev/js/*.js")
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("build", ["css", "js"]);
