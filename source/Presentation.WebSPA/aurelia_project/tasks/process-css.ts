import {CLIOptions, build} from 'aurelia-cli';
import * as gulp from 'gulp';
import * as project from '../aurelia.json';
import * as sass from 'gulp-dart-sass';
import * as sassPackageImporter from 'node-sass-package-importer';
import * as postcss from 'gulp-postcss';
import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as postcssUrl from 'postcss-url';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source, {sourcemaps: true})
    .pipe(
      // sassPackageImporter handles @import "~bootstrap"
      // https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-package-importer
      CLIOptions.hasFlag('watch') ?
        sass.sync({quietDeps: true, importer: sassPackageImporter()}).on('error', sass.logError) :
        sass.sync({quietDeps: true, importer: sassPackageImporter()})
    )
    .pipe(postcss([
      autoprefixer(),
      // Inline images and fonts
      postcssUrl({url: 'inline', encodeType: 'base64'}),
      cssnano()
    ]))
    .pipe(build.bundle());
}

