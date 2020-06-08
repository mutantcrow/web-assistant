const {src, dest} = require('gulp');

module.exports = () => {
  if (typeof packageJson.entry.scss !== 'undefined') {
    callbacks.push(sass);
  }
};

const sass = (cb) => {
  return src(packageJson.entry.scss)
      .pipe(dest(packageJson.output.scss));
};
