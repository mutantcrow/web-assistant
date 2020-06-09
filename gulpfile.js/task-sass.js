const {src, dest} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-dart-sass');

module.exports = () => {
  if (typeof packageJson.entry.scss !== 'undefined') {
    callbacks.push(compileSASS);
  }
};

const compileSASS = () => {
  const sassArgs = {includePaths: []};

  if (typeof packageJson.externalModulePath !== 'undefined') {
    sassArgs.includePaths.push(packageJson.externalModulePath);
  }

  return src(packageJson.entry.scss)
      .pipe(sourcemaps.init())
      .pipe(sass(sassArgs).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(dest(packageJson.output.scss));
};
