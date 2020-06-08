module.exports = (packageJson, callbacks) => {
  if (typeof packageJson.entry.scss !== 'undefined') {
    callbacks.push(callback);
  }
};

const callback = (cb) => {
  console.log('SASS Task Completed.');
  cb();
};
