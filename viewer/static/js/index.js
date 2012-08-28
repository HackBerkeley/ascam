
(function() {

  $(document).ready(function(){
    elements = [];
    filters = [];
    events.on('image', function(image) {
      addImg(image);
    });
    
    var dim = 4;
    var size = 500;
    var padoffset = 40;
    var aspectratio = 4/3;
    var wrapper = $("#wrapper");
    var height = size/dim;

    
    function render() {
      for(var i=0; i<elements.length; i++) {
        elements[i].css("display","block");
        console.log(elements[i].val());
        $("#div"+i).append(elements[i]);
      }
    }
    
    
    
    function imgFilter(image, el) {
      console.log("Filtering image:",image);
      Caman(image, "#canvas"+image.substring(4,image.length-4), function () {
        this
          .saturation(20)
          .gamma(1.4)
          .vintage()
          .contrast(5)
          .exposure(15)
          .vignette(300, 60)
          .render(function() {
            render();
          })
      });  
    }
    
    //DEBUG
    window.addImg = addImg;
    
    function addImg(image) {
      console.log("Adding image:",image);
      
      var canv = $("<canvas id='canvas"+image.substring(4,image.length-4)+"'/>", { width : height*aspectratio + "px", height : height+"px"});
      canv.css("width", height*aspectratio + "px");
      canv.css("height", height+"px");
      canv.css("display","none");
      elements.unshift(canv);
      console.log(elements);
      if(elements.length > dim*dim) {
        elements.pop();
      }
      $("body").append(canv)

      imgFilter(image);
    }
    wrapper.width(size*aspectratio + padoffset);
    var height = size/dim
    for(var i = 0; i<dim; i++) {
      for(var j = 0; j<dim; j++) {
      var index = i*dim + j;
        var div = $("<div id='div" + index + "'/>");
        div.addClass("tile");
        div.css("width", height*aspectratio + "px");
        div.css("height", height + "px");
        wrapper.append(div);
      }
      wrapper.append("<br/>");
    }
  });
  
  
  
})();
