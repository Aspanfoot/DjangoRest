app.controller('MainCtrl', function($scope, $state, Tasks){
	$scope.tasks = {};
	$scope.update = false;

	$scope.addTask = function() {

		var task = $scope.task;
		
		Tasks.add(task)
			.then(function(res){
			$scope.update_scope();
		});
	};

	$scope.deleteTask = function(id){
		Tasks.delete(id).then(function(res){
			$scope.update_scope();
		});
	};

	$scope.updateTask = function(){
		var task = $scope.task;

		Tasks.update(task).then(function(res){
			$scope.update_scope();
		}); 
	};

	$scope.loadForm = function(id){
		$scope.update = true;

		var task = {};
		Tasks.get(id).then(function(res){
			task = res.data;
			
			$scope.task = task;
		});
	};



	$scope.update_scope = function(){
		Tasks.all().then(function(res){
			$scope.tasks = res.data;
		});
	};

	$scope.update_scope();
});