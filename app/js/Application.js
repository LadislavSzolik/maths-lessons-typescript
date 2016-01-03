var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var exercises;
(function (exercises) {
    var Exercise1Item = (function () {
        function Exercise1Item(number) {
            this.number = number;
            this.itemId = Exercise1Item.id++;
        }
        Exercise1Item.prototype.getElementSizeForFrameSize = function (size, numberOfRange) {
            var frameArea = size * size;
            var limitCorrection = CommonMath.findNextSqrt(numberOfRange);
            return Math.sqrt(Math.floor(frameArea / limitCorrection));
        };
        Exercise1Item.prototype.getListOfPositions = function (numberOfRange, largeFrame, smallFrame, targetNumber) {
            if (angular.isUndefined(this.listOfPositions)) {
                this.listOfPositions = [];
                this.largeElementSize = this.getElementSizeForFrameSize(largeFrame, numberOfRange);
                this.smallElementSize = this.getElementSizeForFrameSize(smallFrame, numberOfRange);
                var largeFrameRowsNumber = Math.round(largeFrame / this.largeElementSize);
                var possiblePositions = CommonMath.getNumberArr(largeFrameRowsNumber * largeFrameRowsNumber, 1);
                for (var i = 0; i < targetNumber; i++) {
                    var position = (possiblePositions.splice(Math.floor(Math.random() * possiblePositions.length), 1))[0];
                    var largeTop = Math.floor(this.largeElementSize * Math.floor(position / largeFrameRowsNumber));
                    var largeLeft = Math.floor(this.largeElementSize * (position % largeFrameRowsNumber));
                    var smallTop = Math.floor(this.smallElementSize * Math.floor(position / largeFrameRowsNumber));
                    var smallLeft = Math.floor(this.smallElementSize * (position % largeFrameRowsNumber));
                    var objectPosition = new ObjectPosition(largeTop, largeLeft, smallTop, smallLeft);
                    objectPosition.parentId = this.itemId;
                    this.listOfPositions.push(objectPosition);
                }
            }
            return this.listOfPositions;
        };
        Exercise1Item.id = 0;
        return Exercise1Item;
    })();
    exercises.Exercise1Item = Exercise1Item;
    var Exercise2Item = (function (_super) {
        __extends(Exercise2Item, _super);
        function Exercise2Item(number) {
            _super.call(this, number);
            this.number = number;
        }
        Exercise2Item.prototype.addObject = function () {
            for (var i = 0; i < this.listOfPositions.length; i++) {
                if (this.listOfPositions[i].isDisplayed == false) {
                    this.listOfPositions[i].isDisplayed = true;
                    return;
                }
            }
        };
        return Exercise2Item;
    })(Exercise1Item);
    exercises.Exercise2Item = Exercise2Item;
    var ObjectPosition = (function () {
        function ObjectPosition(largePositionTop, largePositionLeft, smallPositionTop, smallPositionLeft) {
            this.largePositionTop = largePositionTop;
            this.largePositionLeft = largePositionLeft;
            this.smallPositionTop = smallPositionTop;
            this.smallPositionLeft = smallPositionLeft;
            this.isDisplayed = false;
            this.objectId = ObjectPosition.id++;
            this.isDropped = false;
            this.isDisabled = false;
        }
        ObjectPosition.prototype.getInitPlace = function () {
            if (this.isDropped) {
                return {
                    top: this.largePositionTop,
                    left: this.largePositionLeft,
                };
            }
            else {
                return {
                    top: '230px',
                    left: '-200px',
                    height: '120px',
                    'z-index': '99'
                };
            }
        };
        ObjectPosition.prototype.getLargePosition = function () {
            return { top: this.largePositionTop + 'px', left: this.largePositionLeft + 'px' };
        };
        ObjectPosition.prototype.setLargePosition = function (top, left) {
            this.largePositionTop = top;
            this.largePositionLeft = left;
        };
        ObjectPosition.prototype.getSmallPosition = function () {
            return { top: this.smallPositionTop + 'px', left: this.smallPositionLeft + 'px' };
        };
        ObjectPosition.prototype.setSmallPosition = function (top, left) {
            this.smallPositionTop = top;
            this.smallPositionLeft = left;
        };
        ObjectPosition.id = 0;
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
        ExerciseServices.prototype.getMenuData = function () {
            return this.$http.get('app/data/menuData.json').then(function (result) { return result.data; });
        };
        ExerciseServices.prototype.getExercise1Data = function () {
            return this.$http.get('app/data/exe1Data.json').then(function (result) { return result.data; });
        };
        ExerciseServices.prototype.getExercise2Data = function () {
            return this.$http.get('app/data/exe2Data.json').then(function (result) { return result.data; });
        };
        ExerciseServices.prototype.getTexts = function () {
            return this.$http.get('app/data/appTexts.json').then(function (result) { return result.data; });
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
    var HomeCtrl = (function () {
        function HomeCtrl($scope, menuData, texts) {
            this.$scope = $scope;
            this.menuData = menuData;
            this.texts = texts;
            $scope.vm = this;
        }
        HomeCtrl.$inject = ['$scope', 'menuData', 'texts'];
        return HomeCtrl;
    })();
    exercises.HomeCtrl = HomeCtrl;
    var NavigationBase = (function () {
        function NavigationBase($scope, $location, $route, exercise1Data) {
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.exercise1Data = exercise1Data;
            $scope.vm = this;
            this.currentPage = 1;
            this.totalItems = this.exercise1Data.subexerciseListDTO.length;
            this.summaryActivated = false;
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
            if (!this.isSummaryActive()) {
                this.summaryActivated = true;
                this.exercise1Data.subexerciseListDTO.unshift(new exercises.Exercise1Item(99));
                this.currentPage = 1;
                this.totalItems = this.exercise1Data.subexerciseListDTO.length;
            }
        };
        NavigationBase.prototype.isSummaryActive = function () {
            return this.summaryActivated;
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
        function Exercise1Ctrl($scope, $location, $route, exercise1Data, texts) {
            _super.call(this, $scope, $location, $route, exercise1Data);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.exercise1Data = exercise1Data;
            this.texts = texts;
            this.exetype = "N1a";
            for (var i = 0; i < exercise1Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise1Item(exercise1Data.subexerciseListDTO[i].number);
                exercise1Data.subexerciseListDTO[i] = exeItem;
                exercise1Data.subexerciseListDTO[i].getListOfPositions(exercise1Data.numberOfRange, 330, 90, exercise1Data.subexerciseListDTO[i].number);
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
                this.exercise1Data.subexerciseListDTO[index].givenNumber = givenNumber;
            }
        };
        Exercise1Ctrl.prototype.isCorrect = function (index) {
            return this.exercise1Data.subexerciseListDTO[index].givenNumber == this.exercise1Data.subexerciseListDTO[index].number;
        };
        Exercise1Ctrl.$inject = ['$scope', '$location', '$route', 'exercise1Data', 'texts'];
        return Exercise1Ctrl;
    })(NavigationBase);
    exercises.Exercise1Ctrl = Exercise1Ctrl;
    var Exercise2Ctrl = (function (_super) {
        __extends(Exercise2Ctrl, _super);
        function Exercise2Ctrl($scope, $location, $route, exercise2Data, texts, $rootScope) {
            var _this = this;
            _super.call(this, $scope, $location, $route, exercise2Data);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.exercise2Data = exercise2Data;
            this.texts = texts;
            this.$rootScope = $rootScope;
            this.exetype = "N1b";
            this.isLastElement = false;
            for (var i = 0; i < exercise2Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise2Item(exercise2Data.subexerciseListDTO[i].number);
                exercise2Data.subexerciseListDTO[i] = exeItem;
                exercise2Data.subexerciseListDTO[i].getListOfPositions(exercise2Data.numberOfRange, 330, 90, 25);
                exercise2Data.subexerciseListDTO[i].addObject();
            }
            $rootScope.$on('dropped', function (event, args) {
                var countOfDisplayed = 0;
                var countOfDropped = 0;
                for (var i = 0; i < exercise2Data.subexerciseListDTO.length; i++) {
                    if (exercise2Data.subexerciseListDTO[i].itemId == args.parentId) {
                        for (var j = 0; j < exercise2Data.subexerciseListDTO[i].listOfPositions.length; j++) {
                            if (exercise2Data.subexerciseListDTO[i].listOfPositions[j].isDisplayed) {
                                countOfDisplayed++;
                            }
                            if (exercise2Data.subexerciseListDTO[i].listOfPositions[j].isDropped) {
                                countOfDropped++;
                            }
                        }
                        exercise2Data.subexerciseListDTO[i].givenNumber = countOfDropped;
                        if (countOfDropped == exercise2Data.subexerciseListDTO[i].listOfPositions.length) {
                            _this.isLastElement = true;
                            $rootScope.$digest();
                        }
                        if (countOfDisplayed == countOfDropped) {
                            exercise2Data.subexerciseListDTO[i].addObject();
                            $rootScope.$digest();
                        }
                    }
                }
            });
            $scope.$watch('vm.summaryActivated', function (summaryActivated) {
                if (summaryActivated == false) {
                    return;
                }
                for (var i = 0; i < exercise2Data.subexerciseListDTO.length; i++) {
                    if (angular.isDefined(exercise2Data.subexerciseListDTO[i].listOfPositions)) {
                        for (var j = 0; j < exercise2Data.subexerciseListDTO[i].listOfPositions.length; j++) {
                            exercise2Data.subexerciseListDTO[i].listOfPositions[j].isDisabled = true;
                        }
                    }
                }
            });
        }
        ;
        Exercise2Ctrl.prototype.backspace = function (index) {
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
        Exercise2Ctrl.prototype.setUserInput = function (index, newVal) {
            if (!this.isSummaryActive()) {
                var givenNumber = this.exercise1Data.subexerciseListDTO[index].givenNumber;
                if (angular.isUndefined(givenNumber) || givenNumber == null) {
                    givenNumber = newVal;
                }
                else if (givenNumber.toString().length < 2) {
                    givenNumber = parseInt(String(givenNumber) + String(newVal));
                }
                this.exercise1Data.subexerciseListDTO[index].givenNumber = givenNumber;
            }
        };
        Exercise2Ctrl.prototype.isCorrect = function (index) {
            return this.exercise1Data.subexerciseListDTO[index].givenNumber == this.exercise1Data.subexerciseListDTO[index].number;
        };
        Exercise2Ctrl.$inject = ['$scope', '$location', '$route', 'exercise2Data', 'texts', '$rootScope'];
        return Exercise2Ctrl;
    })(NavigationBase);
    exercises.Exercise2Ctrl = Exercise2Ctrl;
})(exercises || (exercises = {}));
var exercises;
(function (exercises) {
    function animateRubber() {
        return {
            link: function ($scope, element, attributes) {
                $(element).on("click", function () {
                    $(this).addClass('remove-btn-animate').delay(200).queue(function (next) {
                        $(this).removeClass('remove-btn-animate');
                        next();
                    });
                });
            }
        };
    }
    exercises.animateRubber = animateRubber;
    ;
    function animateButton() {
        return {
            link: function ($scope, element, attributes) {
                $(element).on("click", function () {
                    $(this).addClass('nav-btn-animate').delay(200).queue(function (next) {
                        $(this).removeClass('nav-btn-animate');
                        next();
                    });
                });
            }
        };
    }
    exercises.animateButton = animateButton;
    ;
    function draggableObject($rootScope) {
        return {
            link: function ($scope, element, attr) {
                if ($scope.object.isDisabled) {
                    return;
                }
                var hideObject = function () {
                    $scope.object.isDisplayed = false;
                    $rootScope.$digest();
                    $(element).css($scope.object.getInitPlace());
                };
                $rootScope.$on('hide.with.rubber', function (event, args) {
                    if (args.objectId == attr.id) {
                        $scope.object.isDropped = false;
                    }
                });
                $(element).draggable({
                    revert: function (dropped) { console.log(dropped); },
                    stop: function (event, ui) {
                        $scope.object.setLargePosition($(this).position().top, $(this).position().left);
                        $scope.object.setSmallPosition($(this).position().top / 3.67, $(this).position().left / 3.67);
                        if (ui.helper.data('dropped-target') == true && $scope.object.isDropped != true) {
                            $scope.object.isDropped = true;
                            $(this).animate({
                                height: attr.originalHeight
                            }, 200);
                            $rootScope.$emit('dropped', {
                                objectId: $scope.object.objectId,
                                parentId: $scope.object.parentId
                            });
                        }
                        else if (ui.helper.data('dropped-origin') == true) {
                            $scope.object.isDropped = false;
                            ui.helper.data('dropped-target', false);
                            ui.helper.data('dropped-origin', false);
                            hideObject();
                        }
                    }
                });
                $(element).on("click", function () {
                    if ($scope.object.isDropped == true) {
                        $scope.object.isDropped = false;
                        hideObject();
                    }
                    else {
                        $scope.object.isDropped = true;
                        $(this).animate({
                            height: attr.originalHeight,
                            top: $scope.object.largePositionTop,
                            left: $scope.object.largePositionLeft
                        }, 200);
                    }
                    $rootScope.$emit('dropped', {
                        objectId: $scope.object.objectId,
                        parentId: $scope.object.parentId
                    });
                });
            }
        };
    }
    exercises.draggableObject = draggableObject;
    ;
    draggableObject.$inject = ['$rootScope'];
    function droppableObject() {
        return {
            link: function ($scope, element, attributes) {
                $(element).droppable({
                    drop: function (event, ui) {
                        if (ui.draggable.data('dropped-target') != true) {
                            ui.draggable.data('dropped-target', true);
                            ui.draggable.data('already-dropped', false);
                            ui.draggable.data('dropped-origin', false);
                        }
                    }
                });
            }
        };
    }
    exercises.droppableObject = droppableObject;
    ;
    function droppableOrigin() {
        return {
            link: function ($scope, element, attributes) {
                $(element).droppable({
                    drop: function (event, ui) {
                        if (ui.draggable.data('dropped-target') == true && ui.draggable.data('dropped-origin') != true) {
                            ui.draggable.data('dropped-origin', true);
                            ui.draggable.data('dropped-target', false);
                        }
                    }
                });
            }
        };
    }
    exercises.droppableOrigin = droppableOrigin;
    ;
})(exercises || (exercises = {}));
var exercises;
(function (exercises) {
    var mathApp = angular.module('maths', ['ngMdIcons', 'ngTouch', 'ui.bootstrap', 'ngRoute']);
    mathApp.controller('homeCtrl', exercises.HomeCtrl);
    mathApp.controller('exercise1Ctrl', exercises.Exercise1Ctrl);
    mathApp.controller('exercise2Ctrl', exercises.Exercise2Ctrl);
    mathApp.service('exerciseServices', exercises.ExerciseServices);
    mathApp.directive('animateRubber', exercises.animateRubber);
    mathApp.directive('animateButton', exercises.animateButton);
    mathApp.directive('draggableObject', exercises.draggableObject);
    mathApp.directive('droppableObject', exercises.droppableObject);
    mathApp.directive('droppableOrigin', exercises.droppableOrigin);
    mathApp.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/components/homeView.html',
                controller: 'homeCtrl',
                resolve: {
                    'menuData': function (exerciseServices) {
                        return exerciseServices.getMenuData();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            }).when('/N1a', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise1Ctrl',
                resolve: {
                    'exercise1Data': function (exerciseServices) {
                        return exerciseServices.getExercise1Data();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            }).when('/N1b', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise2Ctrl',
                exetype: 'N1b',
                resolve: {
                    'exercise2Data': function (exerciseServices) {
                        return exerciseServices.getExercise2Data();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
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