
app.service('Tasks', function($http, BASE_URL){
	var Tasks = {};

	Tasks.all = function(){
		return $http.get(BASE_URL);
	};

	Tasks.by_id =function(task_id){
		return $http.get(BASE_URL + task_id)
	};

	Tasks.update = function(task){
		return $http.put(BASE_URL + task.id, task);
	};

	Tasks.delete = function(task_id){
		return $http.delete(BASE_URL + task_id + '/');
	};

	Tasks.add = function(task){
		return $http.post(BASE_URL, task)
	};

	return Tasks;
});


app.factory('SharedData', [function () {
	var container = {};
	return {
		getValue:function(){
			if(container.length != 0) {
				return container.formData
			}
			console.log("No value on your data");
		},
		setValue:function(formData){
			container = {
				'formData':formData
			}
			return container.formData
		}	
	}
}])