app.constant('BASE_URL', 'http://localhost:8000/api/tasks/');
app.constant('TOKEN_URL', 'http://127.0.0.1:8000/api/accounts/get_auth_token/');

app.service('Tasks', function($http ,BASE_URL, TOKEN_URL, $cookies){
	var Tasks = {};

	Tasks.cookieCreate = function() {
		$http.defaults.headers.common.Authorization = "Token " + $cookies.get("token");
		console.log("User logged in with token" + $cookies.get("token"));
	};

	Tasks.cookieDelete = function() {
		$cookies.remove("token");
		console.log("Cookie was deleted");
		console.log($cookies.get("token"));
	}

	Tasks.getToken = function(login_data) {
		return $http.post(TOKEN_URL, login_data)
	};

	Tasks.all = function() {
		return $http.get("/api/gettasks/");
	};

	Tasks.update = function(task) {
		return $http.put(BASE_URL + task.id + '/', task);
	};

	Tasks.delete = function(task_id) {
		return $http.delete(BASE_URL + task_id + '/');
	};

	Tasks.add = function(task) {
		return $http.post("/api/createtask/", task)
	};

	Tasks.get = function(task_id) {
		return $http.get(BASE_URL + task_id + '/')
	};

	Tasks.userTasks = function(){
		return $http.get(BASE_URL + task_id + '/')
	}

	return Tasks;
});