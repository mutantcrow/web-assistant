module.exports = () => {
  if (false === isProd) {
    return;
  }

  const {src} = require('gulp');
  const clean = require('gulp-clean');

  const taskClean = () => {
    return src(Object.values(packageJson.output), {allowEmpty: true})
        .pipe(clean({force: true, read: false}));
  };

  callbacks.series.push(taskClean);
};
