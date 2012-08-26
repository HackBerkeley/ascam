var ascii;

var video;
var canvas;
var ctx;
var localMediaStream;

var client = new BinaryClient('ws://'+window.location.hostname+':9001');
var stream;
client.on('open', function(){
  stream = client.createStream();
});


$(function(){
  video = document.getElementById('v');
  canvas = document.getElementById('c');
  ascii = document.getElementById("ascii");
  
  ctx = canvas.getContext('2d');

  function fail(){
    alert('fail');
  }
  
  // Not showing vendor prefixes or code that works cross-browser.
  navigator.webkitGetUserMedia({video: true}, function(stream) {
    video.src = window.webkitURL.createObjectURL(stream);
    localMediaStream = stream;
    var counter = 0;
    setInterval(function() {
      var mod = counter % 5;
      if (mod == 0) {
        frame();
      } else {
        $("#id").text((5 - mod) + "...");
      }
      counter = counter + 1;
    }, 1000);
  }, fail);
});

function frame() {
  if (localMediaStream) {
    console.log("frame() triggered after 5 seconds");

    /*
    ctx.drawImage(video, 0, 0, 100, 75);
    var data = ctx.getImageData(0,0, 100,75).data;
    asciiWorker.postMessage(data);
    // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
   // document.querySelector('img').src = canvas.toDataURL('image/webp');
   */
  }
}
