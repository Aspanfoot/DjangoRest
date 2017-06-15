app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){

	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

	$stateProvider
		.state('home', {
			url: '/',
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html',
					controller: 'MainCtrl'
				},
				body: {
					templateUrl: '/static/templates/home.html',
					controller: 'MainCtrl'
				}
			},	
			controller: 'MainCtrl'
		})
		.state('todo', {
			url: "/todo",
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html',
					controller: 'MainCtrl'
				},
				body: {
					templateUrl: '/static/templates/todo_list.html',
					controller: 'MainCtrl'
				}
			},
			controller: 'MainCtrl'
		})
		.state('login',{
			url:"/login",
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html',
					controller: 'MainCtrl'
				},
				body: {
					templateUrl: '/static/templates/auth/login.html',
					controller: 'MainCtrl'

				}
			},
			controller: 'MainCtrl'
		})
		.state('logout',{
			url:"/logout",
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html',
					controller: 'MainCtrl'
				},
				body: {
					templateUrl: '/static/templates/auth/logout.html',
					controller: 'MainCtrl'
				}
			},
			controller: 'MainCtrl'
		})
		.state('register', {
			url:'/register',
			views:{
				header: {
					templateUrl: '/static/templates/navigation.html',
					controller: 'MainCtrl'
				},
				body: {
					templateUrl: '/static/templates/auth/register.html',
					controller: 'MainCtrl'
				}
			},
			controller: 'MainCtrl'
		});

	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
});
