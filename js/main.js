// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.
	function searchImages(tags){
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		  $.getJSON( flickerAPI, {
			tags: tags,
			tagmode: "any",
			format: "json"
		  })
			.done(function( data ) {
			  $('.placeholder').hide();
			  $('li.row').remove();

			  $.each( data.items, function( i, item ) {
				var container = $('<li class="row">'); 
				$( '<img>' ).attr( "src", item.media.m ).attr("title",item.title).attr("alt",item.description).appendTo(container);
				$('<p></p>').text("Title : "+item.title).appendTo(container);
				$('<p></p>').text("Date : "+item.date_taken).appendTo(container);
				$('<p></p>').text("Author : "+item.author).appendTo(container);
				$('<p></p>').text("Link : "+item.link).appendTo(container);
				$('<button class="btn details-btn btn-primary" data-toggle="modal" data-target="#infoModal"></button>').text("Desciptions").attr("data-title",item.title).attr("data-desc",item.description).appendTo(container);
 
				container.appendTo( "#images" );
				  // set max ammount of pic to display
				if ( i === 9 ) {
				  return false;
				}
			  });
			});
	}

    // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.

    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.
		$('button.search').click(function(){
			event.preventDefault();
			var tags = $('input[name="searchText"]').val();
			searchImages(tags);
		});

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target
	$(".details-btn").click();
	$('#infoModal').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget);
	  var title = button.data('title');
	  var desc = button.data('desc');
	  var modal = $(this);
	  modal.find('.modal-title').text(title);
	  modal.find('.modal-body').html(desc);
	});

});
