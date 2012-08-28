(function() {
  events.on('image', function(image) {
    $("body").prepend("<img src='"+image+"'></img>");
  });
})();
