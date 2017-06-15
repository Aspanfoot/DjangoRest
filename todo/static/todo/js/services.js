app.constant('BASE_URL', 'http://localhost:8000/api/tasks/');

app.service('Tasks', function($http ,BASE_URL){

	var Tasks = {};
	header = {
		headers:{"Authorization": "Token 17b8925cea5e1471527040eead1802d7bb22ac24"}
	}

	Tasks.token = function(login_data) {
		return $http.post("/api/accounts/get_auth_token/", login_data)
	};

	Tasks.all = function() {
		return $http.get(BASE_URL, header);
	};

	Tasks.update = function(task) {
		return $http.put(BASE_URL + task.id + '/', task);
	};

	Tasks.delete = function(task_id) {
		return $http.delete(BASE_URL + task_id + '/', header);
	};

	Tasks.add = function(task) {
		return $http.post("/api/createtask/", task, header)
	};


	Tasks.get = function(task_id) {
		return $http.get(BASE_URL + task_id + '/')
	};

	return Tasks;
});