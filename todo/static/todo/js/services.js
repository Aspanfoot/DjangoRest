app.constant('BASE_URL', 'http://localhost:8000/api/tasks/');

app.service('Tasks', function($http, BASE_URL){
	var Tasks = {};

	Tasks.all = function(){
		return $http.get(BASE_URL);
	};

	Tasks.update = function(task){
		return $http.put(BASE_URL + task.id + '/', task);
	};

	Tasks.delete = function(task_id){
		return $http.delete(BASE_URL + task_id + '/');
	};

	Tasks.add = function(task){
		return $http.post(BASE_URL, task)
	};


	Tasks.get = function(task_id){
		return $http.get(BASE_URL + task_id + '/')
	};

	return Tasks;
});