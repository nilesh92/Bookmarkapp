<script type='text/javascript'>
    /* attach a submit handler to the form */
    $("#myform").submit(function(event) {

      /* stop form from submitting normally */
      event.preventDefault();

      /* get some values from elements on the page: */
      var $form = $( this ),
          url = $form.attr( 'action' );

      /* Send the data using post */
      var posting = $.post( url, { link: $('#link').val(), tags: $('#tags').val() } );
      $("#myform")[0].reset();
      /* Alerts the results */
      posting.done(function( data ) {
	    
        alert('success');
      });
    });
</script>