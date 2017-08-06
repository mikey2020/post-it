 $(document).ready(() => {
   $('.user-btn').hide();
    $('.add-user-btn').click(() => {
      console.log("i was clicked sir");
    });
    $('.priority').hide();
    $('#priority-level').css('background', 'blue');
    $('.modal').modal();
    $('.priority-level').change(() => {
      $('.priority').show();
      const priority = $('#priority-level').val();
      if (priority > 1 && priority < 6) {
        $('#priority-level').css('color', 'blue');
      } else if (priority > 6 && priority < 11) {
        $('#priority-level').css('color', 'green');
      } else {
        $('#priority-level').css('color', 'red');
      }
    });
 });
