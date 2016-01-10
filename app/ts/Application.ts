/// <reference path='_all.ts' />

module exercises {

var mathApp = angular.module('maths', ['ngMdIcons', 'ngTouch','ui.bootstrap', 'ngRoute']);

mathApp.controller('homeCtrl',HomeCtrl);
mathApp.controller('exercise1Ctrl',Exercise1Ctrl);
mathApp.controller('exercise2Ctrl',Exercise2Ctrl);
mathApp.controller('exercise3Ctrl', Exercise3Ctrl);

mathApp.service('exerciseServices', ExerciseServices);

mathApp.directive('animateRubber',animateRubber);
mathApp.directive('animateButton',animateButton);
mathApp.directive('draggableObject',draggableObject);
mathApp.directive('droppableObject',droppableObject);
mathApp.directive('droppableOrigin',droppableOrigin);

mathApp.directive('droppableBall',droppableBall);
mathApp.directive('draggableBall',draggableBall);
mathApp.directive('droppableBallContainer',droppableBallContainer);


// TODO: resolve caching of the services

mathApp.config(['$routeProvider', function($routeProvider:any ) {
    $routeProvider.when('/', {
        templateUrl: 'app/components/homeView.html',
        controller: 'homeCtrl',
        resolve: {
          'menuData': (exerciseServices:IExerciseServices) => {
            return exerciseServices.getMenuData();
          },
          'texts': (exerciseServices:IExerciseServices) => {
            return exerciseServices.getTexts();
          }
        }
      }).when('/N1a', {
        templateUrl: 'app/components/exerciseView.html',
        controller: 'exercise1Ctrl',
        resolve: {
          'exercise1Data': (exerciseServices:IExerciseServices) => {
            return exerciseServices.getExercise1Data();
          },
          'texts': (exerciseServices:IExerciseServices) => {
            return exerciseServices.getTexts();
          }

        }
      }).when('/N1b', {
        templateUrl: 'app/components/exerciseView.html',
        controller: 'exercise2Ctrl',
        resolve: {
          'exercise2Data': (exerciseServices:IExerciseServices) => {
            return exerciseServices.getExercise2Data();
          },
          'texts': (exerciseServices:IExerciseServices) => {
            return exerciseServices.getTexts();
          }
        }
      }).when('/N1c', {
        templateUrl: 'app/components/exerciseView.html',
        controller: 'exercise3Ctrl',
        resolve: {
          'exercise3Data': (exerciseServices:IExerciseServices) => {
            return exerciseServices.getExercise3Data();
          },
          'texts': (exerciseServices:IExerciseServices) => {
            return exerciseServices.getTexts();
          }
        }

      })
      .otherwise({
        redirectTo: '/'
      });
  }]);



}
