
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
      var count = 0;
      for (var i = 0; i< elements.length;i++) {
         var temp = function(index) {
          setTimeout(function() {
            elements[index].animate({ "opacity":0 }, 300);
            count++;
            if (count == elements.length) {
              for(var i=0; i<elements.length; i++) {
                if (i>0) {
                  w = height*aspectratio; 
                  h = height; 
                  elements[i].css("width",w+"px");
                  elements[i].css("height",h+"px");
                }
                if (i == dim*dim-1) {
                  $("#div"+i).html("");
                }
                elements[i].css("opacity","0");
                elements[i].css("display","block");
                $("#div"+i).append(elements[i]);
                (function(ind) {
                  setTimeout(function() {
                    elements[ind].animate({ "opacity":1 }, 300);
                    count++;
                  }, ind*200);
                })(i);
              }
            }
          }, index*200);
        };
        console.log("render");
        temp(i);
      }
    }
    
    
    
    function imgFilter(image, el) {
      console.log("Filtering image:",image);
      Caman(image, "#canvas"+image.substring(4,image.length-4), function () {
        this
          .saturation(20)
          .gamma(1.4)
          .lomo()
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
      canv.css({"width":"100%"});
      canv.css({"height":"100%"});
      console.log(canv);
      canv.css("display","none");
      elements.unshift(canv);
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
        if (index != 0) {
          div.css("width", height*aspectratio + "px");
          div.css("height", height + "px");
        } else {
          div.css("width", "800px");
          div.css("height", "600px");
        }
        wrapper.append(div);
      }
      wrapper.append("<br/>");
    }
  });
  
  
  
})();
