function WAAPlayer(audioContext, audioBuffer, frameSize, bufferSize) {

  var _audioCtx = audioContext;

  var _node = audioContext.createScriptProcessor(bufferSize, 2);
  
  var _pv = new BufferedOLA(frameSize);

  var _audioBuffer = audioBuffer;

  _pv.set_audio_buffer(audioBuffer);

  var _newAlpha = 1;

  var _newPosition = 0;

  var _canPlay = false;



  _node.onaudioprocess = function(e) {
    if (_canPlay) {
      if (_newAlpha != undefined) {
        _pv.alpha = _newAlpha;
        _newAlpha = undefined;
      }

      if (_newPosition != undefined) {
        _pv.position = _newPosition;
        _newPosition = undefined;
      }

      _pv.process(e.outputBuffer);
    } 
  }

  this.play = function() {
    this.connect(this.destination);
    _canPlay = true;
  }

  this.stop = function() {
    _canPlay = false;
    this.disconnect();
  }

  this.connect = function(destination) {
    this.destination = destination;
    _node.connect(destination);
  }

  this.disconnect = function() {
    _node.disconnect();
  }

  Object.defineProperties(this, {
    'position' : {
      get : function() {
        return _newPosition || _pv.position;
      }, 
      set : function(newPosition) {
        _newPosition = newPosition;
      }
    },
    'speed' : {
      get : function() {
        return _newAlpha || _pv.alpha;
      },
      set : function(newSpeed) {
        _newAlpha = newSpeed;
      }
    },
    'context' : {
      get : function() {
        return _audioCtx;
      }
    },
    'audioBuffer' : {
      get : function() {
        return _audioBuffer;
      }
    }
  })
}