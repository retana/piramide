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
                    console.log(data);
                    if(data.user){
                        AuthenticationFactory.isLogged=true;
                        AuthenticationFactory.user=data.user.nombre;
                        AuthenticationFactory.role=data.user.id_rol;
                        AuthenticationFactory.idUser=data.user.id_usuario;

                        $window.sessionStorage.token=data.token;
                        $window.sessionStorage.user=data.user.nombre;
                        $window.sessionStorage.role=data.user.id_rol;
                        $window.sessionStorage.idUser=data.user.id_usuario;
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