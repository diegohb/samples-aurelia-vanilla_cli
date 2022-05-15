import * as gulp from 'gulp';
import * as gulpIf from 'gulp-if';
import * as plumber from 'gulp-plumber';
import * as rename from 'gulp-rename';
import * as ts from 'gulp-typescript';
import * as project from '../aurelia.json';
import * as fs from 'fs';
import { Transform } from 'stream';
import { CLIOptions, build, Configuration } from 'aurelia-cli';

function configureEnvironment() {
  let env = CLIOptions.getEnvironment();

  return gulp.src(`aurelia_project/environments/${env}.ts`, { since: gulp.lastRun(configureEnvironment) })
    .pipe(rename('environment.ts'))
    .pipe(new Transform({
      objectMode: true,
      transform: function (file, _, cb) {
        // https://github.com/aurelia/cli/issues/1031
        fs.unlink(`${project.paths.root}/${file.relative}`, function () { cb(null, file); });
      }
    }))
    .pipe(gulp.dest(project.paths.root));
}

function buildTypeScript() {
  const typescriptCompiler = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
    noEmitOnError: true
  });

  return gulp.src(project.transpiler.dtsSource)
    .pipe(gulp.src(project.transpiler.source, {
      sourcemaps: true,
      since: gulp.lastRun(buildTypeScript)
    }))
    .pipe(gulpIf(CLIOptions.hasFlag('watch'), plumber()))
    .pipe(typescriptCompiler())
    .pipe(build.bundle());
}

export default gulp.series(
  configureEnvironment,
  buildTypeScript
);

