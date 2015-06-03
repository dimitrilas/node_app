var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
var users = new Array();
var machin = require('unirest');
var gm=require('googlemaps');
var util=require('util');
var testw=require('openweathermap');
var request=require('unirest');


io.sockets.on('connection', function(socket) {
	
	socket.on('chosen', function(data){		
		users[0] = this;
		
		var temps=machin.get("https://simple-weather.p.mashape.com/weather?lat="+data[0]+"&lng="+data[1]+"")
        .header("X-Mashape-Key", "Ri4j5gX4ORmshweHbjBSUUMevXWIp1i0xRujsnjCz7wW9w5zLB")
        .end(function (result) {

            var weather=result.body;
            weather = weather.split(' c,');
            var weather2=weather[1].split(' at ');
			var letemps="It is "+weather[0]+" degree celsius and it's"+weather2[0]+" in "+weather2[1];
			users[0].emit('final_weather', letemps);
        });
        
        
		//var openWeatherKey="87db9f8219947bdac7068c479acfccdd";
	
		var tempe=request.get("http://api.openweathermap.org/data/2.5/weather?q="+data[2])
		.header("X-Mashape-Key", "87db9f8219947bdac7068c479acfccdd")
		.end(function (result) {
			
			console.log(result.body);
			
			var tmp=gm.staticMap(data[0]+','+data[1], 12, '600x400', function(err, data){
				require('fs').writeFileSync('test_map.png', data, 'binary');
				}, false, 'roadmap');
			
			tmp+="&markers=icon:http://openweathermap.org/img/w/"+result.body.weather[0].icon+".png%7C"+data[2];
			users[0].emit('create_map', tmp); 
		});
		
			
		//users[0].emit('create_map', tmp); 
	});
});


app.use(express.static('/home/lasne/Documents/Cours/M1/internet_archi/ass3_1/nodejs/ass3/client'));

app.listen(8080);
console.log('Listening on port 8080...');
