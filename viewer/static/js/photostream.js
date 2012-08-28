(function() {
  var triggers = {};
  window.events = {
    on : function(type, callback) {
      if (!triggers.type) {
        triggers[type] = [];
      }
      triggers[type].push(callback);
    }
  };
  var trigger = function(type, image) {
    for (var i in triggers[type]){
      if (typeof(triggers[type][i]) == "function") {
        triggers[type][i](image);
      }
    }
  } 
  var client = new BinaryClient('ws://192.168.1.19:9001');
  var stream;

  client.on('open', function() {
    stream = client.createStream({ type : "viewer" });
    stream.on('data', function(data) {
      trigger("image", data);
    });
  });
})();
