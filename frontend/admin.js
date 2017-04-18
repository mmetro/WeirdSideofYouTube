var escape = require('escape-html');
var ready = require('./ready');

var currentVideoID = 1;
var numVideos = 0;
var videosPerPage = 50;

function loadNewTable() {
  var endRange = (currentVideoID+videosPerPage <= numVideos) ? currentVideoID+videosPerPage : numVideos;
  var rangeTxt = 'Showing videos ' + currentVideoID + ' through ' + endRange + ' of ' + numVideos;
  document.getElementById('vidRange').innerText = rangeTxt;

  // Remove old rows when reloading
  var vidTable = document.getElementById('videoTable');
  var rows = vidTable.querySelectorAll('tr');
  for(var i = 0; i < rows.length; ++i) {
    if(/videoRow/.test(rows[i].className)) {
      vidTable.removeChild(rows[i]);
    }
  }

  fetch('/admin/getvidrange/' + currentVideoID + '/' + (currentVideoID + 49), {credentials: 'same-origin'}).then(function(response) {
    console.log(response);
    return response.json();
  }).then(function(vids) {
    for(var key in vids) {
      var val = vids[key];

      var dom = generateNewEntry(val);
      document.getElementById('videoTable').appendChild(dom);
    }
  }).catch(function(error) {
    console.error(error);
  });
}

ready(loadNewTable);

function generateNewEntry(video) {
  // Create table row
  var tr = document.createElement('tr');
  tr.setAttribute('id', 'vid' + escape(video.videoID));
  tr.setAttribute('class', 'videoRow');

  var td = document.createElement('td');
  tr.appendChild(td);

  // Create removal form
  var form = document.createElement('form');
  td.appendChild(form);

  var vidIdInput = document.createElement('input');
  vidIdInput.setAttribute('type', 'hidden');
  vidIdInput.setAttribute('name', 'videoID');
  vidIdInput.setAttribute('value', escape(video.videoID));
  form.appendChild(vidIdInput);

  var submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Delete Video');
  form.appendChild(submit);

  // Create link to YouTube video
  var linkTd = document.createElement('td');
  tr.appendChild(linkTd);

  var youtubeLink = document.createElement('a');
  youtubeLink.setAttribute('href', 'https://www.youtube.com/watch?v=' + encodeURIComponent(video.videoID));
  youtubeLink.innerText = escape(video.videoID);
  linkTd.appendChild(youtubeLink);

  // Insert other metadata
  tr.insertAdjacentHTML('beforeEnd', '<td><img src="//i.ytimg.com/vi/' + encodeURIComponent(video.videoID) + '/default.jpg" /></td>');
  tr.insertAdjacentHTML('beforeEnd', '<td id="title"></td>');
  tr.insertAdjacentHTML('beforeEnd', '<td>' + escape(video.views) + '</td>');
  tr.insertAdjacentHTML('beforeEnd', '<td>' + escape(video.skips/video.views * 100) + '%</td>');
  tr.insertAdjacentHTML('beforeEnd', '<td>' + escape(video.errorCount/video.views * 100) + '%</td>');

  // Retrieve title from server
  fetch('/api/getVidInfo/' + encodeURIComponent(video.videoID)).then(function(response) {
    return response.json();
  }).then(function(data) {
    document.querySelector('#videoTable #vid' + escape(video.videoID) + ' #title').innerText = data.items[0].snippet.title;
  });

  return tr;
}

// function loadNewTable(){
//   $('#vidRange').text("Showing videos " + currentVideoID.toString() + ' through ' + ((currentVideoID+videosPerPage <= numVideos) ? currentVideoID+videosPerPage : numVideos).toString() + " of " + numVideos.toString());
//   $('#videoTable tr').remove(".videoRow");
//   $.getJSON("/admin/getvidrange/" + currentVideoID.toString() + "/" + (currentVideoID + 49).toString(), function(videos) {
//     $.each(videos, function(key, value) {
//       $('<tr id="' + value.videoID + '" class="videoRow">').append(
//         $('<td>').append(
//           $('<form>').attr({"action": "/admin/remove", "method": "post"}).append(
//             $('<input>').attr({"type": "hidden", "name": "videoID", "value": value.videoID}),
//             $('<input>').attr({"type": "submit", "value": "Delete Video"})
//           )
//         ),
//         $('<td>').html('<a href="http://www.youtube.com/watch?v=' +
//         value.videoID + '">' + value.videoID + '</a>'),
//         $('<td>').html('<img src="//i.ytimg.com/vi/' + value.videoID + '/default.jpg" />'),
//         $('<td>').attr("id", "title"),
//         $('<td>').text(value.views),
//         $('<td>').text(value.skips/value.views*100 + "%"),
//         $('<td>').text(value.errorCount/value.views*100 + "%")
//       ).appendTo( "#videoTable" );
//       $.getJSON("/api/getVidInfo/" + value.videoID, function(data) {
//         $('#videoTable').find('#'+value.videoID).find('#title').text(data.items[0].snippet.title);
//       });
//     });
//   });
// }
//
// loadNewTable();
//
// $.getJSON("/api/getnumvids/", function(numVids) {
//   numVideos = numVids.numVids;
//   $('#vidRange').text("Showing videos " + currentVideoID.toString() + ' through ' + ((currentVideoID+videosPerPage <= numVideos) ? currentVideoID+videosPerPage : numVideos).toString() + " of " + numVideos.toString());
// });
//
//  $('#nextButtonTop, #nextButtonBottom').click(function(){
//   currentVideoID += videosPerPage;
//   if(currentVideoID > numVideos)
//   {
//     currentVideoID -= videosPerPage;
//   }
//   loadNewTable();
//  });
//
//  $('#previousButtonTop, #previousButtonBottom').click(function(){
//   currentVideoID -= videosPerPage;
//   if(currentVideoID < 1){
//     currentVideoID = 1;
//   }
//     loadNewTable();
//  });
