app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'static/templates/home.template',
			controller: 'MainCtrl'
		})
		.state('manage', {
			url: "/manage",
			templateUrl: 'static/templates/manage.template',
			controller: 'MainCtrl'
		});
	$urlRouterProvider.otherwise('/');
});