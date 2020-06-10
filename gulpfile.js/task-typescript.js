module.exports = () => {
  if ('undefined' === typeof packageJson.entry.ts) {
    return;
  }

  const {src, dest, watch} = require('gulp');

  const taskTypescript = () => {
    return src(packageJson.entry.ts)
        .pipe(dest(packageJson.output.ts));
  };

  const watchTypescript = () => {
    watch(packageJson.entry.ts, taskTypescript);
  };

  callbacks.parallel.push(taskTypescript);

  if (false === isProd) {
    callbacks.parallel.push(watchTypescript);
  }
};
