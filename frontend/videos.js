var YouTubePlayer = require('youtube-player');

console.log('request');

var player = YouTubePlayer('youtube-player-container');

function playNextVid() {
  fetch('/api/getrandomvid').then(function(vid) {
    console.log(vid);
    // jQuery('#youtube-player-container').tubeplayer('play', vid.vidID);
    player.loadVideoById(vid.vidID);
    player.playVideo();
  });
}

document.getElementById('playerbutton').onclick = playNextVid;
