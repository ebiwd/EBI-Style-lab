var fs = require('fs')
module.exports = function(page) {
  if(page) {
    var baseName = page.split('.')[0]
    try {
      return fs.readFileSync('content/websites/patterns/' + baseName + "/" + baseName + '.html', 'utf-8');
    } catch(ex) {
      return '';
    }
  }
}
