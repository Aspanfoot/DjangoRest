app.controller('MainCtrl', function($http, $scope, $state, $stateParams, Tasks, $cookies) {
	$scope.tasks = []
	$scope.update = false;
	$scope.hide = false;

	//Для юзера з юзернейм пароль створює токен
	$scope.login = function() {
		var login_data = {"username" : $scope.username, "password": $scope.password}

		//state.go принципово важливий оскільки я хочу апдейтнути скоуп після того як юзер залогається
		//Якщо логується і має токен тоді показати відповідні елементи меню
		Tasks.getToken(login_data).then(function(res){
			if(res.data.token) {
				$cookies.put("token", res.data.token);
				$state.go("todo");
				$scope.updateScope();
			}
		});
	};
	//Видаляє токен юзера якщо він натиснув logout
	$scope.logout = function() {
		Tasks.cookieDelete();
	}

	$scope.register = function() {
		Tasks.register($scope.user).then(function onSuccess(){
			$state.go("login");
		});
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
		}); 
	};

	//Підвантаження форми з параметрами на виклик кнопки едіт
	$scope.loadForm = function(id) {
		$scope.update = true;
		Tasks.get(id).then(function(res){
			$scope.task = res.data;
		});
	};

	//Апдейтим скоуп якщо відбулися якісь зміни
	$scope.updateScope = function() {
		Tasks.cookieCreate();
		Tasks.all().then(function(res){
			$scope.tasks = res.data
		});
	};

	$scope.test = function() {
		console.log("Controller works");
	}

	if($cookies.get("token")) {
		$scope.hide = true;
		$scope.updateScope();
	}
});