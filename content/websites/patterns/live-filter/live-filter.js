window.addEventListener('load',function() {
  $(document).ready(function() {
    $('#livefilterdemo').liveFilter({
      delay: 200, // how long between keystroke and filter
      analyticsLogging: false, // log to google analytics through foundationExtendEBI.js
      fitlerTargetCustomDiv: 'div.live-filter-target-granularity',
      defaultText: 'Type to filter these paper references',
      noMatches: '<p>No matching papers found.</p><a class="button" href="#">You could add a link to advanced search</a> '
      // for further plugin option guidance, see: https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/libraries/LiveFilter/js/jquery.liveFilter.js
    });
  });
});
