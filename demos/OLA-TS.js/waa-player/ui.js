function WAAPlayerUI(id, title, player, gain, recorder) {

	/*
     *	COMPONENTES: 
     *		(1) SLIDER PARA A VELOCIDADE.
     *		(2) SLIDER PARA O GANHO.
     *		(3) WAVEFORM
     *  	(4) BOTÃO PARA ELIMINAR O PLAYER
     *		(5) BOTÃO PARA STOP
     *		(6) BOTÃO PARA PLAY
     *		(7) TÍTULO
     */

    var _playerId = id;
    var _player = player;
    var _gain = gain;
    var _title = title;
    var _that = this;
    var _recorder = recorder;


    /*************** MAIN DIV ******************/
    var _playerDiv = document.createElement('div');
    _playerDiv.id = 'player-' + _playerId;
    _playerDiv.classList.add('player-container');
    /*******************************************/


    /*********** TEMPO INPUT SLIDER ************/
    var _tempoSlider = document.createElement('input');
    _tempoSlider.id = 'tempo-control-' + _playerId;
    _tempoSlider.name = _tempoSlider.id;
    _tempoSlider.type = 'range';
    _tempoSlider.max = 2;
    _tempoSlider.min = 0.5;
    _tempoSlider.step = 0.01;
    _player.speed = 1;
    
    var _tempoSliderLabel = document.createElement('label');
    _tempoSliderLabel.for = _tempoSlider.id;
    _tempoSliderLabel.innerHTML = 'Tempo: ';

    var _tempoValue = document.createElement('span');
    _tempoValue.id = 'tempo-value-' + _playerId;
    _tempoValue.innerHTML = _player.speed;

    _tempoSlider.oninput = function() {
    	_player.speed = document.getElementById('tempo-control-' + _playerId).value;
    	_tempoValue.innerHTML = _player.speed;
    };

    var _tempoDiv = document.createElement('div');
    /*******************************************/


    /*********** GAIN INPUT SLIDER *************/
    var _gainSlider = document.createElement('input');
    _gainSlider.id = 'gain-control-' + _playerId;
    _gainSlider.name = _gainSlider.id;
    _gainSlider.type = 'range';
    _gainSlider.value = 1;
    _gainSlider.max = 1.5;
    _gainSlider.min = 0;
    _gainSlider.step = 0.01;
    _gain.gain.value = 1;
    
    var _gainSliderLabel = document.createElement('label');
    _gainSliderLabel.for = _gainSlider.id;
    _gainSliderLabel.innerHTML = 'Volume: ';

    var _gainValue = document.createElement('span');
    _gainValue.id = 'gain-value-' + _playerId;
    _gainValue.innerHTML = _gain.gain.value;

    _gainSlider.oninput = function() {
    	_gain.gain.value = document.getElementById('gain-control-' + _playerId).value;
    	_gainValue.innerHTML = _gain.gain.value;
    };

    var _gainDiv = document.createElement('div');
    /***********************************************/


    /**************** PLAY BUTTON ******************/
    var _playButton = document.createElement('button');
    _playButton.innerHTML = "Play";
    _playButton.onclick = function() {
    	_player.play();
    };
    /***********************************************/

    /**************** STOP BUTTON ******************/
    var _stopButton = document.createElement('button');
    _stopButton.innerHTML = "Stop";
    _stopButton.onclick = function() {
    	_player.stop();
    }
    /***********************************************/

    /*************** CLOSE BUTTON ******************/
    var _closeButton = document.createElement('button');
    _closeButton.innerHTML = "Close";
    _closeButton.onclick = function() {
    	_playerDiv.remove();
    	_that.removeCallback();
    }
    /***********************************************/

    /*************** RECORD BUTTON *****************/
    var _recordButton = document.createElement('button');
    var _isRecording = false;
    _recordButton.innerHTML = "Start Recording";
    _recordButton.onclick = function() {
        if (_isRecording) {
            _recordButton.innerHTML = "Start Recording";
            _isRecording = false;
            recorder.stop();
            recorder.exportWAV(function(blob) {
                var url = URL.createObjectURL(blob);
                // window.open(url);
                Recorder.forceDownload(blob, new Date().toISOString() + '.wav');
            });
        } else {
            _recordButton.innerHTML = "Stop Recording";
            _isRecording = true;
            recorder.record();
        }
    }
    /***********************************************/


    /****************** WAVEFORM *******************/
    
    /***********************************************/



    /****************** TITLE **********************/
    var _titleEl = document.createElement('span');
    _titleEl.innerHTML = _title;
    /***********************************************/


    _tempoDiv.appendChild(_tempoSliderLabel);
    _tempoDiv.appendChild(_tempoSlider);
    _tempoDiv.appendChild(_tempoValue);

    _gainDiv.appendChild(_gainSliderLabel);
    _gainDiv.appendChild(_gainSlider);
    _gainDiv.appendChild(_gainValue);

    _playerDiv.appendChild(_titleEl);
    _playerDiv.appendChild(_tempoDiv);
    _playerDiv.appendChild(_gainDiv);
    _playerDiv.appendChild(_playButton);
    _playerDiv.appendChild(_stopButton);
    _playerDiv.appendChild(_closeButton);
    _playerDiv.appendChild(_recordButton);

    document.body.appendChild(_playerDiv);

    _tempoSlider.value = 1;




	
	this.removeCallback = function() { }


}