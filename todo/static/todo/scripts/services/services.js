app.constant('BASE_URL', 'http://localhost:8000/api/tasks/');
app.constant('ACCOUNTS', 'http://127.0.0.1:8000/api/accounts/');


app.factory('authorizationInterceptor', function ($cookies) {
	return {
		request: function(config) {
			if ($cookies.get("token")) {
				config.headers['Authorization'] = "Token " + $cookies.get("token");
			}

			return config;
		}
	};
});

app.config(function ($httpProvider) {
	$httpProvider.interceptors.push('authorizationInterceptor');
});

app.service('Tasks', function($http, $cookies, BASE_URL, ACCOUNTS) {
	var Tasks = {};

	Tasks.cookieDelete = function () {
		$cookies.remove("token");
		console.log($cookies.get("token"));
	}

	Tasks.createCookie = function (login_data) {
		return $http.post(ACCOUNTS + "get_auth_token/", login_data);
	};

	Tasks.register = function (user){
		console.log(user);
		return $http.post(ACCOUNTS + "users/" , user)
	}

	Tasks.all = function () {
		return $http.get(BASE_URL);
	};

	Tasks.update = function (task) {
		return $http.put(BASE_URL + task.id + '/', task);
	};

	Tasks.delete = function (task_id) {
		return $http.delete(BASE_URL + task_id + '/');
	};

	Tasks.add = function (task) {
		return $http.post(BASE_URL, task)
	};

	Tasks.get = function (task_id) {
		console.log(task_id);
		return $http.get(BASE_URL + task_id + '/')
	};

	return Tasks;
});