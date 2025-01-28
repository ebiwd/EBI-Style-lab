$( document ).ready(function() {
  function conditionalElementsEBI(watchedParentClass) {
    var watchedParentClass = watchedParentClass || '.conditional-form';

    $(watchedParentClass).on('change', function(){
      var activeSet = this;
      $(activeSet).children().each(function(){
        if ($(this).data('condition')) {
          var conditionTarget = '#' + $(this).data('condition'),
              conditionRequirement = $(this).data('condition-val') || 1;

          if ($(conditionTarget).val() == conditionRequirement) {
            $(this).removeClass('hidden');
          } else {
            $(this).addClass('hidden');
          }
        }
      });
    });
  }

  // bootstrap it
  conditionalElementsEBI();
});
