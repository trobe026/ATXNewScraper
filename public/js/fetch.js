console.log('test')
$(window).scroll(function() {
  var fromTopPx = 3000;
  var scrolledFromTop = $(window).scrollTop();
  if (scrolledFromTop > fromTopPx) {
    $('.parallax2').addClass('scrolled');
    console.log('test2')
  } else {
    $('.parallax2').removeClass('scrolled');
    console.log('test3')
  }
});
