setTimeout(function() {
  jQuery("body.google-analytics-loaded #user-feedback").on('mousedown', 'a', function(e) {
    analyticsTrackInteraction(e.target,'User feedback');

    $(this).closest(".question").addClass("hidden");
    $(this).closest("#user-feedback").find('.response').removeClass("hidden");

    e.preventDefault();
  });
}, 900); // wait a moment for GA to load
