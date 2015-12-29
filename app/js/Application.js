var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var exercises;
(function (exercises) {
    var BaseItem = (function () {
        function BaseItem() {
        }
        return BaseItem;
    })();
    exercises.BaseItem = BaseItem;
    var Exercise1Item = (function (_super) {
        __extends(Exercise1Item, _super);
        function Exercise1Item() {
            _super.apply(this, arguments);
        }
        return Exercise1Item;
    })(BaseItem);
    exercises.Exercise1Item = Exercise1Item;
})(exercises || (exercises = {}));
var exercises;
(function (exercises) {
    var ExerciseServices = (function () {
        function ExerciseServices($http) {
            this.$http = $http;
            this.$inject = ["$http"];
        }
        ExerciseServices.prototype.getExercise1Data = function () {
            return this.$http.get('app/data/exe1Data.json').then(function (result) { return result.data; });
        };
        return ExerciseServices;
    })();
    exercises.ExerciseServices = ExerciseServices;
})(exercises || (exercises = {}));
var exercises;
(function (exercises) {
    'use strict';
    var ExerciseStorage = (function () {
        function ExerciseStorage() {
            this.STORAGE_ID = 'todos-angularjs-typescript';
        }
        ExerciseStorage.prototype.get = function () {
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        };
        ExerciseStorage.prototype.put = function (todos) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        };
        return ExerciseStorage;
    })();
    exercises.ExerciseStorage = ExerciseStorage;
})(exercises || (exercises = {}));
var exercises;
(function (exercises) {
    var NavigationBase = (function () {
        function NavigationBase($scope, $location, $route) {
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            $scope.vm = this;
            this.currentPage = 1;
        }
        NavigationBase.prototype.isCurrentExercise = function (index) {
            return this.currentPage == (index + 1);
        };
        NavigationBase.prototype.exit = function () {
            this.$location.path('/');
        };
        NavigationBase.prototype.reload = function () {
            this.$route.reload();
        };
        NavigationBase.prototype.checkResult = function () {
        };
        NavigationBase.prototype.selectPage = function (page) {
            if (page > 0 && page <= this.$scope.totalItems) {
                this.$scope.currentPage = page;
            }
        };
        ;
        NavigationBase.prototype.noPrevious = function () {
            return this.$scope.currentPage === 1;
        };
        ;
        NavigationBase.prototype.noNext = function () {
            return this.$scope.currentPage === this.$scope.totalItems;
        };
        ;
        return NavigationBase;
    })();
    exercises.NavigationBase = NavigationBase;
    var Exercise1Ctrl = (function (_super) {
        __extends(Exercise1Ctrl, _super);
        function Exercise1Ctrl($scope, $location, $route, exercise1Data) {
            _super.call(this, $scope, $location, $route);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.exercise1Data = exercise1Data;
            this.exetype = "N1a";
        }
        ;
        Exercise1Ctrl.$inject = ['$scope', '$location', '$route', 'exercise1Data'];
        return Exercise1Ctrl;
    })(NavigationBase);
    exercises.Exercise1Ctrl = Exercise1Ctrl;
})(exercises || (exercises = {}));
var exercises;
(function (exercises) {
    var mathApp = angular.module('maths', ['ngMdIcons', 'ngTouch', 'ui.bootstrap', 'ngRoute']);
    mathApp.controller('exercise1Ctrl', exercises.Exercise1Ctrl);
    mathApp.service('exerciseServices', exercises.ExerciseServices);
    mathApp.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/components/homeView.html',
                controller: 'homeCtrl',
                resolve: {
                    allTexts: ['textService', function (textService) {
                            return textService.getAllTexts();
                        }],
                    mainMenuData: ['menuLoaderService', function (menuLoaderService) {
                            return menuLoaderService.getMainMenuData();
                        }]
                }
            }).when('/N1a', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise1Ctrl',
                resolve: {
                    'exercise1Data': function (exerciseServices) {
                        return exerciseServices.getExercise1Data();
                    }
                }
            }).when('/N1b', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise2Controller',
                exetype: 'N1b',
                resolve: {
                    'countExerciseServiceData': function (exercise2Service) {
                        return exercise2Service.dataLoadPromise;
                    },
                    allTexts: ['textService', function (textService) {
                            return textService.getAllTexts();
                        }],
                }
            }).when('/N1c', {
                templateUrl: 'app/components/testerPage.html',
                controller: 'exercise1Ctrl',
                resolve: {
                    'exercise1Data': function (exerciseServices) {
                        return exerciseServices.getExercise1Data();
                    }
                }
            })
                .otherwise({
                redirectTo: '/'
            });
        }]);
})(exercises || (exercises = {}));
//# sourceMappingURL=Application.js.map