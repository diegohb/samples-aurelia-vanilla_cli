import * as gulp from 'gulp';
import tslint from 'eslint';
import * as project from '../aurelia.json';

export default function lint() {
  return gulp.src([project.transpiler.source])
    .pipe(tslint.Linter({
      tslint: require("tslint"),
      formatter: 'prose'
    }))
    .pipe(tslint.report());
}

//https://stackoverflow.com/questions/36136737/gulp-eslint-doesnt-find-my-eslintrc-file
