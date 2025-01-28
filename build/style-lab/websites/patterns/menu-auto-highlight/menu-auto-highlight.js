// Currently this uses jQuery, but could be done without
// Pull Requests welcome! :P
function setNavigation() {
  var path = window.location.pathname;
  console.log('current path:', path)
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path);

  $("#local-nav a").each(function () {
    var href = $(this).attr('href');
    if (path.substring(0, href.length) === href) {
      $(this).closest('li').addClass('active');
    }
  });
}

$(function () {
  // when jquery is ready...
  setNavigation();
});
