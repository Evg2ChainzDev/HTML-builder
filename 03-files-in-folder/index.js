const fs = require("fs");
const path = require("path");

let pathToFiles = path.join(__dirname, 'secret-folder');
// console.log(pathToFiles);

async function ReadMyDir() {
  let filesInDir = await fs.promises.readdir(pathToFiles, { withFileTypes: true });  // дожидаемся промиса с помощью await
  // console.log(filesInDir);
  let onlyFiles = filesInDir.filter(el => el.isFile()); // фильтруем чтоб не было папок
  // console.log(onlyFiles);
  onlyFiles.forEach((el) => {
    let pathToFile = path.join(pathToFiles, el.name);
    // console.log(pathToFile);
    
    fs.stat(pathToFile, (err, stats) => {
      console.log(
        `${path.parse(pathToFile).name} - ${path
          .parse(pathToFile)
          .ext.slice(1)} - ${stats.size}b`
      );
      // console.log(stats.size);
    });
  });
}

ReadMyDir();