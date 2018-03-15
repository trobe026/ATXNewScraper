$(window).on('load', function() {
  // When you click the Save Note button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article by the data-id
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

    // Shows modal on click of notes button with all the articles associated saved notes, and fields to add new notes.
      $('.btn-warning').on('click', function() {
        var modal = document.getElementById('addNote');
        modal.style.display = "block";
        var thisId = $(this).closest('.panel').data('id');
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
          $('.modal-header2').append(`<span class="close">&times;</span><h2>${data.title}</h2>`);
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
    // Delete Note
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
        // Empty Note Modal to prepare for next article's notes
        $('#savedNotes').empty();
        $("#notes").empty();
        $(".modal-header2").empty();
      });
  });
