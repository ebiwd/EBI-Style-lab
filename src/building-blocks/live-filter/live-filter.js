window.addEventListener('load',function() {
  $(document).ready(function() {
    $('#livefilterdemo').liveFilter({
      fitlerTargetCustomDiv: 'div.live-filter-target-granularity',
      defaultText: 'Type to filter these paper references',
      noMatches: '<p>No matching papers found.</p><a class="button" href="#">You could add a link to advanced search</a> '
    });
  });
});
