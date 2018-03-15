$(window).on('load', function() {

  // Modal Prompt to remove article from saved list
    $('.delete').on('click', function() {
      id = $(this).closest('.panel').data('id');
      var modal = document.getElementById('removeModal');
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
  // Removes article from saved list on click of thumbs up
    $("#delete").on('click', function() {
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
    });
  });
