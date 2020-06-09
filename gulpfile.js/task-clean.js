const {src} = require('gulp');
const clean = require('gulp-clean');

module.exports = () => {
  if ('true' === isProd) {
    callbacks.series.push(taskClean);
  }
};

const taskClean = () => {
  return src(Object.values(packageJson.output), {allowEmpty: true})
      .pipe(clean({force: true, read: false}));
};
