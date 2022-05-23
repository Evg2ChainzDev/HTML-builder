const fs = require('fs');
const path = require('path');

console.log('started')

const newPath = path.join(__dirname, "files-copy");

async function mkDir () { 
  await fs.promises.mkdir(newPath, { recursive: true });
}

mkDir();
  
let pathCopyFrom = path.join(__dirname, 'files');
let pathCopyTo = path.join(__dirname, 'files-copy');
let filesInDir;
async function ReadMyDir() {
  filesInDir = await fs.promises.readdir(pathCopyFrom);
  filesInDir.forEach(el => {
    console.log(`${el} works`)
    copyFileFunc(el);
  });
  
}

console.log(ReadMyDir());

async function copyFileFunc(fileName) {
  const pathToFileCopy = path.join(pathCopyTo, fileName);
  console.log(pathToFileCopy);
  const pathFromFileCopy = path.join(pathCopyFrom, fileName);
  console.log(pathFromFileCopy);
  await fs.promises.copyFile(pathFromFileCopy, pathToFileCopy);
}

