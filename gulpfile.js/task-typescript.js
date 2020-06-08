const {src, dest} = require('gulp');

module.exports = () => {
  if (typeof packageJson.entry.ts !== 'undefined') {
    callbacks.push(typescript);
  }
};

const typescript = (cb) => {
  return src(packageJson.entry.ts)
      .pipe(dest(packageJson.output.ts));
};
