 $(document).ready(() => {
   // $('.dropdown-button').dropdown('open');
   $('.tap-target').tapTarget('open');
   $('.tap-target').tapTarget('close');
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
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
 });
