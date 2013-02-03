$(document).ready(function(){

	test();

	function test(){
	var card1 = {"title":"Cafe La Taza", "activity":"coffee","time":"04:30","address":"2475 Mission St, San Francisco, CA 94110","image":"http://www.bonappetit.com/blogsandforums/blogs/badaily/coffee-shop-desserts-646.jpg"};
	var card2 = {"title":"Golden Gate Bridge", "activity":"site see","time":"06:00","address":"Golden Gate Bridge Toll Plaza, San Francisco, CA 94129","image":"http://boomvisits.com/wp-content/uploads/2012/10/Golden-Gate-Bridge-boomvisits-4.jpg"};
	var card3 = {"title":"The View", "activity":"dinner","time":"07:00","address":"55 4th St, San Francisco, CA 94103","image":"http://s3-media3.ak.yelpcdn.com/bphoto/EDsKd-2_nLKtccXs5nob0w/l.jpg"}
	var card4 = {"title":"Shades of Blues", "activity":"dance","time":"09:30","address":"3040 22nd St, San Francisco, CA 94110","image":"http://s3-media4.ak.yelpcdn.com/bphoto/QF07DhjGXCJMtdMJxODR_w/l.jpg"};
	var events = [ card1,card2,card3,card4];
	populateBoard(events);

	}


	function buildCard(card_info){
		//extract content of card_info. I'm assuming this is going to 
		//give me title, activity type, time, address, image
		title = card_info['title'];
		activity = card_info['activity'];
		time = card_info['time'];
		address = card_info['address']
		image = card_info['image'];
		str = 	'<div class = "card">'
						+'<div class = "content">'
							+'<h1>'+title+'</h1>'
							+'<h2>'+activity+' at '+time+'</h2>'
							+'<h3>'+address+'</h3>'
						+'</div>'
						+'<div class = "gradient"></div>'
						+'<div class = "background">'
							+'<img src="'+image+'" />'
						+'</div>'
				+'</div>'
		return $(str)

	}
	
	function imageAdjust(){
		var image_size = new Array();
		$(".card").each(function(){
			var img = new Image();
			var card_width = $(this).width();
			var card_height = $(this).height();
			img.src = $(this).find('img').attr('src');
			image_ratio = img.height/img.width;
			image_size[1] = card_width; //at this point I know the image width is as large as the card
			//alert(image_size[1])
			image_size[2] = image_size[1] * image_ratio;
			if  (image_size[2] < card_height) { 
				image_size[2] = card_height;
				image_size[1] = image_size[2] / image_ratio;
			}
			var margin_left = -(image_size[1] - card_width)/2;
			var margin_top = -(image_size[2] - card_height)/2;
			$(this).find('img').width(image_size[1]).height(image_size[2]).css({top:margin_top,left:margin_left})
		})

	}

	function populateBoard(events){
		//extract information for each card from a list of events
		//For now I'm just going to assume a json with 

		for (var i = 0;i < events.length;i++){
			$card = buildCard(events[i]);
			$('#activities').append($card);
			
		}
		imageAdjust();
	}

	$(window).resize(function(){
		imageAdjust()
	})

})