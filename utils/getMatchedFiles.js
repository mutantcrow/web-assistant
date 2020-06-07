module.exports = (regex, files) => {
  const matchedFiles = [];

  files.forEach((file) => {
    if (file.search(regex) !== -1) {
      matchedFiles.push(file);
    }
  });

  return matchedFiles;
};
