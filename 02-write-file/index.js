const fs = require('fs')
const path = require('path')
const { stdin, stdout } = process;

let text =''

fs.writeFile(
  path.join(__dirname, "newFile.txt"),
  '',
  (err) => {
    if (err) throw err;
    console.log("Файл был создан");
    stdout.write("Напишите текст \n");
  }
);


stdin.on("data", (data) => {
  text = data.toString();

  if (text.trim() == "exit") {
    process.exit();
  }

  fs.appendFile(
    path.join(__dirname, "newFile.txt"),
    text,
    (err) => {
      if (err) throw err;
      console.log("Файл был изменен");
    }
  );


});

process.on("SIGINT", process.exit);

process.on('exit', () => {
  stdout.write('program end');
});


