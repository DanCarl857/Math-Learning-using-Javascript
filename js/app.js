angular.module('MLP', ['ui.router', 'ngRoute'])
.config(function($stateProvider, $urlRouterProvider, $routeProvider){
$routeProvider
  .when('/main', {
    templateUrl: 'templates/main.html'
  })
  .otherwise({redirectTo: '/'})
})

.controller('mainCtrl', function($rootScope, $scope, $state){
    // activation for select fields
    $(document).ready(function(){
      $('select').material_select();
    });

    $rootScope.navTo = function(){
      $state.transitionTo('main');
    }

    $rootScope.test = function(){
      console.log('WTF');
    }
})

.controller('gameCtrl', function($rootScope, $scope, $state, $http){
  $rootScope = 'this is just a test';
})
