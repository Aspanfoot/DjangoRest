app.controller('MainCtrl', function($http, $scope, $state, $stateParams, Tasks){
	$scope.tasks = []
	$scope.update = false;
	//Для юзера з юзернейм пароль створює токен
	$scope.login = function() {
		login_data = {"username" : $scope.username, "password": $scope.password}

		Tasks.token(login_data).then(function(res){
			console.log(res.data.token);
			$state.go('todo', {"token":res.data.token})
		});
	};

	//Видаляє токен юзера
	$scope.logout = function() {
		$stateParams.token = Null;
	}

	//Круд тасків
	$scope.addTask = function() {
		Tasks.add($scope.task)
			.then(function(res){
			console.log(res.data);
			$scope.updateScope();
		});
	};

	$scope.deleteTask = function(id) {
		Tasks.delete(id).then(function(res) {
			$scope.updateScope();
		});
	};

	$scope.updateTask = function(){
		Tasks.update($scope.task).then(function(res){
			$scope.updateScope();
		}); 
	};

	//Підвантаження форми з параметрами
	$scope.loadForm = function(id){
		$scope.update = true;
		Tasks.get(id).then(function(res){
			$scope.task = res.data;
		});
	};

	//Фільтрування даних
	$scope.updateScope = function(){
		Tasks.all().then(function(res){
			$scope.tasks = res.data
		});
	};

	// function filter_token(res){
	// 	var temp = []
	// 	for(i=0; i<res.data.length-1; i++) {
	// 		if(res.data[i].token == $stateParams.token){
	// 			temp.push(res.data[i]);
	// 		}
	// 	}
	// 	return temp
	// }

	$scope.updateScope();
});