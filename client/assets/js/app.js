/**
 * Created by Instructor on 03/05/2016.
 */
var app=angular.module("app",['ngRoute']);
app.config(function ($routeProvider, $httpProvider) {
    //$httpProvider.interceptors.push("TokenInterceptorFactory");

    $routeProvider
        .when('/login',{
            templateUrl: 'partials/login.html',
            controller: 'LoginController',
            access:{
                requiredLogin:false
            }
        }).when('/dashboard',{
        templateUrl:'partials/home.html',
        controller:'HomeController',
        access:{
            requiredLogin:true
        }
    }).otherwise({
        redirectTo: '/login'
    }) ;
});