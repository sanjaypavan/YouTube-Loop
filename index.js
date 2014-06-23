var player;
var VIDEO_ID;
var playerLoaded;
var loopCount = 1;
var hours,minutes,seconds,timeOut;

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
      loopCount = 1; //Initialize to 1 when new video is being played
      initializeTimer();

  }
  $('.youtube-url').val('');  
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
      height: '360',
      width: '640',
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
    initializeTimer(); //Intialize the Timer
    $('.youtube-url').val('');
    console.log("Player Ready");
}

//When the Video is finished Play it again.
function onPlayerStateChange(newState) {
   if(newState.data === YT.PlayerState.ENDED){
   		player.playVideo();
      updateLoopCount();
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
  $('.video-url').empty().text(player.getVideoUrl());
  $('.title').empty().text(player.getVideoData()["title"]);
  $('.author').empty().text(player.getVideoData()["author"]);
  $('.info-div').show();
}

function updateLoopCount(){
  loopCount++;
  $('.loop-no').empty().text(loopCount);
}

function initializeTimer(){
  hours = 0;
  minutes = 0;
  seconds = 0;
  clearTimeout(timeOut);
  startTimer();
}

function startTimer() {
  if(seconds === 60){
    seconds = 0;
    minutes++;
  }
  if(minutes === 60){
    minutes = 0;
    hours++;
  }
  $('.tot-time').text(hours+":"+checkTime(minutes)+":"+checkTime(seconds));
  seconds++;
  timeOut = setTimeout(function(){startTimer()},1000);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}





