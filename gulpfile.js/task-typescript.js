module.exports = (packageJson, callbacks) => {
  if (typeof packageJson.entry.ts !== 'undefined') {
    callbacks.push(callback);
  }
};

const callback = (cb) => {
  console.log('Typescript Task Completed.');
  cb();
};
