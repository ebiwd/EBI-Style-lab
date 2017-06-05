// Forked from https://css-tricks.com/automatic-table-of-contents/
var output = "<nav role='navigation'><h4>Table of Contents</h4><ul>";

$("#main-content-area h2, #main-content-area h3").each(function() {
  var el = $(this),
      title = el.text();

  // create ids if they don't yet exist
  if (el.attr("id") == undefined) {
    el.attr("id", title.split(" ").join("-").toLowerCase());
  }
  output += "<li><a href='#" + el.attr("id") + "'>" + title + "</a></li>";
});

output +="</ul></nav>";

$(".table-of-contents").prepend(output);
