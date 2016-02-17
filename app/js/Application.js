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
    }());
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
    }(Exercise1Item));
    exercises.Exercise2Item = Exercise2Item;
    var Exercise3Item = (function () {
        function Exercise3Item(startFrom, missingNumbers) {
            this.startFrom = startFrom;
            this.missingNumbers = missingNumbers;
            this.maxNumber = 9;
            this.itemId = Exercise3Item.id++;
            this.listOfGivenNumbers = [];
            this.listOfVisibleNumbers = [];
            this.listOfCorrectNumbers = [];
            this.listOfDroppedNumbers = [];
            for (var i = startFrom; i < startFrom + this.maxNumber; i++) {
                this.listOfGivenNumbers.push(i);
            }
            this.listOfVisibleNumbers.push(missingNumbers[0]);
        }
        Exercise3Item.id = 0;
        return Exercise3Item;
    }());
    exercises.Exercise3Item = Exercise3Item;
    var NumberCube = (function () {
        function NumberCube(value) {
            this.value = value;
            this.listOfDroppedNumbers = [];
        }
        NumberCube.prototype.isCorrect = function () {
            if (this.listOfDroppedNumbers.length == 0) {
                return false;
            }
            return this.listOfDroppedNumbers[this.listOfDroppedNumbers.length - 1].value == this.value;
        };
        return NumberCube;
    }());
    exercises.NumberCube = NumberCube;
    var Exercise4Item = (function () {
        function Exercise4Item(startFrom, missingNumbers, blockedNumbers) {
            this.startFrom = startFrom;
            this.missingNumbers = missingNumbers;
            this.blockedNumbers = blockedNumbers;
            this.maxNumber = 10;
            this.positionInit = [
                { top: '64px', left: '288px' },
                { top: '163px', left: '228px' },
                { top: '163px', left: '347px' },
                { top: '262px', left: '171px' },
                { top: '262px', left: '296px' },
                { top: '262px', left: '420px' },
                { top: '358px', left: '112px' },
                { top: '358px', left: '235px' },
                { top: '358px', left: '358px' },
                { top: '358px', left: '481px' }];
            this.smallPositionInit = [
                { top: '6px', left: '64px' },
                { top: '31px', left: '49px' },
                { top: '31px', left: '78px' },
                { top: '55px', left: '35px' },
                { top: '55px', left: '66px' },
                { top: '55px', left: '97px' },
                { top: '79px', left: '20px' },
                { top: '79px', left: '50px' },
                { top: '79px', left: '81px' },
                { top: '79px', left: '112px' }];
            this.itemId = Exercise4Item.id++;
            this.listOfGivenNumbers = [];
            this.listOfMissingNumbers = [];
            this.numberOnStart = new NumberCube(0);
            this.listOfBlockedNumbers = [];
            this.positionForNumber = {};
            this.smallPositionForNumber = {};
            for (var i = startFrom; i < startFrom + this.maxNumber; i++) {
                if (missingNumbers.indexOf(i) == -1 && blockedNumbers.indexOf(i) == -1) {
                    this.listOfGivenNumbers.push(new NumberCube(i));
                }
                this.positionForNumber[i] = this.positionInit.shift();
                this.smallPositionForNumber[i] = this.smallPositionInit.shift();
            }
            for (var i = 0; i < missingNumbers.length; i++) {
                this.listOfMissingNumbers.push(new NumberCube(missingNumbers[i]));
                this.numberOnStart.listOfDroppedNumbers.push(new NumberCube(missingNumbers[i]));
            }
            for (var i = 0; i < blockedNumbers.length; i++) {
                this.listOfBlockedNumbers.push(new NumberCube(blockedNumbers[i]));
            }
        }
        Exercise4Item.id = 0;
        return Exercise4Item;
    }());
    exercises.Exercise4Item = Exercise4Item;
    var SquareObject = (function () {
        function SquareObject(value) {
            this.value = value;
        }
        return SquareObject;
    }());
    exercises.SquareObject = SquareObject;
    var Column = (function () {
        function Column(expectedNumber) {
            this.expectedNumber = expectedNumber;
            this.styles = ['column-one', 'column-two', 'column-three', 'column-four', 'column-five'];
            this.listOfDropped = [];
        }
        Column.prototype.isCorrect = function () {
            if (this.listOfDropped.length == 0) {
                return false;
            }
            return this.listOfDropped[this.listOfDropped.length - 1].value == this.expectedNumber;
        };
        return Column;
    }());
    exercises.Column = Column;
    var Exercise5Item = (function () {
        function Exercise5Item(unarrangedNumbers, arrangedNumbers) {
            this.unarrangedNumbers = unarrangedNumbers;
            this.arrangedNumbers = arrangedNumbers;
            this.listOfUnarrangedNumbers = [];
            this.columns = [];
            for (var i = 0; i < unarrangedNumbers.length; i++) {
                this.listOfUnarrangedNumbers.push(new SquareObject(unarrangedNumbers[i]));
            }
            for (var i = 0; i < arrangedNumbers.length; i++) {
                this.columns.push(new Column(arrangedNumbers[i]));
            }
        }
        Exercise5Item.id = 0;
        return Exercise5Item;
    }());
    exercises.Exercise5Item = Exercise5Item;
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
    }());
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
    }());
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
        ExerciseServices.prototype.getExercise3Data = function () {
            return this.$http.get('app/data/exe3Data.json').then(function (result) { return result.data; });
        };
        ExerciseServices.prototype.getExercise4Data = function () {
            return this.$http.get('app/data/exe4Data.json').then(function (result) { return result.data; });
        };
        ExerciseServices.prototype.getExercise5Data = function () {
            return this.$http.get('app/data/exe5Data.json').then(function (result) { return result.data; });
        };
        ExerciseServices.prototype.getTexts = function () {
            return this.$http.get('app/data/appTexts.json').then(function (result) { return result.data; });
        };
        return ExerciseServices;
    }());
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
    }());
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
    }());
    exercises.HomeCtrl = HomeCtrl;
    var NavigationBase = (function () {
        function NavigationBase($scope, $location, $route, totalItems) {
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.totalItems = totalItems;
            $scope.vm = this;
            this.currentPage = 1;
            this.summaryActivated = false;
            this.onePercentage = 100 / totalItems;
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
        NavigationBase.prototype.isSummaryActive = function () {
            return this.summaryActivated;
        };
        NavigationBase.prototype.selectPage = function (page) {
            if (page > 0 && page <= this.totalItems) {
                this.currentPage = page;
            }
        };
        NavigationBase.prototype.noPrevious = function () {
            return this.currentPage === 1;
        };
        NavigationBase.prototype.noNext = function () {
            return this.currentPage === this.totalItems;
        };
        NavigationBase.prototype.checkResult = function () {
            this.summaryActivated = true;
            this.currentPage = 1;
        };
        return NavigationBase;
    }());
    exercises.NavigationBase = NavigationBase;
    var Exercise1Ctrl = (function (_super) {
        __extends(Exercise1Ctrl, _super);
        function Exercise1Ctrl($scope, $location, $route, exercise1Data, texts) {
            _super.call(this, $scope, $location, $route, exercise1Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.exercise1Data = exercise1Data;
            this.texts = texts;
            this.exetype = "N1a";
            this.progressBarType = "exe1";
            this.progressBarClass = "progress-color-exe1";
            this.titleText = texts.exe1TitleText;
            for (var i = 0; i < exercise1Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise1Item(exercise1Data.subexerciseListDTO[i].number);
                exercise1Data.subexerciseListDTO[i] = exeItem;
                exercise1Data.subexerciseListDTO[i].getListOfPositions(exercise1Data.numberOfRange, 330, 90, exercise1Data.subexerciseListDTO[i].number);
            }
        }
        Exercise1Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
                this.exercise1Data.subexerciseListDTO.unshift(new exercises.Exercise1Item(99));
                this.totalItems = this.exercise1Data.subexerciseListDTO.length;
            }
        };
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
    }(NavigationBase));
    exercises.Exercise1Ctrl = Exercise1Ctrl;
    var Exercise2Ctrl = (function (_super) {
        __extends(Exercise2Ctrl, _super);
        function Exercise2Ctrl($scope, $location, $route, exercise2Data, texts, $rootScope) {
            var _this = this;
            _super.call(this, $scope, $location, $route, exercise2Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.exercise2Data = exercise2Data;
            this.texts = texts;
            this.$rootScope = $rootScope;
            this.exetype = "N1b";
            this.progressBarType = "exe2";
            this.progressBarClass = "progress-color-exe2";
            this.isLastElement = false;
            this.titleText = texts.exe2TitleText;
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
        Exercise2Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
                this.exercise2Data.subexerciseListDTO.unshift(new exercises.Exercise2Item(99));
                this.totalItems = this.exercise2Data.subexerciseListDTO.length;
            }
        };
        Exercise2Ctrl.prototype.removeOne = function (index) {
            if (!this.isSummaryActive() && angular.isDefined(this.exercise2Data.subexerciseListDTO[index].givenNumber)) {
                for (var i = 0; i < this.exercise2Data.subexerciseListDTO[index].listOfPositions.length; i++) {
                    if (this.exercise2Data.subexerciseListDTO[index].listOfPositions[i].isDropped == true) {
                        this.$rootScope.$emit('rubber.remove', { objectId: this.exercise2Data.subexerciseListDTO[index].listOfPositions[i].objectId });
                        return;
                    }
                }
            }
        };
        Exercise2Ctrl.prototype.isCorrect = function (index) {
            return this.exercise2Data.subexerciseListDTO[index].givenNumber == this.exercise2Data.subexerciseListDTO[index].number;
        };
        Exercise2Ctrl.$inject = ['$scope', '$location', '$route', 'exercise2Data', 'texts', '$rootScope'];
        return Exercise2Ctrl;
    }(NavigationBase));
    exercises.Exercise2Ctrl = Exercise2Ctrl;
    var Exercise3Ctrl = (function (_super) {
        __extends(Exercise3Ctrl, _super);
        function Exercise3Ctrl($scope, $location, $route, $rootScope, exercise3Data, texts) {
            var _this = this;
            _super.call(this, $scope, $location, $route, exercise3Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$rootScope = $rootScope;
            this.exercise3Data = exercise3Data;
            this.texts = texts;
            this.exetype = "N1c";
            this.progressBarType = "exe3";
            this.progressBarClass = "progress-color-exe3";
            this.titleText = texts.exe3TitleText;
            for (var i = 0; i < exercise3Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise3Item(exercise3Data.subexerciseListDTO[i].startFrom, exercise3Data.subexerciseListDTO[i].missingNumbers);
                exercise3Data.subexerciseListDTO[i] = exeItem;
            }
            this.positions = [
                { top: '359px', left: '39px' },
                { top: '301px', left: '179px' },
                { top: '300px', left: '322px' },
                { top: '207px', left: '438px' },
                { top: '122px', left: '581px' },
                { top: '18px', left: '468px' },
                { top: '84px', left: '312px' },
                { top: '15px', left: '176px' },
                { top: '105px', left: '51px' }];
            this.smallPositions = [
                { top: '74px', left: '8px' },
                { top: '60px', left: '37px' },
                { top: '65px', left: '68px' },
                { top: '43px', left: '93px' },
                { top: '25px', left: '123px' },
                { top: '3px', left: '98px' },
                { top: '17px', left: '66px' },
                { top: '3px', left: '37px' },
                { top: '21px', left: '11px' },
            ];
            this.startingPosition = { top: '364px', left: '561px' };
            $rootScope.$on('ball.dropped', function (event, args) {
                var droppedBall = parseInt(args.dropped);
                if (_this.exercise3Data.subexerciseListDTO[_this.currentPage - 1].listOfDroppedNumbers.indexOf(droppedBall, 0) == -1) {
                    _this.exercise3Data.subexerciseListDTO[_this.currentPage - 1].listOfDroppedNumbers.push(droppedBall);
                }
                if (args.dropped == args.destination) {
                    _this.exercise3Data.subexerciseListDTO[_this.currentPage - 1].listOfCorrectNumbers.push(droppedBall);
                }
                else if (_this.exercise3Data.subexerciseListDTO[_this.currentPage - 1].listOfCorrectNumbers.indexOf(droppedBall, 0) > -1) {
                    _this.exercise3Data.subexerciseListDTO[_this.currentPage - 1].listOfCorrectNumbers.splice(_this.exercise3Data.subexerciseListDTO[_this.currentPage - 1].listOfCorrectNumbers.indexOf(droppedBall, 0), 1);
                }
                _this.addNextVisible();
            });
            $rootScope.$on('ball.removed', function (event, args) {
                _this.removeBall(args.removedBall);
            });
        }
        Exercise3Ctrl.prototype.addNextVisible = function () {
            if (this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfDroppedNumbers.length == this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfVisibleNumbers.length) {
                for (var i = 0; i < this.exercise3Data.subexerciseListDTO[this.currentPage - 1].missingNumbers.length; i++) {
                    var missingNumber = this.exercise3Data.subexerciseListDTO[this.currentPage - 1].missingNumbers[i];
                    if (this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfVisibleNumbers.indexOf(missingNumber, 0) == -1) {
                        this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfVisibleNumbers.push(missingNumber);
                        this.$rootScope.$apply();
                        return;
                    }
                }
            }
        };
        Exercise3Ctrl.prototype.removeBall = function (ballNumberString) {
            var ballNumber = parseInt(ballNumberString);
            this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfVisibleNumbers.splice(this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfVisibleNumbers.indexOf(ballNumber, 0), 1);
            this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfDroppedNumbers.splice(this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfDroppedNumbers.indexOf(ballNumber, 0), 1);
            if (this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfCorrectNumbers.indexOf(ballNumber, 0) > -1) {
                this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfCorrectNumbers.splice(this.exercise3Data.subexerciseListDTO[this.currentPage - 1].listOfCorrectNumbers.indexOf(ballNumber, 0), 1);
            }
            this.$rootScope.$apply();
            this.addNextVisible();
        };
        Exercise3Ctrl.prototype.isNumberMissing = function (parentIndex, index) {
            return this.exercise3Data.subexerciseListDTO[parentIndex].missingNumbers.indexOf(index, 0) > -1;
        };
        Exercise3Ctrl.prototype.isVisible = function (parentIndex, number) {
            return this.exercise3Data.subexerciseListDTO[parentIndex].listOfVisibleNumbers.indexOf(number, 0) > -1;
        };
        Exercise3Ctrl.prototype.isDropped = function (parentIndex, number) {
            return this.exercise3Data.subexerciseListDTO[parentIndex].listOfDroppedNumbers.indexOf(number, 0) > -1;
        };
        Exercise3Ctrl.prototype.isCorrect = function (parentIndex, number) {
            return this.exercise3Data.subexerciseListDTO[parentIndex].listOfCorrectNumbers.indexOf(number, 0) > -1;
        };
        Exercise3Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
                this.exercise3Data.subexerciseListDTO.unshift(new exercises.Exercise3Item(99, []));
                this.totalItems = this.exercise3Data.subexerciseListDTO.length;
            }
        };
        Exercise3Ctrl.$inject = ['$scope', '$location', '$route', '$rootScope', 'exercise3Data', 'texts'];
        return Exercise3Ctrl;
    }(NavigationBase));
    exercises.Exercise3Ctrl = Exercise3Ctrl;
    var Exercise4Ctrl = (function (_super) {
        __extends(Exercise4Ctrl, _super);
        function Exercise4Ctrl($scope, $location, $route, $rootScope, exercise4Data, texts) {
            _super.call(this, $scope, $location, $route, exercise4Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$rootScope = $rootScope;
            this.exercise4Data = exercise4Data;
            this.texts = texts;
            this.exetype = "N1d";
            this.progressBarType = "exe4";
            this.progressBarClass = "progress-color-exe4";
            this.titleText = texts.exe4TitleText;
            for (var i = 0; i < exercise4Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise4Item(exercise4Data.subexerciseListDTO[i].startFrom, exercise4Data.subexerciseListDTO[i].missingNumbers, exercise4Data.subexerciseListDTO[i].blockedNumbers);
                exercise4Data.subexerciseListDTO[i] = exeItem;
            }
            this.sortableConfig = { group: 'home' };
        }
        Exercise4Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
                this.exercise4Data.subexerciseListDTO.unshift(new exercises.Exercise4Item(0, [], []));
                this.totalItems = this.exercise4Data.subexerciseListDTO.length;
            }
        };
        Exercise4Ctrl.$inject = ['$scope', '$location', '$route', '$rootScope', 'exercise4Data', 'texts'];
        return Exercise4Ctrl;
    }(NavigationBase));
    exercises.Exercise4Ctrl = Exercise4Ctrl;
    var Exercise5Ctrl = (function (_super) {
        __extends(Exercise5Ctrl, _super);
        function Exercise5Ctrl($scope, $location, $route, $rootScope, exercise5Data, texts) {
            _super.call(this, $scope, $location, $route, exercise5Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$rootScope = $rootScope;
            this.exercise5Data = exercise5Data;
            this.texts = texts;
            this.exetype = "N2a";
            this.progressBarType = "exe5";
            this.progressBarClass = "progress-color-exe5";
            this.titleText = texts.exe5TitleText;
            for (var i = 0; i < exercise5Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise5Item(exercise5Data.subexerciseListDTO[i].unarrangedNumbers, exercise5Data.subexerciseListDTO[i].arrangedNumbers);
                exercise5Data.subexerciseListDTO[i] = exeItem;
            }
        }
        Exercise5Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
                this.exercise5Data.subexerciseListDTO.unshift(new exercises.Exercise5Item([], []));
                this.totalItems = this.exercise5Data.subexerciseListDTO.length;
            }
        };
        Exercise5Ctrl.$inject = ['$scope', '$location', '$route', '$rootScope', 'exercise5Data', 'texts'];
        return Exercise5Ctrl;
    }(NavigationBase));
    exercises.Exercise5Ctrl = Exercise5Ctrl;
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
                    $scope.object.isDropped = false;
                    $scope.object.isDisplayed = false;
                    $(element).css($scope.object.getInitPlace());
                };
                $rootScope.$on('rubber.remove', function (event, args) {
                    if (args.objectId == $scope.object.objectId) {
                        hideObject();
                    }
                });
                $(element).draggable({
                    revert: "invalid",
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
                            ui.helper.data('dropped-target', false);
                            ui.helper.data('dropped-origin', false);
                            hideObject();
                        }
                    }
                });
                $(element).on("click", function () {
                    if ($scope.object.isDropped == true) {
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
                        ui.draggable.data('dropped-origin', true);
                        ui.draggable.data('dropped-target', false);
                    }
                });
            }
        };
    }
    exercises.droppableOrigin = droppableOrigin;
    ;
    function draggableBall() {
        return {
            link: function ($scope, element, attributes) {
                $(element).css({ cursor: 'pointer' });
                $(element).draggable({
                    revert: "invalid",
                    start: function (event, ui) {
                        ui.helper.data('originalPosition', ui.position);
                        ui.helper.data('iWasDroppedHere', ui.helper.data('iAmDroppedHere'));
                        $(element).css({ boxShadow: "0px 3px 4px 1px rgba(0,0,0,0.50)" });
                    },
                    stop: function (event, ui) {
                        if (ui.helper.data('iWasDroppedHere') != undefined &&
                            ui.helper.data('iAmDroppedHere').attr('ball-value') != ui.helper.data('iWasDroppedHere').attr('ball-value')) {
                            ui.helper.data('iWasDroppedHere').data('droppedBall', null);
                            if (ui.helper.data('iAmDroppedHere').attr('ball-value') == '-99') {
                                ui.helper.data('iAmDroppedHere', null);
                                $(element).css({ top: '364px', left: '561px' });
                            }
                        }
                        if (ui.helper.data('iAmDroppedHere') != undefined && ui.helper.data('iAmDroppedHere').attr('ball-value') != '-99') {
                            $(element).css({ boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" });
                        }
                    }
                });
            }
        };
    }
    exercises.draggableBall = draggableBall;
    ;
    function droppableBall($rootScope) {
        return {
            link: function ($scope, element, attributes) {
                $(element).droppable({
                    accept: function (draggable) {
                        if ($(element).data('droppedBall') != undefined && $(element).data('droppedBall') != $(draggable).attr('ball-value')) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    },
                    drop: function (event, ui) {
                        $(element).data('droppedBall', $(ui.draggable).attr('ball-value'));
                        ui.draggable.data('iAmDroppedHere', $(element));
                        ui.draggable.css({ top: $(element).position().top + "px", left: $(element).position().left + "px" });
                        $rootScope.$emit('ball.dropped', {
                            dropped: $(ui.draggable).attr('ball-value'),
                            destination: attributes.ballValue,
                            draggable: ui.draggable
                        });
                    }
                });
            }
        };
    }
    exercises.droppableBall = droppableBall;
    ;
    droppableBall.$inject = ['$rootScope'];
    function droppableBallContainer($rootScope) {
        return {
            link: function ($scope, element, attributes) {
                $(element).droppable({
                    accept: function (draggable) {
                        if (draggable.data('iAmDroppedHere') == undefined) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    },
                    drop: function (event, ui) {
                        ui.draggable.data('iAmDroppedHere', $(element));
                        ui.draggable.css({ boxShadow: "0px 3px 4px 1px rgba(0,0,0,0.50)" });
                        $rootScope.$emit('ball.removed', {
                            removedBall: $(ui.draggable).attr('ball-value')
                        });
                    }
                });
            }
        };
    }
    exercises.droppableBallContainer = droppableBallContainer;
    droppableBallContainer.$inject = ['$rootScope'];
    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
            obj.css("-moz-transform") ||
            obj.css("-ms-transform") ||
            obj.css("-o-transform") ||
            obj.css("transform");
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }
        else {
            var angle = 0;
        }
        return (angle < 0) ? angle + 360 : angle;
    }
    exercises.getRotationDegrees = getRotationDegrees;
})(exercises || (exercises = {}));
var exercises;
(function (exercises) {
    var mathApp = angular.module('maths', ['ngMdIcons', 'ngTouch', 'ui.bootstrap', 'ngRoute', 'ng-sortable']);
    mathApp.controller('homeCtrl', exercises.HomeCtrl);
    mathApp.controller('exercise1Ctrl', exercises.Exercise1Ctrl);
    mathApp.controller('exercise2Ctrl', exercises.Exercise2Ctrl);
    mathApp.controller('exercise3Ctrl', exercises.Exercise3Ctrl);
    mathApp.controller('exercise4Ctrl', exercises.Exercise4Ctrl);
    mathApp.controller('exercise5Ctrl', exercises.Exercise5Ctrl);
    mathApp.service('exerciseServices', exercises.ExerciseServices);
    mathApp.directive('animateRubber', exercises.animateRubber);
    mathApp.directive('animateButton', exercises.animateButton);
    mathApp.directive('draggableObject', exercises.draggableObject);
    mathApp.directive('droppableObject', exercises.droppableObject);
    mathApp.directive('droppableOrigin', exercises.droppableOrigin);
    mathApp.directive('droppableBall', exercises.droppableBall);
    mathApp.directive('draggableBall', exercises.draggableBall);
    mathApp.directive('droppableBallContainer', exercises.droppableBallContainer);
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
                resolve: {
                    'exercise2Data': function (exerciseServices) {
                        return exerciseServices.getExercise2Data();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            }).when('/N1c', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise3Ctrl',
                resolve: {
                    'exercise3Data': function (exerciseServices) {
                        return exerciseServices.getExercise3Data();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            }).when('/N1d', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise4Ctrl',
                resolve: {
                    'exercise4Data': function (exerciseServices) {
                        return exerciseServices.getExercise4Data();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            }).when('/N2a', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise5Ctrl',
                resolve: {
                    'exercise5Data': function (exerciseServices) {
                        return exerciseServices.getExercise5Data();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            })
                .otherwise({
                redirectTo: '/'
            });
        }]);
})(exercises || (exercises = {}));
//# sourceMappingURL=Application.js.map