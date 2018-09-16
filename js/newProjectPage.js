$(document).ready(function () {
  $(window).on('scroll', function () {
    if ($(window).scrollTop()) {
      $(".sub-header").addClass('active');
    } else {
      $(".sub-header").removeClass('active');
    }
  });
});


// back to top button
var timer = null;
var test = document.getElementById('backtopbuttonid');
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


//project slider

function C_slider(frame, list, Lframe, Llist, forwardEle, forwardEle2, backEle, backEle2, scrollType, LscrollType, acitonType, autoInterval) {
  this.frame = frame;
  this.list = list;
  this.Lframe = Lframe;
  this.Llist = Llist;
  this.forwardEle = forwardEle;
  this.forwardEle2 = forwardEle2;
  this.backEle = backEle;
  this.backEle2 = backEle2;
  this.scrollType = scrollType;
  this.LscrollType = LscrollType;
  this.acitonType = acitonType;
  this.autoInterval = autoInterval;
  this.slideLength = $("#" + this.Llist + " > li").length;//slider num
  this.currentSlide = 0;
  this.FrameWidth = $("#" + this.frame).width();
  this.FrameHeight = $("#" + this.frame).height();
  this.lFrameWidth = $("#" + this.Lframe).width();
  this.lListWidth = $("#" + this.Llist + " >li").eq(0).outerWidth(true);
  var self = this;
  for (var i = 0; i < this.slideLength; i++) {
    $("#" + this.Llist + " > li").eq(i).data("index", i);
    $("#" + this.Llist + " > li").eq(i).bind(this.acitonType, function () {
      self.go($(this).data("index"));
    });
  }
  ;
  // last & next action
  $("#" + this.forwardEle).bind('click', function () {
    self.forward();
    return false;
  });
  $("#" + this.backEle).bind('click', function () {
    self.back();
    return false;
  });
  // last & next action
  $("#" + this.forwardEle2).bind('click', function () {
    self.forward();
    return false;
  });
  $("#" + this.backEle2).bind('click', function () {
    self.back();
    return false;
  });
  //mouse hover
  $("#" + this.frame + ",#" + this.Lframe + ",#" + this.forwardEle + ",#" + this.backEle).bind('mouseover', function () {
    clearTimeout(self.autoExt);
  });
  $("#" + this.frame + ",#" + this.Lframe + ",#" + this.forwardEle + ",#" + this.backEle).bind('mouseout', function () {
    clearTimeout(self.autoExt);
    self.autoExt = setTimeout(function () {
      self.extInterval();
    }, self.autoInterval);
  });
  //auto switch
  // this.autoExt = setTimeout(function () {
  //   self.extInterval();
  // }, this.autoInterval);
}

//move action
C_slider.prototype.go = function (index) {
  this.currentSlide = index;
  if (this.scrollType == "left") {
      $("#" + this.list).animate({
        marginLeft: (-index * this.FrameWidth-2.5) + "px"
      }, {duration: 600, queue: false});
  }
  $("#" + this.Llist + " > li").removeClass("cur");
  $("#" + this.Llist + " > li").eq(index).addClass("cur");

  //Thumbnail move action
  if (this.LscrollType == "left") {
    if (this.slideLength * this.lListWidth > this.lFrameWidth) {
      var spaceWidth = (this.lFrameWidth - this.lListWidth) / 2;
      var hiddenSpace = this.lListWidth * this.currentSlide - spaceWidth;
      if (hiddenSpace > 0) {
        if (hiddenSpace + this.lFrameWidth <= this.slideLength * this.lListWidth) {
          $("#" + this.Llist).animate({
            marginLeft: -hiddenSpace + "px"
          }, {duration: 600, queue: false});
        } else {
          var endHidden = this.slideLength * this.lListWidth - this.lFrameWidth;
          $("#" + this.Llist).animate({
            marginLeft: -endHidden + "px"
          }, {duration: 600, queue: false});
        }
      } else {
        $("#" + this.Llist).animate({
          marginLeft: "0px"
        }, {duration: 600, queue: false});
      }
    }
  }
}
//forward
C_slider.prototype.forward = function () {
  if (this.currentSlide < this.slideLength - 1) {
    this.currentSlide += 1;
    this.go(this.currentSlide);
  } else {
    this.currentSlide = 0;
    this.go(0);
  }
}
//backward
C_slider.prototype.back = function () {
  if (this.currentSlide > 0) {
    this.currentSlide -= 1;
    this.go(this.currentSlide);
  } else {
    this.currentSlide = this.slideLength - 1;
    this.go(this.slideLength - 1);
  }
}
C_slider.prototype.extInterval = function () {
  if (this.currentSlide < this.slideLength - 1) {
    this.currentSlide += 1;
    this.go(this.currentSlide);
  } else {
    this.currentSlide = 0;
    this.go(0);
  }
  var self = this;
  this.autoExt = setTimeout(function () {
    self.extInterval();
  }, this.autoInterval);
}
var goSlide1 = new C_slider("big_frame", "big_list", "small_frame", "small_list", "forward", "forward_b", "back", "back_b", "left", "left", "click", 9000);



