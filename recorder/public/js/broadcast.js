var ascii;

var video;
var canvas;
var ctx;
var localMediaStream;
var client;
var open;
function init(){
  client = new BinaryClient('ws://192.168.1.16:9001');
  client.on('open', function(){
    open = true;
  });
  client.on('close', function(){
    open = false;
  });
  client.on('error', function(){
    open = false;
  });
};

init();



client.on('open', function(){});


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
      counter = counter + 1;
      if (mod == 0) {
        frame();
      } else {
        $("#counter").text('0:0' + (5 - mod));
      }
    }, 1000);
  }, fail);
});

function frame() {
  if (localMediaStream) {
    console.log("frame() triggered after 5 seconds");

    
    ctx.drawImage(video, 0, 0, 800, 600);
    
    $(canvas).show();
    
    if(open) {
      canvas.toBlob(
          function (blob) {
            client.send(blob);
          },
          'image/jpeg'
      );
    } else {
      init();
    }
    
    setTimeout(function(){
      $(canvas).hide();
    }, 1000);
    
    //var data = ctx.getImageData(0,0, 100,75).data;
    
    // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
   // document.querySelector('img').src = canvas.toDataURL('image/webp');
   
  }
}
