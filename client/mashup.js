var socket = io.connect('http://localhost');

$(document).ready(function() {

	$('#selected_city').click(function() {
		$('#weather_in_city').html("");
		$('#city_map').html("");
		
		var array = {};
		var cities = $('#city').val();
		var latitude;
		var longitude;
		var city;

		if(cities=="1") {latitude="51.51"; longitude="-0.13"; city="London";}
		if(cities=="2") {latitude="59.325"; longitude="18.07"; city="Stockholm";}
		if(cities=="3") {latitude="48.86"; longitude="2.34"; city="Paris";}

		array[0] = latitude;
		array[1]= longitude;
		array[2]=city;
	    socket.emit('chosen', array);
	});

	socket.on('final_weather', function(data) {
		$('#weather_in_city').append(data);
	});
	
	socket.on('create_map', function(data_map) {
		var addMap="<img src=\""+data_map+"\"/>";
		$('#city_map').append(addMap);
	});
	
});
