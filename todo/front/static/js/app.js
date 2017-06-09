var app = angular.module('todo', ["ui.router"]);

app.constant('BASE_URL', 'http://localhost:8000/api/tasks/');

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'static/templates/home.template',
			controller: 'MainCtrl'
		})
		.state('manage-tasks', {
			url: "/manage",
			templateUrl: 'static/templates/manage.template',
			controller: 'MainCtrl'
		});
	$urlRouterProvider.otherwise('/');
});

app.controller('MainCtrl', function($scope, Tasks, $state){
	$scope.tasks = {};
	$scope.addTask = function() {
		Tasks.add($scope.tasks)
			.then(function(res){
				// redirect to homepage once added
				$state.go('manage-task');
			});
	};

	$scope.toggleCompleted = function(task) {
		Tasks.update(task);
	};

	$scope.deleteTask = function(id){
		Tasks.delete(id);
		// update the list in ui
		$scope.tasks = $scope.tasks.filter(function(task){
			return task.id !== id;
		});
	};

	Tasks.all().then(function(res){
		$scope.tasks = res.data;
	});
});


app.service('Tasks', function($http, BASE_URL){
	var Tasks = {};

	Tasks.all = function(){
		return $http.get(BASE_URL);
	};

	Tasks.update = function(task){
		return $http.put(BASE_URL + task.id, task);
	};

	Tasks.delete = function(task_id){
		return $http.delete(BASE_URL + id + '/');
	};

	Tasks.add = function(task){
		return $http.post(BASE_URL, task)
	};

	return Tasks;
});