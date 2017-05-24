var fs = require('fs')
module.exports = function(path, type) {
  try {
    var githubpath = 'https://github.com/ebiwd/EBI-Style-lab/edit/master';
    return '<a class="button small secondary edit-button" href="' + githubpath + path + '">Edit ' + type + '</a>';
    // console.log(page);
    // var baseName = page.split('.')[0]
    // return JSON.stringify(page) + 'test';
    // if(page) {
    //
    //   // return fs.readFileSync('dist/websites/patterns/' + baseName + "/" + baseName + '.css', 'utf-8');
    // }
  }
  catch(ex) {
    return null;
  }
}
//
//
// // Example file src/helpers/bold.js
// module.exports = function(options) {
//   // options.fn(this) = Handelbars content between {{#bold}} HERE {{/bold}}
//   var bolder = '<strong>' + options.fn(this) + '</strong>';
//   return bolder;
// }
