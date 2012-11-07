//ip   -172.16.77.35
//port - 8000
var net = require('net');

exports.HSM = function(){
	this.PORT = 53958;//8000;
	this.IP   = "127.0.0.1";//"172.16.77.35";
	this.TIMEOUT = 3000;
};

exports.HSM.prototype.encryptPin = function( institution, clearPin ){
	try{
		var buffer = new Buffer("GET /");
		var socket = new net.Socket();
		socket.setTimeout(this.TIMEOUT);
		var host = socket.connect(this.PORT, this.IP, function(error){
			if( error ) throw error;
			console.info('connection establish to hsm');

			//buffer.write("BA",0,2);
			//buffer.write(0x4, 2,1);	
			buffer.write(0x2,0,1);
			buffer.write(0x0, 1, 255);
			buffer.write("BA",255,1);
			host.write(buffer, function(error){
				console.info('data sent to HSM');
				host.on('data', function(data){
					console.info('data received -->' + data);
					
					//process the returned data//
					//then return //
					console.dir(data);
					return data;
					//host.end();
				});
			});
		});
		host.on('timeout', function(){
			console.info('timeout');
			host.end();
		});
		host.on('end', function(){
			console.info('connection closed');
		})
		
	}catch(error){
		console.error('There is a encryptPin error');
		console.dir(error);
		return null;
	}

} 


var hsm = new exports.HSM();

hsm.encryptPin("123456789", "5599");
