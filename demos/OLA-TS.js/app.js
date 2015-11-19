var context = new AudioContext();

var BUFFER_SIZE = 4096;
var FRAME_SIZE  = 4096;

var players = [];
var playersIdCounter = 0;

var load_remote_audio = function(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
      context.decodeAudioData(request.response, function(decodedData) {
        add_player(request.responseURL, decodedData);
      });
  };
  request.send();
};

var load_local_audio = function(e) {
  if (e.dataTransfer.files.length) {

          // Create file reader
          var reader = new FileReader();
          reader.addEventListener('progress', function (e) {
              console.log(e);
          });
          reader.addEventListener('load', function (e) {
              context.decodeAudioData(e.target.result, function(decodedData) {
                add_player(filename, decodedData);
              });
          });
          reader.addEventListener('error', function () {
              alert('Error reading file');
              console.error('Error reading file');
          });

          var filename = e.dataTransfer.files[0].name;
          reader.readAsArrayBuffer(e.dataTransfer.files[0].slice());

      } else {
          alert('Not a file');
          console.error('Not a file');
      }
}

var add_player = function(title, decodedData) {
  var id = playersIdCounter++;
  var player = new WAAPlayer(context, decodedData, FRAME_SIZE, BUFFER_SIZE);
  var gain = context.createGain();
  var recorder;
  recorder = new Recorder(gain, { workerPath: '../../assets/js/recorderWorker.js' });

  var ui = new WAAPlayerUI(id, title, player, gain, recorder);
  ui.removeCallback = function() {
    player.disconnect();
    gain.disconnect();
    delete players[id];
  }

  players[id] = {
    player : player,
    gain : gain, 
    ui : ui
  };

  player.connect(gain);
  gain.connect(context.destination);
}

var dd = new DragAndDrop(document.getElementById('drag-and-drop'));
dd.on('drop', load_local_audio);



// load_remote_audio('../OLA-TS.js/14. Too Long.mp3');

var remoteURLs = [
  {
    title: 'SuperNova - Airport (Trance)', 
    url: 'https://storage.jamendo.com/download/track/480405/mp32/', 
  }, 
  {
    title: 'Sim Band - Let\'s Rock (Rock)',
    url: 'https://storage.jamendo.com/download/track/639882/mp32/'
  },
  {
    title: 'Joka L. - Quiet Night (Classica)',
    url: 'https://storage.jamendo.com/download/track/549412/mp32/'
  }
];

for (var i=0; i<remoteURLs.length; i++) {
  var a = document.createElement('a');
  a.href = "#";
  a.url = remoteURLs[i].url;
  a.onclick = function() {
    load_remote_audio(this.url);
  }
  a.innerHTML = remoteURLs[i].title;
  var p = document.createElement('p');
  p.appendChild(a);
  document.getElementById('remote-files').appendChild(p);
}