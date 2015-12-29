/// <reference path='_all.ts' />

module exercises {

var mathApp = angular.module('maths', ['ngMdIcons', 'ngTouch','ui.bootstrap', 'ngRoute']);
mathApp.controller('exercise1Ctrl',Exercise1Ctrl);
mathApp.service('exerciseServices', ExerciseServices);

mathApp.config(['$routeProvider', function($routeProvider:any ) {
    $routeProvider.when('/', {
        templateUrl: 'app/components/homeView.html',
        controller: 'homeCtrl',
        resolve: {
          allTexts: ['textService', function(textService:any) {
            return textService.getAllTexts();
          }],
          mainMenuData: ['menuLoaderService', function(menuLoaderService:any) {
            return menuLoaderService.getMainMenuData();
          }]
        }
      }).when('/N1a', {
        templateUrl: 'app/components/exerciseView.html',
        controller: 'exercise1Ctrl',
        resolve: {
          'exercise1Data': (exerciseServices:IExerciseServices) => {
            return exerciseServices.getExercise1Data();
          }

        }
      }).when('/N1b', {
        templateUrl: 'app/components/exerciseView.html',
        controller: 'exercise2Controller',
        exetype: 'N1b',
        resolve: {
          'countExerciseServiceData': function(exercise2Service:any) {
            return exercise2Service.dataLoadPromise;
          },
          allTexts: ['textService', function(textService:any) {
            return textService.getAllTexts();
          }],
        }
      }).when('/N1c', {
        templateUrl: 'app/components/testerPage.html',
        controller: 'exercise1Ctrl',
        resolve: {
          'exercise1Data': (exerciseServices:IExerciseServices) =>{
            return exerciseServices.getExercise1Data();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);



}
