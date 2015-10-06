function DragAndDrop(domElement) {

    var _toggleActive = function (e, toggle) {
        e.stopPropagation();
        e.preventDefault();
    };

    var _callbacks =  {};

    var _handlers = {
        drop : function(e) {
            _toggleActive(e, false);
            _emit('drop', e);
        },

        dragover : function(e) {
            _toggleActive(e, true);
            _emit('dragover', e);
        },

        dragleave : function(e) {
            _toggleActive(e, false);
            _emit('dragleave', e);
        }
    };

    var _dropTarget = domElement;
    

    this.on = function(eventType, callback) {
        _callbacks[eventType] = (_callbacks[eventType])? _callbacks[eventType] : {};
        _callbacks[eventType][callback] = callback;
    }

    this.off = function(eventType, callback) {
        if (_callbacks[eventType])
            delete _callbacks[eventType][callback];
    }

    var _emit = function(eventType, data) {
        for (var ci in _callbacks[eventType]) 
            _callbacks[eventType][ci](data);
    }


    document.addEventListener('DOMContentLoaded', function () {
        Object.keys(_handlers).forEach(function (event) {
            _dropTarget.addEventListener(event, _handlers[event]);
        });
    })

}