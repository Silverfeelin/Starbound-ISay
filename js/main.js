/////////////
/* General */
/////////////

// Page load
$(function() {
  "use strict";
  
  // Set feature background image based on time of day.
  var time = new Date().getHours(), path;
  
  path = time >= 18 || time < 6 ? "imgs/bgNight.jpg" : "imgs/bgDay.jpg";
  
  document.getElementById("featureBackground").style.backgroundImage = "url('" + path +  "')";
});