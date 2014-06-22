var player;

function handlePageEvents() {
	repeatBtn = $('.repeat-btn');
	repeatBtn.off('click').on('click', function(){
		//loadIframeUrl("video","//www.youtube.com/embed/Fait5MP3XtE?enablejsapi=1");
		$('.player-div').show();
	});
}

function onYouTubeIframeAPIReady() {
  // create the global player from the specific iframe (#video)
  player = new YT.Player('video', {
    events: {
      // call this function when player is ready to use
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  handlePageEvents();	
  player.addEventListener("onStateChange", "onytplayerStateChange");
  
}

function onytplayerStateChange(newState) {
	console.log(newState.data);
   if(newState.data === 0){
   		player.playVideo();
   }
}

function loadIframeUrl(iframeName, url) {
    var iframe = $('#' + iframeName);
    if ( iframe.length ) {
        iframe.attr('src',url);   
        return false;
    }
    return true;
}



