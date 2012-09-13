var ascii;
var video;
var canvas;
var code;
var ctx;
var localMediaStream;
var codeM;
var counter = 0;
var delay =  5;
var testTimeout;
var passing = true;

var imageFilter;

function fail(){
  alert('Only Chrome 21+ is supported right now. Sorry!');
}
// Not showing vendor prefixes or code that works cross-browser.
navigator.webkitGetUserMedia({video: true}, function(stream) {
  video.src = window.webkitURL.createObjectURL(stream);
  localMediaStream = stream;
  $('#start').show();
}, fail);


$(function(){
  video = document.getElementById('v');
  canvas = document.getElementById('c');
  ascii = document.getElementById("ascii");
  code = document.getElementById('code');
  ctx = canvas.getContext('2d');
  var saved = localStorage.getItem('c');
  codeM = CodeMirror(code, {
    lineWrapping: true,
    theme: 'ambiance',
    onChange: testCode,
    value: saved || ''
  });
  codeM.setSize(451, 318);
  if(saved) {
    testCode();
  }
  $('#startbtn').click(function(){
    if(counter == 0) {
      $('#btntext').addClass('grey');
      loop();
    }  
  });
});

function loop(){
  counter++;
  if (counter == delay) {
    frame();
    counter = 0;
    $('#btntext').removeClass('grey');
    $('#ind').hide().css('opacity', 0);
  } else {
    $('#ind').show().css('opacity', 1);
    if(counter !== delay-1){
      setTimeout(function(){
        $('#ind').css('opacity', 0);
      }, 500);
    }
    setTimeout(function(){
      loop();
    }, 1000);
  }
}

function frame() {
  if (localMediaStream) {
    $('#f').css('opacity', 1).animate({'opacity': 0}), 200;
    $(canvas).css('height', '400px');
    ctx.drawImage(video, 0, 0, 533, 400);
    if(imageFilter){
      filterize();
    }
    $(canvas).show();
    
      canvas.toBlob(
          function (blob) {
          
            var src = webkitURL.createObjectURL(blob);
            var thumb = $('<div></div>').addClass('thumb').append($('<img>').prop('width', 100).prop('src', src)).appendTo('#thumbs').click(function(){
              window.open(src);
            });
            
          },
          'image/jpeg'
      );
    setTimeout(function(){
      $(canvas).animate({height: 0});
    }, 1000);
  }
}

function filterize(){
  var data = ctx.getImageData(0,0,533,400);
  var img = data.data;
  var w = 533;
  var h = 400;
  
  var pixels = [];
  
  for (var y = 0; y < h; y++) {
    var row = y*w*4;
    for(var x = 0; x < w; x++) {
      var loc = row+x*4;
      var r = img[loc];
      var g = img[loc+1];
      var b = img[loc+2];
      pixels.push({x: x, y: y, r: r, g: g, b: b});
    }
  }
  imageFilter(pixels);
  for(var i = 0, ii = pixels.length; i < ii; i++) {
    var out = pixels[i];
    var loc = i*4;
    img[loc] = out.r;
    img[loc+1] = out.g;
    img[loc+2] = out.b; 
  }
  
  ctx.putImageData(data, 0, 0);
}

function testCode(){
  clearTimeout(testTimeout);
  passing = false;
  var c = codeM.getValue();
  localStorage.setItem('c', c);
  $('#msg').removeClass('r g y').addClass('y').text('...');
  testTimeout = setTimeout(function(){
    testTimeout = undefined;
    c = 'function filter(pixels){' + c + '; return pixels; }';
    try {
      eval(c);
      filter([{x: 0, y: 0, r: 0, g: 0, b: 0}]);
      $('#msg').removeClass('y').addClass('g').text('Successfully compiled');
      imageFilter = filter;
      passing = true;
    } catch (e) {
      var e = e.stack.split('\n');
      $('#msg').removeClass('y').addClass('r').text(e[0]);
    }
  }, 500);
}
