var app = angular.module('todo', [
	"ui.router",
	"ui.bootstrap",
	"angularModalService"
	]
);

app.constant('BASE_URL', 'http://localhost:8000/api/tasks/');