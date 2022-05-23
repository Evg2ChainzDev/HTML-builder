const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, "text.txt");
const ourStream = fs.createReadStream(pathToFile);

let ourFile = '';

// console.log('path to file', pathToFile);
// console.log(ourStream);
ourStream.on("data", (chunk) => (ourFile += chunk));
ourStream.on("end", () => console.log(ourFile));

