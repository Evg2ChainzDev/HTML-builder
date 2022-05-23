const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, "project-dist", "bundle.css");
console.log(srcPath);

let filesInDirStyles;
let cssFilesInDirStyles = [];
let bundle = '';
  
async function ReadStylesDir() {
  filesInDirStyles = await fs.promises.readdir(srcPath);
  console.log(filesInDirStyles);
  filesInDirStyles.forEach((el) => { 
    if (path.extname(el) === '.css') { 
      cssFilesInDirStyles.push(el)
    }
  });
  console.log(cssFilesInDirStyles);

  for (let file of cssFilesInDirStyles) { 
    const pathToFile = path.join(srcPath, file);
    let fileChunk = (await fs.promises.readFile(pathToFile)).toString();
    bundle += fileChunk;
  }

  console.log(bundle);

  await fs.promises.writeFile(distPath, bundle);
}

ReadStylesDir();