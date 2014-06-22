var player;
var VIDEO_ID;
var playerLoaded;

$(document).ready(function(){
  handlePageEvents();
});

function handlePageEvents() {
	repeatBtn = $('.repeat-btn');
	repeatBtn.off('click').on('click', function(){
      var url = $('.youtube-url').val();
      if(setVideoId(url) && playerLoaded != true){
        callYoutubeAPI();
      } else {
        playNewVideo(url);
      }
	});
}

 function playNewVideo(url){
  if(setVideoId(url)){
      player.loadVideoById(VIDEO_ID, 0, "large");
  }
}

function callYoutubeAPI() {
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

//This method is called when ever the iframe_api completes loading
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player-div', {
      height: '315',
      width: '560',
      videoId: VIDEO_ID,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

function onPlayerReady(event) {
    player.playVideo();
    playerLoaded = true;
    console.log("Player Ready");
}

//When the Video is finished Play it again.
function onPlayerStateChange(newState) {
   if(newState.data === YT.PlayerState.ENDED){
   		player.playVideo();
   }
   if(newState.data === YT.PlayerState.PLAYING){
      addVideoDescription();
   }
}

function setVideoId(url){
    var videoid = url.trim().match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if(videoid != null) {
       VIDEO_ID = videoid[1];
       return true;
    } else { 
        alert("The youtube url is not valid.");
        return false;
    }
}

function addVideoDescription() {
  $('.video-info').empty().text(player.getVideoData()["title"]);
}






