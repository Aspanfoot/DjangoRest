app.controller('MainCtrl', function($http, $scope, $state, $stateParams, Tasks, $cookies){
	$scope.tasks = []
	$scope.update = false;
	//Для юзера з юзернейм пароль створює токен
	$scope.login = function() {
		login_data = {"username" : $scope.username, "password": $scope.password}

		Tasks.getToken(login_data).then(function(res){
			$cookies.put("token", res.data.token);
			$state.go('todo');

			Tasks.cookieCreate();
			$scope.updateScope();
		});
	};
	//Видаляє токен юзера
	$scope.logout = function() {
		Tasks.cookieDelete();
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
			Tasks.cookieCreate();
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
		Tasks.cookieCreate();
		Tasks.all().then(function(res){
			console.log("Scope update");
			$scope.tasks = res.data

		});
	};

	if($cookies.get("token")){
		$scope.updateScope();
	}
});