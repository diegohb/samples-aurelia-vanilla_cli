/// <binding ProjectOpened='au-build-watch' />
var gulp = require("gulp");
var shell = require("gulp-shell");
 
gulp.task("au-build", shell.task(["au build"]));
gulp.task("au-build-watch", shell.task(["au build --watch"]));

gulp.task("au-test", shell.task(["au test"]));
gulp.task("au-test-watch", shell.task(["au test --watch"]));

gulp.task("au-build-prod", shell.task(["au build --env prod"]));

gulp.task("au-browsersync", shell.task(["au run"]));
gulp.task("au-browsersync-watch", shell.task(["au run --watch"]));