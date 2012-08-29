
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
         (function(index) {
          setTimeout(function() {
            elements[index].animate({ "opacity":0 }, 300);
            if (index == 0) {
              setTimeout(function() {
                elements[0].animate({ "opacity":1 }, 800);
              }, 400);
            }
            count++;
            if (count == elements.length) {
              for(var i=0; i<elements.length; i++) {
                if (i>0) {
                  w = height*aspectratio; 
                  h = height; 
                }
                if (i == dim*dim-1) {
                  $("#div"+i).html("");
                }
                elements[i].css("display","block");
                $("#div"+i).append(elements[i]);
                (function(ind) {
                  if (ind != 0) {
                    setTimeout(function() {
                      elements[ind].animate({ "opacity":1 }, 300);
                    }, ind*100);
                  }
                })(i);
              }
            }
          }, index*100);
        })(i);
      }
    }
    
    function blackWhiteBulbFilter() {
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
    }
    
    function lomoFilter() {
      this
        .lomo()
        .render(function() {
          render();
        })
    }
    
    function sinCityFilter() {
      this
        .sinCity()
        .render(function() {
          render();
        })
    }
    
    function crossProcessFilter() {
      this
        .crossProcess()
        .render(function() {
          render();
        })
    }
    
    function grungyFilter() {
      this
        .grungy()
        .render(function() {
          render();
        })
    }
    
    function hemingwayFilter() {
      this
        .hemingway()
        .render(function() {
          render();
        })
    }
    
    function herMajestyFilter() {
      this
        .herMajesty()
        .render(function() {
          render();
        })
    }
    
    function hazyDaysFilter() {
      this
        .hazyDays()
        .render(function() {
          render();
        })
    }
    
    function jarquesFilter() {
      this
        .jarques()
        .render(function() {
          render();
        })
    }
    
    function loveFilter() {
      this
        .love()
        .render(function() {
          render();
        })
    }
    
    function nostalgiaFilter() {
      this
        .nostalgia()
        .render(function() {
          render();
        })
    }
    
    function oldBootFilter() {
      this
        .oldBoot()
        .render(function() {
          render();
        })
    }
    
    function orangePeelFilter() {
      this
        .orangePeel()
        .render(function() {
          render();
        })
    }
    
    function pinholeFilter() {
      this
        .pinhole()
        .render(function() {
          render();
        })
    }
    
    function sunriseFilter() {
      this
        .sunrise()
        .render(function() {
          render();
        })
    }
    
    function vintageFilter() {
      this
        .vintage()
        .render(function() {
          render();
        })
    }
    
    filters.push(vintageFilter);
    filters.push(sunriseFilter);
    filters.push(pinholeFilter);
    filters.push(orangePeelFilter);
    filters.push(oldBootFilter);
    filters.push(nostalgiaFilter);
    filters.push(loveFilter);
    filters.push(jarquesFilter);
    filters.push(hazyDaysFilter);
    filters.push(herMajestyFilter);
    filters.push(hemingwayFilter);
    filters.push(grungyFilter);
    filters.push(crossProcessFilter);
    filters.push(sinCityFilter);
    filters.push(blackWhiteBulbFilter);
    filters.push(lomoFilter);
    
    function imgFilter(image, el) {
      console.log("Filtering image:",image);
      Caman(image, "#canvas"+image.substring(4,image.length-4), filters[Math.floor(Math.random()*(filters.length-1))])
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
          div.css("width", 708+"px");
          div.css("height", Math.floor(708/aspectratio)+"px");
        }
        wrapper.append(div);
      }
      wrapper.append("<br/>");
    }
  });
  
  
  
})();
