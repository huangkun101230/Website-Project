var pSlideIndex = 0;
var screenWide = document.body.clientWidth;
var containerWidth = $(".page-container").outerWidth();
$(window).resize();
console.log("screen wide: " + screenWide);



//menu switch function
$(document).ready(function () {
  $(".header").css("width",containerWidth);
  $(".bw-gradient").css("width",containerWidth);
  $(window).on('scroll', function () {
    if ($(window).scrollTop()) {
      $(".sub-header").addClass('active');
      $(".sub-header").css("width",containerWidth);
    } else {
      $(".sub-header").removeClass('active');
    }
  });
});


// back to top button
var timer = null;
var test = document.getElementById('backtopbuttonid');
console.log(test);
test.style.display = "none";
test.onclick = function () {
  cancelAnimationFrame(timer);

  //get current milliseconds
  var startTime = +new Date();
  //get current screen position
  var b = document.body.scrollTop || document.documentElement.scrollTop;
  var d = 500;
  var c = b;
  timer = requestAnimationFrame(function func() {
    var t = d - Math.max(0, startTime - (+new Date()) + d);
    document.documentElement.scrollTop = document.body.scrollTop = t * (-c) / d + b;
    timer = requestAnimationFrame(func);
    if (t == d) {
      cancelAnimationFrame(timer);
    }
  });
}


$(function () {
  $(window).scroll(function () {  // display the back-top button
    var height = document.documentElement.scrollTop + document.body.scrollTop; // get the height after scroll
    if (height > 300) {  // after 300, display
      $("#backtopbuttonid").fadeIn(400); // display
    } else {
      $("#backtopbuttonid").stop().fadeOut(400); // otherwise, non-display
    }

  });
});

var open = false;

// menu icon collapse function
$(document).ready(function () {
  var windowSize = $(window).width();

  if (windowSize <= 965) {
    $(window).on('scroll', function () {
      if ($(window).scrollTop()) {
        open = false;
        $(".sub-header ul").css({height: "0"})
      }
    });

    $("#menuiconid").click(function () {
      if (open == false) {
        open = true;
        $(".sub-header ul").css({height: "auto"})
      } else {
        open = false;
        $(".sub-header ul").css({height: "0"})
      }
    });
  }
});


// picwall wrap text
// Wrap every letter in a span
document.addEventListener('DOMContentLoaded', function() {
  $('.wraptext').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|'|&|\w)/g, "<span class='letter'>$&</span>"));
  });
  var basicTimeLine = anime.timeline();

  basicTimeLine
    .add({
      targets: '.wraptext',       // add .letter
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 1500,
      delay: function (el, i) {
        return 150 * (i + 1)
      }
    })
    // .add({
    //   targets: '.wraptext',
    //   opacity: 0,
    //   duration: 1000,
    //   easing: "easeOutExpo",
    //   delay: 8000
    // });

}, false);


projectSlides(pSlideIndex);
var num;
//project slides function
function projectSlides(index) {
  var i;
  var pSlides = document.getElementsByClassName("project");
  num = pSlides.length;
  for (i = 0; i < pSlides.length; i++) {
    pSlides[i].style.display = "none";
  }

  if (index < 0) {
    index = pSlides.length - 1;
    pSlideIndex = index;
  }
  else if (index > pSlides.length) {
    index = 0;
    pSlideIndex = index;
  }

  index++;

  for (i = 0; i < pSlides.length; i++) {
    pSlides[i].className = pSlides[i].className.replace(" active", "");
  }

  pSlides[index - 1].className += " active";
  pSlides[index - 1].style.display = "inline-block";

}


function prevIconClick() {
  pSlideIndex -= 1;
  projectSlides(pSlideIndex);
}


function nextIconClick() {
  if (pSlideIndex > num-2) {
    pSlideIndex = 0;
  } else {
    pSlideIndex += 1;
  }

  projectSlides(pSlideIndex);
}






