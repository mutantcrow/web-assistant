const {src, dest} = require('gulp');

module.exports = () => {
  if ('undefined' !== typeof packageJson.entry.ts) {
    callbacks.parallel.push(taskTypescript);
  }
};

const taskTypescript = (cb) => {
  return src(packageJson.entry.ts)
      .pipe(dest(packageJson.output.ts));
};
