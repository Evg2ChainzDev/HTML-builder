const fs = require('fs');
const path = require('path');

let bundleCss;

async function mkPrjDir() { 
  await fs.promises.mkdir(path.join(__dirname, "project-dist"), { recursive: true });
}

mkPrjDir();

// styles.css start//
async function copyStyles() {
  let filesInStyles = await fs.promises.readdir(path.join(__dirname, 'styles'));
  // console.log(filesInStyles);
  for (let style of filesInStyles) {
    let cssPart = (await fs.promises.readFile(path.join(__dirname, 'styles', style))).toString()
    bundleCss += cssPart;
   }
  // console.log(bundleCss)
  await fs.promises.writeFile( path.join(__dirname, "project-dist", 'style.css'), bundleCss)
}
copyStyles();
// styles.css end//

// assets start //
async function copyAssetsFiles(pathSrc, distPath) {
  // console.log(pathSrc);
  // console.log(distPath);
  let ifDir = await (await fs.promises.stat(pathSrc)).isDirectory();
  if (!ifDir) {
    // console.log("this is file");
    await fs.promises.copyFile(pathSrc, distPath);
  } else { 
    // console.log("this is folder");
    let folderName = path.parse(pathSrc).base;
    // console.log(folderName);
    await fs.promises.mkdir(distPath, {recursive: true});
    let filesInPath = await fs.promises.readdir(pathSrc);
    // console.log(filesInPath);
    for (let file of filesInPath) {
      await copyAssetsFiles(path.join(pathSrc, file), path.join(distPath, file));
    }
  }
  
} 

copyAssetsFiles(path.join(__dirname, "assets"), path.join(__dirname, "project-dist", "assets"));

// assets end //

// html start //
async function htmlBuild() {
  const compDir = await fs.promises.readdir(path.join(__dirname, "components"));
  console.log(compDir);
  let templateSrc = (await fs.promises.readFile(path.join(__dirname, "template.html"))).toString();
  // console.log(templateSrc);
  for (let file of compDir) {
    console.log('---start iteration---')
    let filename = path.parse(file).name;
    console.log(filename);
    let newReg = `{{${filename}}}`;
    console.log(newReg);
    let currentFile = (
      await fs.promises.readFile(path.join(__dirname, 'components', file))
    ).toString();
    // console.log(currentFile);
    templateSrc = templateSrc.replace(newReg, currentFile);
    console.log("---end iteration---");
  }
  // console.log(templateSrc);
  await fs.promises.writeFile(path.join(__dirname, 'project-dist','index.html'), templateSrc);
}
 
htmlBuild();
// html  end//



  