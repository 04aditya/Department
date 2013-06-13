/*protocol used till now
room will generally be null
if room is not null, then all devices off type device_id in room
if device_id is negative, then all devices in room
if room is negative, then all rooms
time is in secs, +ve, means >, -ve means less than
energy is in ?, +ve, means >, -ve means less than
timetpe is consecutive or in a day
energytype is individual or additive
exp_time is expected time of this semievent occuring
event_id is the event this semievent is a part of
negation?
clause_id is the semievent, PRimARY key


Table event
name
event_id
action
enabled/disabled?
exp_time (max of all in prev table)

*/
//Fields .. device_id, room_id, roomtype, .., event_id, exp_time
//Mapping of callback_id to file to be run?, enabled/disabled?,event_id, exp_time(max)
//Assuming AND based


//var api = require('../api/controller/api.controller.js');
var events = require('events');
var eventEmitter = new events.eventEmitter();

var INF = 0;//infinity

//eventhandler("?device=1?status=on?energy=10");

function create_event(){
//mostly convert english statement to a set of fields
//maybe extract from some other file
	device = "";
	room = "";
	time = toString(10000);
	energy = "";
	energytype = ""; 
	timetype = "c";
	exp_time = toString(new Date().getTime() + 10000);
	clause_id = unique_clause_id();
	event_id = unique_event_id();
	eventName = "Init";
	action = "SomeAction";
	query = {
		"device"	:	device,
		"room"		:	room,
		"time"		:	time,
		"energy"	:	energy,
		"energytype":	energytype,
		"timetype"	:	timetype,
		"exp_time"	:	exp_time,
		"clause_id"	:	clause_id,
		"event_id"	:	event_id,
		"key"		:	"221b368d7f5f597867f525971f28ff75"
	};
	api.InsertSemievent(query,function(){
			query = {
				"name"		:	eventName,
				"action"	:	action,
				
				"exp_time"	:	exp_time,
				"event_id"	:	event_id,
				"key"		:	"221b368d7f5f597867f525971f28ff75"
			};
			api.InsertEvent(query,function(){
				eventEmitter.on('event'+event_id,actionParse(event_id,action));
			});
	});
//Create node event and its associated function actionParse(eventId, action)
}

function delete_event(){

}

function actionParse(eventId, action){
	//first check if the event has been triggered


}


function delete_cron(callback_id){
	clearTimeout(callback_id);
}

function rate_of_consumption(device_id){
	//TBD
	return 1;
}

function rate_of_consumption2(device_id_array){
	length = device_id_array.length;
	sum = 0;
	for(i = 0;i < length; i++){
		sum =  sum + rate_of_consumption(device_id_array[i]);
	}
	return sum;
}

function expected_run_time(event,clause_id){
	var query = {
		"id"	:	clause_id,
		"key"	:	"221b368d7f5f597867f525971f28ff75"
	};
	/*api.renderSemieventsQuery(query,function(row){
		room = row.room;
		device_id = row.device_id;
		energytype = row.energytype;
		timetypte = row.timetype;
		energy = row.energy;
		time = row.time;
		eventParsed = query_string.parse(event);
		status = eventParsed.status
		eventdevice = eventParsed.device;
		//negation = row.negation;


		array_of_devices = array_of_on_devices_from_clause(clause_id);
		count = array_of_devices.length;
		if(time != ""){
			if(status == "off"){
				if((positive(time) == 1)&&(count == 0)){//should count = 1 or 0
					return INF;
				}
				else{
					//TBD but should be NULL
				}
			}
			else if(status == "on"){
				if((timetype == "c")&&(count == 0)){//consecutive count = 0 or 1
					return time;
				} 
				else if((timetype == "d")&&(count == 0)){
					array_of_devices = "";
					timerun = time_run_today2(array_of_devices);
					return time - timerun;
				}
				else{
					//TBD, but mostly is null
				}
			}
			else{
				//TBD, but mostly is null
			}
		}
		else if(energy != ""){
			if((status == "off")&&(count == 0)){// or 1
				return INF;
			}
			else {
				if(timetype == "c"){//consecutive
					energyused = energy_used_in_last_session(array_of_devices);
					return energy - energyused/(rate_of_consumption2(array_of_devices));
				}
				else if(timetype == "d"){
					energyused = energy_used_today2(array_of_devices);//maybe it would be better to store?
					return energy - energyused/(rate_of_consumption2(array_of_devices));
				}
			}
		}
		else{
			if (energyconsumption != ""){
				if(timetype == "c"){//consecutive
					energyused = energy_used_in_last_session(array_of_devices);
					return energy - energyused/(rate_of_consumption2(array_of_devices));
				}
				else if(timetype == "d"){
					energyused = energy_used_today2(array_of_devices);//maybe it would be better to store?
					return energy - energyused/(rate_of_consumption2(array_of_devices));
				}
			}
		}
	});*/
}

function modify_run_time(event,clause_id){
//update field with exp_time
	var runtime = expected_run_time(event,clause_id);
	var now = new Date().getTime();
	var exptime = now + parseInt(runtime);
	
	query = {
		"id"		:	clause_id,
		"exp_time"	:	exptime,
		"key"		:	"221b368d7f5f597867f525971f28ff75"
	};
	/*api.updateExpTimeEvent(query, function(){
		query = {
			"id"		:	clause_id,
			"key"		:	"221b368d7f5f597867f525971f28ff75"
		};
		api.renderAllSemieventQuery(query,function(rows){
			maximum = 0;
			event_id = "";
			for (row in rows){
				if(rows[row].clause_id = clause_id){
					event_id = rows[row].event_id
				}
			}
			for (row in rows){
				if(rows[row].event_id == event_id){
					if (parseInt(rows[row].exp_time) > maximum)
						maximum = parseInt(rows[row].exp_time);
				}
			}
			query = {
				"id"		:	event_id,
				"exp_time"	:	exptime,
				"key"		:	"221b368d7f5f597867f525971f28ff75"
			};
			api.updateExpTimeEvent(query,function(){});
		});
	});*/

}


//event = ?device_id=x?status=y?energyconsumption=z
function eventhandler(event){
//check if each event is set, then run the application
	eventParsed = query_string.parse(event);
	var device = eventParsed.device;
	console.log(device);
	var room = room_from_device(eventParsed.device);

	query = {
			"id"		:	clause_id,
			"key"		:	"221b368d7f5f597867f525971f28ff75"
	};
	/*api.renderAllSemievents(query,function(rows){
		for (row in rows){
			if((rows[row].device_id == device)||((rows[row].device_id == "")&&(rows[row].room_id == room))||( (rows[row].device_id == "")&&(rows[row].room_id == "-1") )){
				var runtime = expected_run_time(event,rows[row].clause_id);
		        modify_run_time(event,rows[row].clause_id);
			}
		}
	});*/
}

function room_from_device(device){

	return 1;
}

function devicetype_from_device(device){
	return "light";
}

function positive(str){
	return (str.substr(0,1)=="+");
}

function time_run_today(device_id){
//obtain from sessions

return 0;
}

function time_run_today2(device_id_array){
//obtain from sessions
	length = device_id_array.length;
	sum = 0;
	for(i = 0;i < length; i++){
		sum =  sum + time_run_today(device_id_array[i]);
	}
	return sum;

return 0;
}

function energy_used_today(device_id){
// obtain from sessions

return 0;
}

function energy_used_today2(device_id_array){
// obtain from sessions
	length = device_id_array.length;
	sum = 0;
	for(i = 0;i < length; i++){
		sum =  sum + energy_used_today(device_id_array[i]);
	}
	return sum;

return 0;
}

function energy_used_in_last_session(array_of_devices){
	//obtain from sessions

	return 0;
}

function array_of_on_devices_from_clause(clause_id){
	query = {
		"id"		:	clause_id,
		"key"		:	"221b368d7f5f597867f525971f28ff75"
	};
	/*api.renderSemieventQuery(query,function(row){
		query = {
			"id"		:	clause_id,
			"key"		:	"221b368d7f5f597867f525971f28ff75"
		};
		api.renderAllDevices(query,function(rows){
			for (row2 in rows){
				if(row.room == ""){
				
				}
				else if((row.device == "-1")&&(row.room == "-1")){
				
				}
				else if((row.device == "-1")&&(row.room != "")){
				
				}
				else if((row.device != "")&&(row.room != "")){
				
				}
			}
		});
	});*/
	return [];
}

function check_semi_event(clause_id){


}

function unique_event_id(){
	return 1;
}

function unique_clause_id(){
	return 1;
}

periodForCheck = 300000;
function periodicCheck(){
	var query = {
		"id"	:	"1",
		"key"	:	"221b368d7f5f597867f525971f28ff75"
	};
	api.renderAllEventsQuery(query,function(setOfEvents){
		for (event in setOfEvents){
			exptime = setOfEvents[event].exp_time;
			var delay = parseInt(exptime) - new Date().getTime();
			if(delay < periodForCheck){
				var timeout = setTimeout(function(){emit('event'+setOfEvents[event].event_id);},delay);
			}
		}
	}); 
}

//create_event();
