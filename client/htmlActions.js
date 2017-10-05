 $(document).ready(() => {
   $('.priority').hide();
   $('.tap-target').tapTarget('open');
   $('.tap-target').tapTarget('close');
   $('.user-btn').hide();
   $('.reset-password').click(() => {});
   $('.add-user-btn').click(() => {});
   $('.forgot').click(() => {
     $('#modal1').modal('close');
   });
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
     constrainWidth: false,
     hover: true,
     gutter: 0,
     belowOrigin: false,
     alignment: 'left',
     stopPropagation: false
   });
 });
