//Add interceptors



app.controller('MainCtrl', function($http, $scope, $state, $stateParams, Tasks, $cookies) {
	$scope.tasks = []
	$scope.update = false;
	$scope.hide = false;

	$scope.login = function() {

		var loginData = {"username" : $scope.username, "password": $scope.password}
		
		Tasks.createCookie(loginData).then(
			function onSucess(res){
				console.log(res);
				$cookies.put("token", res.data.token);
				$state.go("todo");
			},
			function onError (res) {
				console.log();
			}
		);
	};
	//Видаляє токен юзера якщо він натиснув logout
	$scope.logout = function () {
		Tasks.cookieDelete();
	}

	$scope.register = function () {
		Tasks.register($scope.user).then(function onSuccess(){
			$state.go("login");
		});
	}
	//Круд тасків
	$scope.addTask = function () {
		Tasks.add($scope.task)
			.then(function(res){
			console.log(res.data);
			$scope.updateScope();
		});
	};

	$scope.deleteTask = function (id) {
		Tasks.delete(id).then(function(res) {
			$scope.updateScope();
		});
	};

	$scope.updateTask = function () {
		$scope.update=false;
		Tasks.update($scope.task).then(function(res){
			$scope.updateScope();
		}); 
	};

	//Підвантаження форми з параметрами на виклик кнопки едіт
	$scope.loadForm = function (id) {
		$scope.update = true;
		Tasks.get(id).then(function(res){
			$scope.task = res.data;
		});
	};

	//Апдейтим скоуп якщо відбулися якісь зміни
	$scope.updateScope = function () {
		// Tasks.cookieCreate();
		Tasks.all().then(function(res){
			$scope.tasks = res.data
		});
	};

	//Home view button fork
	$scope.home = function () {
		console.log("login");
		if ($cookies.get("token")) {
			$state.go("todo");
		} else {
			$state.go("login");
		}
	}

	$scope.test = function () {
		Tasks.test().then(function(res){
			console.log(res.data.token);
		});
	};

	if($cookies.get("token")) {
		$scope.hide = true;
		$scope.updateScope();
	}

});