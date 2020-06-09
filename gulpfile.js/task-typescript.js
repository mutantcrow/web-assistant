const {src, dest} = require('gulp');

module.exports = () => {
  if (typeof packageJson.entry.ts !== 'undefined') {
    callbacks.parallel.push(taskTypescript);
  }
};

const taskTypescript = (cb) => {
  return src(packageJson.entry.ts)
      .pipe(dest(packageJson.output.ts));
};
