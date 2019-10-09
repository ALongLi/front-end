var childProcess = require('child_process');

var ls = childProcess.exec('cat.js | wc', function (error, stdout, stderr) {
   if (error) {
     console.log(error.stack);
     console.log('Error code: '+error.code);
   }
   console.log('Child Process STDOUT: '+stdout);
});