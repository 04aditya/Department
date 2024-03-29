var sqlite3 = require('sqlite3').verbose(),
	fs = require('fs');
var db = new sqlite3.Database('/home/vaibhav/leaf_app/database/maindb');

var API_KEYS = ['221b368d7f5f597867f525971f28ff75','b3be6b55584e1a4e13928e8fdb6e1e5f','dec2abf5473e676042232b6786415d2c'];

/*****************************
Route Handling functions
*****************************/
exports.renderUsersQuery = function(query,callback){
	if(isValidAPIKey(query)){
		if( query.id != null && query.id != undefined ){
			var sql = "SELECT * FROM users WHERE id = $id";
			var params = { $id : query.id };
			runDbQuery(sql,params,function(data){
				callback && callback(data);
			});
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.renderHubsQuery = function (query,callback){
	if(isValidAPIKey(query)){
		if( query.id != null && query.id != undefined ){
			var sql = "SELECT * FROM hubs WHERE id = $id";
			var params = { $id : query.id };
			runDbQuery(sql,params,function(data){
				callback && callback(data);
			});
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.renderDevicesQuery = function (query,callback){
	if(isValidAPIKey(query)){
		if( query.id != null && query.id != undefined ){
			var sql = "SELECT * FROM devices WHERE id = $id";
			var params = { $id : query.id };
			runDbQuery(sql,params,function(data){
				callback && callback(data);
			});
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.renderAllDevicesQuery = function (query,callback){
	if(isValidAPIKey(query)){
		var sql = "SELECT * FROM devices";
		var params = { };
		runDbQuery(sql,params,function(data){
			callback && callback(data);
		});
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}


exports.renderRoomsQuery = function (query,callback){
	if(isValidAPIKey(query)){
		if( query.id != null && query.id != undefined ){
			var sql = "SELECT * FROM rooms WHERE id = $id";
			var params = { $id : query.id };
			runDbQuery(sql,params,function(data){
				callback && callback(data);
			});
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.renderSessionsQuery = function (query,callback){
	if(isValidAPIKey(query)){
		if( query.id != null && query.id != undefined ){
			var sql = "SELECT * FROM sessions WHERE id = $id";
			var params = { $id : query.id };
			runDbQuery(sql,params,function(data){
				callback && callback(data);
			});
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.renderEventsQuery = function (query,callback){
	if(isValidAPIKey(query)){
		if( query.id != null && query.id != undefined ){
			var sql = "SELECT * FROM events WHERE id = $id";
			var params = { $id : query.id };
			runDbQuery(sql,params,function(data){
				callback && callback(data);
			});
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.renderSemieventsQuery = function (query,callback){
	if(isValidAPIKey(query)){
		if( query.id != null && query.id != undefined ){
			var sql = "SELECT * FROM semievents WHERE id = $id";
			var params = { $id : query.id };
			runDbQuery(sql,params,function(data){
				callback && callback(data);
			});
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.renderAllSemieventsQuery = function (query,callback){
	if(isValidAPIKey(query)){
		var sql = "SELECT * FROM semievents";
		var params = { };
		runDbQuery(sql,params,function(data){
			callback && callback(data);
		});
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.renderAllEventsQuery = function (query,callback){
	if(isValidAPIKey(query)){
		var sql = "SELECT * FROM events";
		var params = { };
		runDbQuery(sql,params,function(data){
			callback && callback(data);
		});
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.updateExpTimeEvent = function(query,callback){
	if(isValidAPIKey(query)){
		if( query.id != null && query.exp_time != null){
			var sql = "UPDATE event SET exp_time = $exp_time WHERE event_id = $id";//parseInt?
			var params = { $id : query.id, $exp_time : query.exp_time};
			logSqlQuery(sql,params);
			db.run(sql,params,function(err){
				if(err == null && this.changes > 0){
					callback && callback(true);
				}
				else{
					callback && callback(err);
				}
			})
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.updateExpTimeSemievent = function(query,callback){
	if(isValidAPIKey(query)){
		if( query.id != null && query.exp_time != null){
			var sql = "UPDATE semievent SET exp_time = $exp_time WHERE clause_id = $id";//parseInt?
			var params = { $id : query.id, $exp_time : query.exp_time};
			logSqlQuery(sql,params);
			db.run(sql,params,function(err){
				if(err == null && this.changes > 0){
					callback && callback(true);
				}
				else{
					callback && callback(err);
				}
			})
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}


exports.addSessionData = function(query,callback){
	if(isValidAPIKey(query)){
		if( query.session_id != null && query.energy_consumption != null && query.time != null ){
			var sql = "UPDATE sessions SET energy_consumption = energy_consumption+$consumption, time = time+$time  WHERE id = $id";//parseInt?
			var params = { $id : query.session_id, $consumption : query.energy_consumption, $time : query.time };
			logSqlQuery(sql,params);
			db.run(sql,params,function(err){
				if(err == null && this.changes > 0){
					callback && callback(true);
				}
				else{
					callback && callback(err);
				}
			})
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.InsertSemievent = function(query,callback){
	if(isValidAPIKey(query)){
		if( query.device != null && query.energy != null && query.time != null && query.room != null && query.energytype != null && query.timetype != null && query.exp_time != null && query.clause_id != null && query.event_id != null){
			var sql = "Insert into semievents VALUES ($device,$room,$time,$energy,$timetype,$energytype,$exp_time,$clause_id,$event_id)";
			var params = { $id : query.clause_id, $energy : query.energy, $time : query.time, $timetype : query.timetype, $energytype : query.energytype, $exp_time : query.exp_time, $room : query.room, $event_id : query.event_id};
			logSqlQuery(sql,params);
			db.run(sql,params,function(err){
				if(err == null && this.changes > 0){
					callback && callback(true);
				}
				else{
					callback && callback(err);
				}
			})
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}

exports.InsertEvent = function(query,callback){
	if(isValidAPIKey(query)){
		if( query.eventName!=null && query.action!=null && query.exp_time != null && query.event_id != null){
			var sql = "Insert into semievents VALUES ($eventName,$action,$exp_time,$event_id)";
			var params = { $eventName : query.eventName, $action : query.action, $exp_time : query.exp_time, $room : query.room};
			logSqlQuery(sql,params);
			db.run(sql,params,function(err){
				if(err == null && this.changes > 0){
					callback && callback(true);
				}
				else{
					callback && callback(err);
				}
			})
		}
		else{
			response = invalidParamsError();
			callback && callback(response);
		}
	}
	else{
		response = invalidAPIKeyError();
		callback && callback(response);
	}
}


/************************
Database Functions
************************/
function runDbQuery(sql,params,callback){
	db.all(sql, params,function(err, row){
		if( err == null && row.length > 0 ){
			//console.log(row);
			var data = apiSuccessResponse(row);
			callback && callback(data);
		}
		else{
			console.log(err);
			var data = apiErrorResponse(err);
			callback && callback(data);
		}
	});
}

/************************
Helper Functions
************************/
function isValidAPIKey(query){
	var key = query.key;
	if( key != null && key != undefined){
		if( API_KEYS.indexOf(key) != -1 ){
			return true;
		}
		else{
			return false;
		}		
	}
	else{
		return false;
	}
}

function invalidAPIKeyError(){
	var response = {
		"status" : "INVALID_KEY",
		"response" : ""
	}
	return response;
}

function invalidParamsError(){
	var response = {
		"status" : "INVALID_PARAMETERS",
		"response" : ""
	}
	return response;
}

function apiErrorResponse(err){
	var response = {
		"status" : "ERROR",
		"response" : err
	}
	return response;
}

function apiSuccessResponse(res){
	var response = {
		"status" : "OK",
		"response" : res
	}
	return response;
}

function logSqlQuery(sql,params){
	var obj = {
		"sql" : sql,
		"params" : params
	}
	var s = JSON.stringify(obj);
	fs.appendFile('/home/vaibhav/leaf_app/database/query.log', s, function(err){
		if(err){
			console.log('there occured error in writing to file');
		}
		else{
			console.log('successfully written to file');
		}
	})
}
