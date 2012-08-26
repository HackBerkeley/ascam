(function() {
  var client = new BinaryClient('ws://localhost:9001');
  var stream;

  client.on('open', function() {
    stream = client.createStream({ type : "viewer" });
    stream.on('data', function(data) {
      $("body").prepend("<img src='"+data+"'></img>");
    });
  });
})();
