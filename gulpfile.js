const gulp = require("gulp");

gulp.task("css", () => {
  return gulp.src("dev/css/*.css").pipe(gulp.dest("prod/css"));
});

gulp.task("js", () => {
  return gulp.src("dev/js/*.js").pipe(gulp.dest("prod/js"));
});

gulp.task("transfer", ["css", "js"]);
