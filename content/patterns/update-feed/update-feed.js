var feedTemplate = '{{#each item}}'+
    '<div class="padding-top-medium">'+
      '<span class="label">{{pubDate}}</span>'+
      '<h6><a href="{{link}}" class="readmore">{{title}}</a></h6>'+
    '</div>'+
  '{{/each}}';

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    // feed processor
    function HandlebaRss(feedUrl,template,destination){
      this.feedUrl = feedUrl;
      this.template = template;
      this.destination = destination;
    }
    HandlebaRss.prototype.init = function(){
      function queryData(properties) {
        $.ajax({
          url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22'+ encodeURIComponent(properties.feedUrl)+'%22limit%206&&format=json&diagnostics=false&_maxage=3600',
          template:    properties.template,
          destination: properties.destination
        }).done( function(data) {
          console.log(data);
          if (data.query.results.item.length > 0) {
            var template = Handlebars.compile(properties.template);
            $(properties.destination).html(template(data.query.results));
          } else {
            // retry if 0 length
            window.setTimeout(queryData(properties), 500);
          }
        });
      }

      queryData(this); // bootstrap
    }

    newsUpdates =  new HandlebaRss("http://www.ebi.ac.uk/about/news/service.xml",feedTemplate, "#news-updates").init();
  }
}
