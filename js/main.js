function getWiki(searchQuery){
	var url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&prop=info&inprop=url&continue=&srwhat=text&srsearch=';
	var search = searchQuery;
	$.ajax({
		type:"GET",
		url:url+search,
		success: function(data){
			console.log(data);
			$('.wiki-block').remove();
			var searchArray = data.query.search;
			$('.data').html("<h3 class='hits'>Total Hits: "+data.query.searchinfo.totalhits+"</h3><br>");
			for (var i = 0; i < searchArray.length;i++){
				$('.data').append("<div class='wiki-block' id='"+i+"'><h1 class='block-header'></h1><p></p></div>");
				$('#'+i+' h1').append("<a href='https://en.wikipedia.org/wiki/"+formatQuery(searchArray[i].title)+"'>"+searchArray[i].title+"</a>");
				$('#'+i+' p').append(searchArray[i].snippet+'...');
			}
			$('.button-container').append("<button id='clear'>Clear Results</button>");
		},
		error: function(errorMessage){
			console.log('Error in request!');
		}
	})
}
function formatQuery(searchQuery){
	return searchQuery.split(' ').join("_");
}

$(document).ready(function(){
	$('#search').on('click',function(){
		query = $('input.search-box').val();
		getWiki(formatQuery(query));
	});

	$(document).on('click','#clear',function(){
		$(this).remove();
		$('.wiki-block').remove();
		$('.hits').remove();
		$('input.search-box').val('');
	});
});
