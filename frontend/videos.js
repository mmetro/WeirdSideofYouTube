var YouTubePlayer = require('youtube-player');

var player = YouTubePlayer('youtube-player', {
  autoPlay: true,
  preferredQuality: 'default',
  allowFullScreen: 'true',
  videoId: 'ENBWOIRO2WQ'
});

player.on('ready', function(_event) {
  player.playVideo();
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
