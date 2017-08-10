/// <binding AfterBuild='bulid' />
var gulp = require("gulp");
var shell = require("gulp-shell");
 
gulp.task("bulid", shell.task(["au build"]));