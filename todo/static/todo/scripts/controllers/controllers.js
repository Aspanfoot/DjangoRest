app.controller('MainCtrl', function($http, $scope, $state, $stateParams, Tasks, $cookies) {
	$scope.tasks = []
	$scope.update = false;

	//Для юзера з юзернейм пароль створює токен
	$scope.login = function() {
		var login_data = {"username" : $scope.username, "password": $scope.password}

		Tasks.getToken(login_data).then(function(res){
			$cookies.put("token", res.data.token);
			$state.go('todo');

			Tasks.cookieCreate();
			$scope.updateScope();
		});
	};
	//Видаляє токен юзера якщо він натиснув logout
	$scope.logout = function() {
		Tasks.cookieDelete();
	}

	$scope.register = function() {
		Tasks.register($scope.user)
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

	$scope.updateTask = function() {
		$scope.update=false;
		Tasks.update($scope.task).then(function(res){
			$scope.updateScope();
			Tasks.cookieCreate();
		}); 
	};

	//Підвантаження форми з параметрами на виклик кнопки едіт
	$scope.loadForm = function(id) {
		$scope.update = true;
		Tasks.get(id).then(function(res){
			$scope.task = res.data;
		});
	};

	//Фільтрування даних
	$scope.updateScope = function() {
		Tasks.cookieCreate();
		Tasks.all().then(function(res){
			console.log("Scope update");
			$scope.tasks = res.data
		});
	};

	$scope.test = function() {
		console.log("Controller works");
	}	

	if($cookies.get("token")) {
		$scope.updateScope();
	}
});