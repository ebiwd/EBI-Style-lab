var fs = require('fs')
module.exports = function(page) {
  try {
    if(page) {
      var baseName = page.split('.')[0]
      return fs.readFileSync('dist/websites/patterns/' + baseName + "/" + baseName + '.css', 'utf-8');
    }
  }
  catch(ex) {
    return null;
  }
}
