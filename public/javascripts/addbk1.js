<script type='text/javascript'>
$("#myform").submit(function() {

    var url = '/addlink'; // the script where you handle the form input.

    $.ajax({
           type: "POST",
           url: url,
           data: $("#myform").serialize(), // serializes the form's elements.
           success: function(data)
           {
		       alert('Added');
			   $("#myform")[0].reset();
           }
         });

    return false; // avoid to execute the actual submit of the form.
});

</script>