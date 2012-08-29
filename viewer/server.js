var express = require('express');
var app = express.createServer();
var fs = require('fs');

var BinaryServer = require('binaryjs').BinaryServer;

var id=0;
var cl;

// Start Binary.js server
var server = new BinaryServer({port: 9001});
// Wait for new user connections
server.on('connection', function(client){
  client.on('error', function(e) {
    cl = undefined;
    console.log('Error occured', e.message, e.stack);
  });
  client.on('close', function(){
   cl = undefined;
  });
  client.on('stream', function(stream, meta){ 
    if (meta && meta.type == "viewer") {
      cl = stream;
      console.log("Detected client: ", stream);
    } else {
      console.log("Receiving image " + id);
      var name = "img/"+id+"-"+(new Date()).getTime()+".jpg";
      var ws = fs.createWriteStream('static/'+name);
      ws.on('close', function() {
        notifyClient(name);
      });
      stream.pipe(ws);
      id++;
    }
  });
});

app.use(express.static(__dirname+"/static/"));

app.listen(8000);

var notifyClient = function(name) {
  if (cl) {
    cl.write(name);
  }
}
