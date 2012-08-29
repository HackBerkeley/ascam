(function() {
  var client = new BinaryClient('ws://localhost:9001');
  var stream;

  var numImages = 0;
  client.on('open', function() {
    stream = client.createStream({ type : "viewer" });
    stream.on('data', function(data) {
      numImages++;
      var image = $('<img id="' + numImages + '" height="' + $(window).height() + '" src="' + data + '">');
      var wrapper = '#wrapper';//numImages % 2 == 0 ? '#evenwrapper' : '#oddwrapper';
      console.log(wrapper);
      if (numImages > 2) {
        $('#' + (numImages - 2)).remove();
      }
      $(wrapper).append(image);
    });
  });
})();
