$(window).scroll(function() {
  var fromTopPx = 3000;
  var scrolledFromTop = $(window).scrollTop();
  if (scrolledFromTop > fromTopPx) {
    $('.parallax2').addClass('scrolled');
  } else {
    $('.parallax2').removeClass('scrolled');
  }
});

$(window).on('load', function() {
  var id;
  // var modal = document.getElementById('addNote');
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
    $(this).attr('class', 'btn btn-danger');
    $(this).attr('id', 'delete');
    $(this).text("Saved!");
    location.reload();
  });

  $('.delete').on('click', function() {
    id = $(this).closest('.panel').data('id');
    var modal = document.getElementById('removeModal');
    console.log('test52323');
    modal.style.display = "block";

    $(".close").click(function() {
      modal.style.display = "none";
    });

    $(".btn-default").click(function() {
      modal.style.display = "none";
    });

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  });

  $("#delete").on('click', function() {
    console.log('test2342')
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
    location.reload();
    console.log(id);
  });

  $('.btn-warning').on('click', function() {
    var modal = document.getElementById('addNote');
    modal.style.display = "block";
    var thisId = $(this).closest('.panel').data('id');
    console.log(modal)
    $(".close").click(function() {
      modal.style.display = "none";
    });

    $(".btn-default").click(function() {
      modal.style.display = "none";
    });

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    $.ajax({
      method: "GET",
      url: "/stories/" + thisId
    })
    .then(function(data) {
      console.log(data);
      $('.modal-header2').append(`<h2>${data.title}</h2><span class="close">&times;</span>`);
      $('#notes').append("<input id='notetitle' name='title'>");
      $('#notes').append("<textarea id='notebody' name='body'></textarea>");
      $('#notes').append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      if (data.notes.length > 0) {
        console.log('test1');
        for (var i = 0;i < data.notes.length; i++) {
          if (i === 0) {
            $('#savedNotes').append(`<thead><tr><th></th><th>Note Title</th><th>Note Text</th><th>Delete Note</th></tr></thead>`);
          }
            $('#savedNotes').append(`<tbody><tr class='tdata'><td>Note #${i+1}:<td>${data.notes[i].title}</td><td>${data.notes[i].body}</td><td align='center'><button type="button"><em class='glyphicon glyphicon-remove-circle' data-id=${data.notes[i]._id}></em></button></td></tr></tbody>`);
        }
      } else {
        console.log('test2')
        $('#savedNotes').empty();
      }

      $('.glyphicon-remove-circle').on('click', function() {
        console.log($(this).data('id'));
        let noteId = $(this).data('id');
        $.ajax({
          method: "PUT",
          url:'/notes/' + noteId
        })
        .then(function(data) {
          console.log(data);
        });
        $(this).closest('tr').remove();
      });

    });
    $('#savedNotes').empty();
    $("#notes").empty();
    $(".modal-header2").empty();



  });


// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  var modal = document.getElementById('addNote');

  $.ajax({
    method: "POST",
    url: "/stories/" + thisId,
    data: {
      // Value taken from title input
      title: $("#notetitle").val().trim(),
      // Value taken from note textarea
      body: $("#notebody").val().trim()
        }
      })
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
      $(".modal-header2").empty();
      modal.style.display = "none";
      $("#notetitle").val("");
      $("#notebody").val("");
    });
  });




});
