/**
 * Created by Instructor on 03/05/2016.
 */
app.controller("HeaderController", ['$scope', '$location','$window','UserLoginFactory',
    function($scope, $location,$window, UserLoginFactory) {
        $scope.isActive = function(route) {
            return route === $location.path();
        }
        $scope.logout = function () {
            UserLoginFactory.logout();
        }
    }
]);
app.controller("HomeController", ['$scope',
    function($scope) {
        $scope.name = "Dashboard";
        $scope.description="| Centro de Administraci\u00f3n de recursos.";
    }
]);
