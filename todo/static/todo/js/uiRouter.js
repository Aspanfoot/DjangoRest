app.config(function($stateProvider, $urlRouterProvider, $httpProvider){

	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

	$stateProvider
		.state('greetings', {
			url: '/',
			templateUrl: '/static/templates/greetings.html',
			controller: 'MainCtrl'
		})
		.state('manage', {
			url: "/manage",
			templateUrl: '/static/templates/manage.html',
			controller: 'MainCtrl'
		});
	$urlRouterProvider.otherwise('/');
});