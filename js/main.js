//function to clear items in an element
function clearItem(element) {
	$(element).remove();
}
//function to append items to an element
function appendItem(elementToAppendTo, array, totalHits) {
	//total hit counter at top of returned items
	$(elementToAppendTo).html("<h3 class='hits'>Total Hits: "+totalHits+"</h3><br>");
	//for each item in the array...
	for (let i = 0; i < array.length;i++){
		//append each item to DOM
		$(elementToAppendTo).append("<div class='wiki-block' id='"+i+"'><h1 class='block-header'></h1><p></p></div>");
		$('#'+i+' h1').append("<a href='https://en.wikipedia.org/wiki/"+formatQuery(array[i].title)+"'>"+array[i].title+"</a>");
		$('#'+i+' p').append(array[i].snippet+'...');
	}
}
//function pulls information from the Wikipedia API
function getWiki(searchQuery){
	//builds URL to pass to AJAX request
	const url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&prop=info&inprop=url&continue=&srwhat=text&srsearch=';
	let search = searchQuery;
	//request for information
	$.ajax({
		type:"GET",
		//concat url and search parameters
		url:url+search,
		//at success, remove previous wiki information, assign search data to array and append to page
		success: (data) => {
			//clear previous items
			clearItem('.wiki-block');
			//assign hit count and search array for appending
			let searchArray = data.query.search;
			let totalHits = data.query.searchinfo.totalhits;
			//append items to DOM
			appendItem('.data', searchArray, totalHits); 
		},
		//at error on AJAX call
		error: function(errorMessage){
			console.log('Error in request!');
		}
	})
}
function formatQuery(searchQuery){
	//prepares query for searching with WIKI URL
	return searchQuery.split(' ').join("_");
}
$(document).ready(function(){
	//if ENTER key pressed while in text-box, search button is clicked
	$('#search-box').keypress(function(e){
      if(e.keyCode==13)
      $('#search').click();
    });
    //click handler for search button
	$('#search').on('click',function(){
		//assign query to value of search box
		let query = $('input.search-box').val();
		//get wiki info using provided query
		getWiki(formatQuery(query));
		//if clear results button not on DOM, append to DOM
		if ($('#clear').length === 0){
			$('.button-container').append("<button id='clear'>Clear Results</button>");
		}		
	});
	//since item does not show initially, click handler has to be applied to the document
	$(document).on('click','#clear',function(){
		clearItem('#clear');
		clearItem('.wiki-block');
		clearItem('.hits');
		$('input.search-box').val('');
	});
});
