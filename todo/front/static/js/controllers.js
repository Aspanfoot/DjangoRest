app.controller('MainCtrl', function($scope, $state, Tasks, ModalService, SharedData){
	$scope.tasks = {};

    $scope.$watch(function() {
        return SharedData.getValue()
    }, function(newVal, oldVal){
        if(newVal) {
            var task = {};
            if(typeof newVal.status.$modelValue) {
                task.status = "NOT_STARTED"
            } else {
                task.status = newVal.status.$modelValue;
            }

            

            if(typeof newVal.priority.$modelValue) {
                task.priority = "LOW"
            } else {
                task.priority = newVal.status.$modelValue;
            }

            task.name = newVal.name.$modelValue;
            task.description = newVal.description.$modelValue;

            $scope.addTask(task);
        }
    }, true);

	$scope.addTask = function(task) {
		Tasks.add(task)
			.then(function(res){
             $scope.tasks.push(task);
		});
	};

	$scope.deleteTask = function(id){
		Tasks.delete(id);
		$scope.tasks = $scope.tasks.filter(function(task){
			return task.id !== id;
		});
	};

	Tasks.all().then(function(res){
		$scope.tasks = res.data;
	});
});

app.controller("modalCreate", ['$scope', '$uibModal', '$log',

    function ($scope, $uibModal, $log) {

        $scope.addForm = function () {
            console.log("Listener works");
            var modalInstance = $uibModal.open({
                templateUrl: 'static/templates/modal.html',
                controller: addController,
                scope: $scope,
                resolve: {
                    taskForm: function () {
                        return $scope.taskForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
}]);

var addController = function ($scope, $uibModalInstance, taskForm, SharedData) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.taskForm.$valid) {
            console.log($scope.form.taskForm.status.$modalValue);
            console.log($scope.form.taskForm.status.$modalValue);

        	SharedData.setValue($scope.form.taskForm);
            $uibModalInstance.close('closed');

        } else {
            console.log('taskform is not in scope');
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

app.controller("modalUpdate", ['$scope', '$uibModal', '$log',
    function ($scope, $uibModal, $log) {
        $scope.updateForm = function (task_id) {
            console.log("Listener works");
            var modalInstance = $uibModal.open({
                templateUrl: 'static/templates/modal.html',
                controller: updateController,
                scope: $scope,
                resolve: {
                    taskForm: function () {
                        return $scope.taskForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
}]);

var updateController = function ($scope, $uibModalInstance, taskForm, SharedData) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.taskForm.$valid) {
            console.log($scope.form.taskForm.status.$modalValue);
            console.log($scope.form.taskForm.priority.$modalValue);
            SharedData.setValue($scope.form.taskForm);
            $uibModalInstance.close('closed');
        } else {
            console.log('taskform is not in scope');
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};