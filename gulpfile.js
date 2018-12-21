const gulp = require("gulp");

gulp.task("getTime", () => {
  const time = new Date();
  console.log('\n current time is: ' + time.toLocaleTimeString() + '\n');
});
