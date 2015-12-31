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
    var Exercise1Item = (function () {
        function Exercise1Item(number) {
            this.number = number;
        }
        Exercise1Item.prototype.getElementSizeForFrameSize = function (size, numberOfRange) {
            var frameArea = size * size;
            var limitCorrection = CommonMath.findNextSqrt(numberOfRange);
            return Math.sqrt(Math.floor(frameArea / limitCorrection));
        };
        Exercise1Item.prototype.getListOfPositions = function (numberOfRange, largeFrame, smallFrame) {
            if (angular.isUndefined(this.listOfPositions)) {
                this.listOfPositions = [];
                this.largeElementSize = this.getElementSizeForFrameSize(largeFrame, numberOfRange);
                this.smallElementSize = this.getElementSizeForFrameSize(smallFrame, numberOfRange);
                var largeFrameRowsNumber = Math.round(largeFrame / this.largeElementSize);
                var possiblePositions = CommonMath.getNumberArr(largeFrameRowsNumber * largeFrameRowsNumber, 1);
                for (var i = 0; i < this.number; i++) {
                    var position = (possiblePositions.splice(Math.floor(Math.random() * possiblePositions.length), 1))[0];
                    var largeTop = Math.floor(this.largeElementSize * Math.floor(position / largeFrameRowsNumber));
                    var largeLeft = Math.floor(this.largeElementSize * (position % largeFrameRowsNumber));
                    var smallTop = Math.floor(this.smallElementSize * Math.floor(position / largeFrameRowsNumber));
                    var smallLeft = Math.floor(this.smallElementSize * (position % largeFrameRowsNumber));
                    this.listOfPositions.push(new ObjectPosition(largeTop, largeLeft, smallTop, smallLeft));
                }
            }
            return this.listOfPositions;
        };
        return Exercise1Item;
    })();
    exercises.Exercise1Item = Exercise1Item;
    var ObjectPosition = (function () {
        function ObjectPosition(largePositionTop, largePositionLeft, smallPositionTop, smallPositionLeft) {
            this.largePositionTop = largePositionTop;
            this.largePositionLeft = largePositionLeft;
            this.smallPositionTop = smallPositionTop;
            this.smallPositionLeft = smallPositionLeft;
        }
        ObjectPosition.prototype.getLargePosition = function () {
            return { top: this.largePositionTop + 'px', left: this.largePositionLeft + 'px' };
        };
        ObjectPosition.prototype.getSmallPosition = function () {
            return { top: this.smallPositionTop + 'px', left: this.smallPositionLeft + 'px' };
        };
        return ObjectPosition;
    })();
    exercises.ObjectPosition = ObjectPosition;
    var CommonMath = (function () {
        function CommonMath() {
        }
        CommonMath.findNextSqrt = function (x) {
            if (Math.sqrt(x) % 1 > 0) {
                return this.findNextSqrt(x + 1);
            }
            else {
                return x;
            }
        };
        CommonMath.getNumberArr = function (upperLimit, repeatCount) {
            var numberArr = [];
            var counter = 0;
            while (numberArr.length < (repeatCount * upperLimit)) {
                numberArr.push((counter++ % upperLimit));
            }
            return numberArr;
        };
        return CommonMath;
    })();
    exercises.CommonMath = CommonMath;
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
        function NavigationBase($scope, $location, $route, totalItems) {
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.totalItems = totalItems;
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
        NavigationBase.prototype.isSummaryActive = function () {
            return false;
        };
        NavigationBase.prototype.selectPage = function (page) {
            if (page > 0 && page <= this.totalItems) {
                this.currentPage = page;
            }
        };
        ;
        NavigationBase.prototype.noPrevious = function () {
            return this.currentPage === 1;
        };
        ;
        NavigationBase.prototype.noNext = function () {
            return this.currentPage === this.totalItems;
        };
        ;
        return NavigationBase;
    })();
    exercises.NavigationBase = NavigationBase;
    var Exercise1Ctrl = (function (_super) {
        __extends(Exercise1Ctrl, _super);
        function Exercise1Ctrl($scope, $location, $route, exercise1Data) {
            _super.call(this, $scope, $location, $route, exercise1Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.exercise1Data = exercise1Data;
            this.exetype = "N1a";
            for (var i = 0; i < exercise1Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise1Item(exercise1Data.subexerciseListDTO[i].number);
                exercise1Data.subexerciseListDTO[i] = exeItem;
                exercise1Data.subexerciseListDTO[i].getListOfPositions(exercise1Data.numberOfRange, 330, 80);
            }
        }
        ;
        Exercise1Ctrl.prototype.backspace = function (index) {
            if (!this.isSummaryActive() && angular.isDefined(this.exercise1Data.subexerciseListDTO[index].givenNumber)) {
                var givenNumber = this.exercise1Data.subexerciseListDTO[index].givenNumber.toString();
                var tempNumberString = givenNumber.substring(0, givenNumber.length - 1);
                var finalNumber;
                if (tempNumberString.length == 0) {
                    finalNumber = undefined;
                }
                else {
                    finalNumber = parseInt(tempNumberString);
                }
                this.exercise1Data.subexerciseListDTO[index].givenNumber = finalNumber;
            }
        };
        Exercise1Ctrl.prototype.setUserInput = function (index, newVal) {
            if (!this.isSummaryActive()) {
                var givenNumber = this.exercise1Data.subexerciseListDTO[index].givenNumber;
                if (angular.isUndefined(givenNumber) || givenNumber == null) {
                    givenNumber = newVal;
                }
                else if (givenNumber.toString().length < 2) {
                    givenNumber = parseInt(String(givenNumber) + String(newVal));
                }
                console.log(givenNumber.toString().length);
                this.exercise1Data.subexerciseListDTO[index].givenNumber = givenNumber;
            }
        };
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