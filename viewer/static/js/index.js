
(function() {
  $(document).ready(function(){
    images = [];
    events.on('image', function(image) {
      addImg(image);
    });
    function render() {
      for(var i = 0; i<dim; i++) {
        for(var j = 0; j<dim; j++) {
          var index = i*dim + j;
          if(index<images.length) {
            $("#"+i+""+j).attr("src",images[index]);
          }
        }
      }
    }
    
    function addImg(image) {
      console.log(image);
      images.unshift(image);
      render();
    }
    var dim = 4;
    var size = 500;
    var padoffset = 40;
    $("#wrapper").width(size*4/3 + padoffset);
    var height = size/dim
    for(var i = 0; i<dim; i++) {
      for(var j = 0; j<dim; j++) {
        var img = $("<img id='" + i + "" + j + "'/>");
        img.addClass("tile");
        img.css("width", height*(4/3) + "px");
        img.css("height", height + "px");
        $("#wrapper").append(img);
      }
      $("#wrapper").append("<br/>");
    }
  });
  
  
  
})();
