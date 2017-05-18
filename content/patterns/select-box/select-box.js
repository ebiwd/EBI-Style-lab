document.addEventListener('DOMContentLoaded', function() {
  var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
    delimiter: ',',
    editItems: true,
    maxItemCount: 5,
    removeItemButton: true,
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var supportFormSelect = new Choices('#topic', {
    removeItemButton: true,
  });
});
