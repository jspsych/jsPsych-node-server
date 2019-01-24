jsPsych.hardware.netstation = (function(){
    
    var is_connected = false;
    const server_socket = null;

    var module = {};

    module.connect = function(ip, port){
        ip = ip || '127.0.0.1';
        port = port || 53352;
        server_socket = io('http://'+ip+':'+port);
        server_socket.on('connect', function(){
            is_connected = true;
        });
        server_socket.on('disconnect', function(){
            is_connected = false;
        });
    }

    module.beginSession = function(){
        if(check_connected()){
            server_socket.emit('egi_beginSession');
        }
    }

    module.endSession = function(){
        if(check_connected()){
            server_socket.emit('egi_endSession');
        }
    }

    module.startRecording = function(){
        if(check_connected()){
            server_socket.emit('egi_startRecording');
        }
    }

    module.endRecording = function(){
        if(check_connected()){
            server_socket.emit('egi_endRecording');
        }
    }

    module.sync = function(){
        if(check_connected()){
            server_socket.emit('egi_sync');
        }
    }

    module.sendEvent = function(args){
        if(check_connected()){
            server_socket.emit('egi_sendEvent', args);
        }
    }

    module.sendAttentionCommand = function(){
        if(check_connected()){
            server_socket.emit('egi_sendAttentionCommand');
        }
    }

    module.sendLocalTime = function(){
        if(check_connected()){
            server_socket.emit('egi_sendLocalTime');
        }
    }

    function check_connected(){
        if(!is_connected) {
            console.error("Not connected to a NetStation amplifier.")
            return false;
        }
        return true;
    }
    
    return module;
    
})();