module.exports.addLastSlash = (input) => {
  if (input[input.length - 1] === '/') {
    return input;
  }
  return input + '/';
};

module.exports.getMatchedFiles = (regex, files) => {
  const matchedFiles = [];

  files.forEach((file) => {
    if (file.search(regex) !== -1) {
      matchedFiles.push(file);
    }
  });

  return matchedFiles;
};
