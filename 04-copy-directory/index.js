const fs = require('fs');
const path = require('path');
let pathCopyFrom = path.join(__dirname, "files");
let pathCopyTo = path.join(__dirname, "files-copy");
console.log('started')

const newPath = path.join(__dirname, "files-copy");

// async function rmDir() {
//   await fs.promises.rm(newPath, { recursive: true, force: true });
// }
// rmDir();

async function mkDir() {
  await fs.promises.rm(newPath, { recursive: true, force: true });
  await fs.promises.mkdir(newPath, { recursive: true });
}

  
async function ReadMyDir() {
  await mkDir();
  let filesInDir = await fs.promises.readdir(pathCopyFrom);
  console.log(filesInDir);
  for (let file of filesInDir) { 
    await copyFileFunc(file);
  }
}

ReadMyDir();
async function copyFileFunc(fileName) {
  const pathToFileCopy = path.join(pathCopyTo, fileName);
  // console.log(pathToFileCopy);
  const pathFromFileCopy = path.join(pathCopyFrom, fileName);
  // console.log(pathFromFileCopy);
  await fs.promises.copyFile(pathFromFileCopy, pathToFileCopy);
}

