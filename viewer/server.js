var express = require('express');
var app = express.createServer();
var fs = require('fs');

var BinaryServer = require('binaryjs').BinaryServer;
var rooms = {};
var id=0;
var cl;

// Start Binary.js server
var server = BinaryServer({port: 9001});
// Wait for new user connections
server.on('connection', function(client){
  client.on('error', function(e) {
    console.log(arguments);
  });
  client.on('stream', function(stream, meta){ 
    if (meta && meta.type == "viewer") {
      cl = stream;
      console.log("Detected client: ", stream);
    } else {
      console.log("Receiving image data");
      var name = "img/"+id+"-"+(new Date()).getTime()+".jpg";
      var ws = fs.createWriteStream('static/'+name);
      stream.pipe(ws);
      ws.on('close', function() {
        console.log("done writing image");
        notifyClient(name);
      });
      id++;
    }
  });
});

app.use(express.static(__dirname+"/static/"));

app.listen(8000);

var notifyClient = function(name) {
  console.log("notifying client");
  if (cl) {
    cl.write(name);
  }
}
