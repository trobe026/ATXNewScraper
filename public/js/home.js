// change background when 4000px below top is reached
$(window).scroll(function() {
  var fromTopPx = 4000;
  var scrolledFromTop = $(window).scrollTop();
  if (scrolledFromTop > fromTopPx) {
    $('.parallax2').addClass('scrolled');
  } else {
    $('.parallax2').removeClass('scrolled');
  }
});

$(window).on('load', function() {
  // saves article on click of 'save' button, changes button
  var id;
  $(".btn-success").on('click', function() {
    id = $(this).closest('.panel').data('id');
    $.ajax({
      method: "PUT",
      url: "/stories/" + id,
      data: {
        saved: true
      }
    })
    .then(function(data) {
      console.log(data);
    });
    console.log('test')
    console.log(id);
    $(this).attr('class', 'btn btn-info');
    $(this).attr('id', 'delete');
    $(this).text("Saved!");
  });

// if same Saved button clicked again, removes saved property and changes button back
  $("#deleteNoLoad").on('click', function() {
    $(this).attr('class', 'btn btn-success');
    $(this).text("Save");
    $.ajax({
      method: "PUT",
      url: "/stories/" + id,
      data: {
        saved: false
      }
    })
    .then(function(data) {
      console.log(data);
    });
  });
});
