 $(document).ready(() => {
   $('.user-btn').hide();
   // $('.new-password').hide();
   $('.reset-password').click(() => {
      //$('.new-password').show();
   })
    $('.add-user-btn').click(() => {
      console.log("i was clicked sir");
    });
    $('#sign-in').click(() => {
      $('#signin').hide();
    })
    $('.priority').hide();
    $('#priority-level').css('background', 'blue');
    $('.modal').modal();
    $('#textarea1').val('New Text');
    $('#textarea1').trigger('autoresize');
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
