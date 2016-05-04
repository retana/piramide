/**
 * Created by retana on 11/03/2016.
 */
app.factory('AuthenticationFactory',function($window){
    var auth={
        isLogged:false,
        check: function () {
            if($window.sessionStorage.token && $window.sessionStorage.user){
                this.isLogged=true;
            }else{
                this.isLogged=false;
                delete this.user;
            }
        }
    }
    return auth;
});

app.factory("UserLoginFactory",function($window,$location,$http, AuthenticationFactory){
    return{
      login:function(username,password){
            return $http.post("http://localhost:8080/api/v1/usuario/autenticar",{
                username:username,
                password:password
            });
        },
      logout:function(){
        if(AuthenticationFactory.isLogged){
            AuthenticationFactory.isLogged=false;
            delete AuthenticationFactory.user;

            delete $window.sessionStorage.token;
            delete $window.sessionStorage.user;

            $location.path("/login");
        }
      }
    };
});

app.factory("TokenInterceptorFactory",function($q,$window){
    return{
        request:function(config){
            config.headers=config.headers||{};
            if($window.sessionStorage.token){
                config.headers['X-Access-Token']=$window.sessionStorage.token;
                config.headers['X-Key']=$window.sessionStorage.user;
                config.headers['Content-Type']="application/json";
            }
            return config || $q.when(config);
        },
        response: function (response) {
            return response || $q.when(response);
        }
    }
});