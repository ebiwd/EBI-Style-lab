var fs = require('fs')
// we check if css/js/html code is available, and size the code blocks acordingly
module.exports = function(page) {
  var numberOfActiveContainers = 0;
  var output = '';

  // var output = '<div class="flex-container align-center"><ul class="code-menu menu">';
  try {
    var baseName = page.split('.')[0]
    fs.readFileSync('content/websites/patterns/' + baseName + "/" + baseName + '.html', 'utf-8');
    // output += '<li class="code-menu-item is-active" data-toggle-HTML><a href="#">HTML</a></li>'
    numberOfActiveContainers++;
  } catch(ex) { /* do nothing */ }
  try {
    var baseName = page.split('.')[0]
    fs.readFileSync('content/websites/patterns/' + baseName + "/" + baseName + '.scss', 'utf-8');
    // output += '<li class="code-menu-item" data-toggle-styles><a href="#">SCSS</a></li>'
    numberOfActiveContainers++;
  } catch(ex) { /* do nothing */ }
  try {
    var baseName = page.split('.')[0]
    fs.readFileSync('content/websites/patterns/' + baseName + "/" + baseName + '.js', 'utf-8');
    // output += '<li class="code-menu-item" data-toggle-JS><a href="#">JS</a></li>'
    numberOfActiveContainers++;
  } catch(ex) { /* do nothing */ }

  // output+= '</ul></div>';

  // create the dynamic size for code blocks
  output+= '<style type="text/css">';
  output+= '.code-box.is-active { ' +
            'width: ' + ((1/numberOfActiveContainers)*100) + '%;'+
            ' }';
  output+= '</style>';

  return output;
}
