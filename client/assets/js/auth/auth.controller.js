/**
 * Created by retana on 11/03/2016.
 */
app.controller('LoginController',['$scope','$window','$location','UserLoginFactory','AuthenticationFactory',
    function($scope,$window,$location,UserLoginFactory,AuthenticationFactory){
        $scope.user={
            username:undefined,
            password:undefined
        }
        $scope.login= function () {
            var username=$scope.user.username,
            password=$scope.user.password;
            if(username!==undefined && password!==undefined){
                UserLoginFactory.login(username,password).success(function(data){
                    if(data.user.length){
                        AuthenticationFactory.isLogged=true;
                        AuthenticationFactory.user=data.user[0].usuario;
                        AuthenticationFactory.role=data.user[0].idRol;

                        $window.sessionStorage.token=data.token;
                        $window.sessionStorage.user=data.user[0].usuario;
                        $window.sessionStorage.role=data.user[0].idRol;
                        $location.path('/dashboard');
                    }else{
                        $location.path('/login');
                    }
                }).error(function (status) {
                    alert("Ooops a ocurrido un error al contactar el servidor: "+status);
                });
            }else{
                alert("Por favor llena los campos");
            }

        }
}]);