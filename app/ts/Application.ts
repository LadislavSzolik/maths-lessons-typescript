/// <reference path='_all.ts' />

module exercises {

  var mathApp = angular.module('maths', ['ngMdIcons', 'ngTouch', 'ui.bootstrap', 'ngRoute', 'ng-sortable', 'ngDragDrop']);

  mathApp.controller('homeCtrl', HomeCtrl);
  mathApp.controller('exercise1Ctrl', Exercise1Ctrl);
  mathApp.controller('exercise2Ctrl', Exercise2Ctrl);
  mathApp.controller('exercise3Ctrl', Exercise3Ctrl);
  mathApp.controller('exercise4Ctrl', Exercise4Ctrl);
  mathApp.controller('exercise5Ctrl', Exercise5Ctrl);
  mathApp.controller('exercise6Ctrl', Exercise6Ctrl);
  mathApp.controller('exercise7Ctrl', Exercise7Ctrl);
  mathApp.controller('exercise8Ctrl', Exercise8Ctrl);

  mathApp.controller('plusMinusExercise1Ctrl', PlusMinusExercise1Ctrl);
  mathApp.controller('plusMinusExercise2Ctrl', PlusMinusExercise2Ctrl);
  mathApp.controller('plusMinusExercise3Ctrl', PlusMinusExercise3Ctrl);
  mathApp.controller('plusMinusExercise4Ctrl', PlusMinusExercise4Ctrl);
  mathApp.controller('plusMinusExercise5Ctrl', PlusMinusExercise5Ctrl);
  mathApp.controller('plusMinusExercise6Ctrl', PlusMinusExercise6Ctrl);
  mathApp.controller('plusMinusExercise7Ctrl', PlusMinusExercise7Ctrl);

  mathApp.service('exerciseServices', ExerciseServices);

  mathApp.directive('animateRubber', animateRubber);
  mathApp.directive('animateRubberWithPosition', animateRubberWithPosition);
  mathApp.directive('animateButton', animateButton);
  mathApp.directive('draggableObject', draggableObject);
  mathApp.directive('droppableObject', droppableObject);
  mathApp.directive('droppableOrigin', droppableOrigin);

  mathApp.directive('droppableBall', droppableBall);
  mathApp.directive('draggableBall', draggableBall);
  mathApp.directive('droppableBallContainer', droppableBallContainer);

  mathApp.directive('focusIf', focusIf);




  // TODO: resolve caching of the services

  mathApp.config(['$routeProvider', function($routeProvider: any) {
    $routeProvider.when('/', {
      templateUrl: 'app/components/homeView.html',
      controller: 'homeCtrl',
      resolve: {
        'menuData': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getMenuData();
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    }).when('/N1a', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'exercise1Ctrl',
      resolve: {
        'exercise1Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExercise1Data();
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }

      }
    }).when('/N1b', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'exercise2Ctrl',
      resolve: {
        'exercise2Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExercise2Data();
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    }).when('/N1c', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'exercise3Ctrl',
      resolve: {
        'exercise3Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExercise3Data();
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    }).when('/N1d', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'exercise4Ctrl',
      resolve: {
        'exercise4Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExercise4Data();
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    }).when('/N2a', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'exercise5Ctrl',
      resolve: {
        'exercise5Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExercise5Data();
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    })
      .when('/N2b', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'exercise6Ctrl',
      resolve: {
        'exercise6Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExercise6Data();
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    }).when('/N2c', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'exercise7Ctrl',
      resolve: {
        'exercise7Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExercise7Data();
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    }).when('/N2d', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'exercise8Ctrl',
      resolve: {
        'exercise8Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExercise8Data();
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    })
      .when('/P1a', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'plusMinusExercise1Ctrl',
      resolve: {
        'plusMinusExe1Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExerciseFromJson("plusMinusExe1Data");
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    }).when('/P1b', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'plusMinusExercise2Ctrl',
      resolve: {
        'plusMinusExe2Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExerciseFromJson("plusMinusExe2Data");
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    }).when('/P1c', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'plusMinusExercise3Ctrl',
      resolve: {
        'plusMinusExe3Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExerciseFromJson("plusMinusExe3Data");
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    }).when('/P1d', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'plusMinusExercise4Ctrl',
      resolve: {
        'plusMinusExe4Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExerciseFromJson("plusMinusExe4Data");
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    })
    .when('/P2a', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'plusMinusExercise5Ctrl',
      resolve: {
        'plusMinusExe5Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExerciseFromJson("plusMinusExe5Data");
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    })
    .when('/P2b', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'plusMinusExercise6Ctrl',
      resolve: {
        'plusMinusExe6Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExerciseFromJson("plusMinusExe6Data");
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    })
    .when('/P2c', {
      templateUrl: 'app/components/exerciseView.html',
      controller: 'plusMinusExercise7Ctrl',
      resolve: {
        'plusMinusExe7Data': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getExerciseFromJson("plusMinusExe7Data");
        },
        'texts': (exerciseServices: IExerciseServices) => {
          return exerciseServices.getTexts();
        }
      }
    })
      .otherwise({
      redirectTo: '/'
    });
  }]);


}
