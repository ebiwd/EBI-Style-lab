var feedTemplate = '{{#each item}}'+
    '<div class="padding-top-medium">'+
      '<span class="label">{{pubDate}}</span>'+
      '<h6><a href="{{link}}" class="readmore">{{title}}</a></h6>'+
    '</div>'+
  '{{/each}}';

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    // feed processor
    function feedImporter(feedUrl,template,destination){
      this.feedUrl = feedUrl;
      this.template = template;
      this.destination = destination;
    }
    feedImporter.prototype.init = function(){
      function queryData(properties) {
        $.ajax({
          // here we use YQL to translate the RSS into JSON, but you could easily pass in your JSON here
          url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22'+ encodeURIComponent(properties.feedUrl)+'%22limit%206&&format=json&diagnostics=false&_maxage=3600',
          template:    properties.template,
          destination: properties.destination
        }).done( function(data) {
          // here you need to map your JSON structure
          var mappedData = data.query.results,
              template = Handlebars.compile(properties.template);
          $(properties.destination).html(template(mappedData));
        });
      }
      queryData(this); // bootstrap
    }

    newsUpdates = new feedImporter("http://www.ebi.ac.uk/about/news/service.xml",feedTemplate, "#news-updates").init();
  }
}
