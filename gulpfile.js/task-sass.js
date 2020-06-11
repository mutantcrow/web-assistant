module.exports = () => {
  if ('undefined' === typeof packageJson.entry.scss) {
    return;
  }

  const {src, dest, watch} = require('gulp');
  const cache = require('gulp-cached');
  const gulpif = require('gulp-if');
  const sourcemaps = require('gulp-sourcemaps');
  const sass = require('gulp-dart-sass');
  const postcss = require('gulp-postcss');
  const postcssImport = require('postcss-import');
  const postcssCopy = require('postcss-copy');
  const postcssAutoprefixer = require('autoprefixer');
  const postcssCssnano = require('cssnano');

  const taskSass = () => {
    const sassArgs = {includePaths: []};

    if (typeof packageJson.externalModulePath !== 'undefined') {
      sassArgs.includePaths.push(
          packageJson.externalModulePath + 'node_modules');
    }

    const postcssPlugins = [
      postcssImport(),
      postcssAutoprefixer(),
      postcssCopy({
        basePath: ['./'],
        dest: packageJson.output.scss,
        template: '[name]-[hash].[ext]',
      }),
    ];

    if (true === production) {
      postcssPlugins.push(
          postcssCssnano(/* {preset: ['default', {colormin: false}]} */));
    }

    return src(packageJson.entry.scss)
        .pipe(cache('scss'))
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(sass(sassArgs).on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(gulpif(!production, sourcemaps.write()))
        .pipe(dest(packageJson.output.scss));
  };

  const watchSass = () => {
    watch(packageJson.entry.scss, taskSass);
  };

  callbacks.parallel.push(taskSass);

  if (false === production) {
    callbacks.parallel.push(watchSass);
  }
};
