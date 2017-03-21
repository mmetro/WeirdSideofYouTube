var YouTubePlayer = require('youtube-player');

var player = YouTubePlayer('youtube-player', {
  autoPlay: true,
  preferredQuality: 'default',
  allowFullScreen: 'true',
  videoId: window.initVid
});

player.on('ready', function(_event) {
  player.playVideo();
});

player.on('stateChange', function(event) {
  // If video ended
  if(event.data === 0) {
    playNextVid();
  }
});

player.on('error', function(_event) {
  playNextVid();
});

function playNextVid() {
  fetch('./api/getrandomvid').then(function(response) {
    return response.json();
  }).then(function(vid) {
    player.loadVideoById(vid.vidID);
    player.playVideo();
  }).catch(function(error) {
    console.error(error);
  });
}

document.getElementById('playerbutton').onclick = playNextVid;
