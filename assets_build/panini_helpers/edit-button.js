var fs = require('fs')
module.exports = function(path, type) {
  try {
    var githubpath = 'https://github.com/ebiwd/EBI-Style-lab/edit/master';

    var classes = 'button small secondary edit-button float-right';

    if (type === 'section')
      return '<a class="'+classes+'" targe="_blank" href="' + githubpath + '/assets_site/partials/' + path + '">Edit ' + type + '</a>';
    if (type === 'layout')
      return '<a class="'+classes+'" targe="_blank" href="' + githubpath + '/assets_site/layouts/' + path + '.html">Edit ' + type + '</a>';
    if (type === 'page')
      return '<a class="'+classes+'" targe="_blank" href="' + githubpath + '/assets_site/pages/' + path + '/index.html">Edit ' + type + '</a>';
  }
  catch(ex) {
    return null;
  }
}
