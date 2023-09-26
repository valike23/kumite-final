const fs = require('fs-extra'); // Using fs-extra for extra file operations

const sourceFolder = '__sapper__/export';
const destinationFolder = 'resources';

// Copy the content from the source folder to the destination folder
fs.copy(sourceFolder, destinationFolder, (err) => {
  if (err) {
    console.error('Error copying content:', err);
  } else {
    console.log('Content copied successfully!');
  }
});
