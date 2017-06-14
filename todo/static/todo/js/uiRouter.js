app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){

  	// $locationProvider.html5Mode(true);

	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

	$stateProvider
		.state('home', {
			url: '/',
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html'
				},
				body: {
					templateUrl: '/static/templates/home.html'
				}
			},	
			controller: 'MainCtrl'
		})
		.state('todo', {
			url: "/todo/:token",
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html'
				},
				body: {
					templateUrl: '/static/templates/todo.html'
				}
			},
			controller: 'MainCtrl'
		})
		.state('login',{
			url:"/login",
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html'
				},
				body: {
					templateUrl: '/static/templates/login.html'
				}
			},
			controller: 'MainCtrl'
		})
		.state('logout',{
			url:"/logout",
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html'
				},
				body: {
					templateUrl: '/static/templates/logout.html'
				}
			},
			controller: 'MainCtrl'
		})
		.state('register', {
			url:'/register',
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html'
				},
				body: {
					templateUrl: '/static/templates/register.html'
				}
			},
			controller: 'MainCtrl'
		});

	$urlRouterProvider.otherwise('/');
});
