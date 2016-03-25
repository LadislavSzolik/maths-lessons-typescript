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
    var Bubble = (function () {
        function Bubble(value) {
            this.value = value;
            this.isMissing = false;
            this.positionIndex = 0;
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
        }
        Bubble.prototype.getPosition = function () {
            return this.positions[this.positionIndex];
        };
        Bubble.prototype.getSmallPosition = function () {
            return this.smallPositions[this.positionIndex];
        };
        return Bubble;
    }());
    exercises.Bubble = Bubble;
    var Exercise3Item = (function () {
        function Exercise3Item(startFrom, missingNumbers) {
            this.startFrom = startFrom;
            this.missingNumbers = missingNumbers;
            this.listOfGiven = [];
            this.listOfEmpty = [];
            this.listOfMissing = [];
            this.maxNumber = 9;
            this.itemId = Exercise3Item.id++;
            var positionIndex = 0;
            for (var i = startFrom; i < startFrom + this.maxNumber; i++) {
                var bubble = new Bubble(i);
                if (this.missingNumbers.indexOf(bubble.value, 0) > -1) {
                    bubble.isMissing = true;
                }
                bubble.positionIndex = positionIndex;
                this.listOfGiven.push(bubble);
                this.listOfEmpty.push({});
                positionIndex++;
            }
            for (var i = 0; i < this.missingNumbers.length; i++) {
                this.listOfMissing.push(new Bubble(this.missingNumbers[i]));
            }
        }
        Exercise3Item.prototype.isCorrect = function (index) {
            if (this.listOfEmpty[index].value == this.listOfGiven[index].value) {
                return true;
            }
            else {
                return false;
            }
        };
        Exercise3Item.id = 0;
        return Exercise3Item;
    }());
    exercises.Exercise3Item = Exercise3Item;
    var NumberSquare = (function () {
        function NumberSquare(value) {
            this.value = value;
            this.isMissing = false;
            this.positionIndex = 0;
            this.isBlocked = false;
            this.positions = [
                { top: '295px', left: '26px' },
                { top: '295px', left: '137px' },
                { top: '186px', left: '137px' },
                { top: '76px', left: '137px' },
                { top: '76px', left: '242px' },
                { top: '76px', left: '346px' },
                { top: '76px', left: '450px' },
                { top: '186px', left: '450px' },
                { top: '295px', left: '450px' },
                { top: '295px', left: '560px' }];
            this.smallPositions = [
                { top: '67px', left: '8px' },
                { top: '67px', left: '32px' },
                { top: '43px', left: '32px' },
                { top: '19px', left: '32px' },
                { top: '19px', left: '55px' },
                { top: '19px', left: '78px' },
                { top: '19px', left: '101px' },
                { top: '43px', left: '101px' },
                { top: '67px', left: '101px' },
                { top: '67px', left: '126px' }];
        }
        NumberSquare.prototype.getPosition = function () {
            return this.positions[this.positionIndex];
        };
        NumberSquare.prototype.getSmallPosition = function () {
            return this.smallPositions[this.positionIndex];
        };
        return NumberSquare;
    }());
    exercises.NumberSquare = NumberSquare;
    var Exercise4Item = (function () {
        function Exercise4Item(startFrom, missingNumbers, blockedNumbers) {
            this.startFrom = startFrom;
            this.missingNumbers = missingNumbers;
            this.blockedNumbers = blockedNumbers;
            this.maxNumber = 10;
            this.listOfGiven = [];
            this.listOfEmpty = [];
            this.listOfMissing = [];
            this.itemId = Exercise4Item.id++;
            var positionIndex = 0;
            for (var i = startFrom; i < startFrom + this.maxNumber; i++) {
                var square = new NumberSquare(i);
                if (this.missingNumbers.indexOf(square.value, 0) > -1) {
                    square.isMissing = true;
                }
                if (this.blockedNumbers.indexOf(square.value, 0) > -1) {
                    square.isBlocked = true;
                }
                square.positionIndex = positionIndex;
                this.listOfGiven.push(square);
                this.listOfEmpty.push({});
                positionIndex++;
            }
            for (var i = 0; i < this.missingNumbers.length; i++) {
                this.listOfMissing.push(new NumberSquare(missingNumbers[i]));
            }
        }
        Exercise4Item.prototype.isCorrect = function (index) {
            if (this.listOfEmpty[index].value == this.listOfGiven[index].value) {
                return true;
            }
            else {
                return false;
            }
        };
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
            this.listOfArrangedNumbers = [];
            this.correctAnswers = [];
            for (var i = 0; i < unarrangedNumbers.length; i++) {
                this.listOfUnarrangedNumbers.push(new SquareObject(unarrangedNumbers[i]));
            }
            for (var i = 0; i < arrangedNumbers.length; i++) {
                this.listOfArrangedNumbers.push({});
            }
            for (var i = 0; i < arrangedNumbers.length; i++) {
                this.correctAnswers.push(new SquareObject(arrangedNumbers[i]));
            }
        }
        Exercise5Item.prototype.isCorrect = function (index) {
            if (this.correctAnswers[index].value == this.listOfArrangedNumbers[index].value) {
                return true;
            }
            else {
                return false;
            }
        };
        Exercise5Item.id = 0;
        return Exercise5Item;
    }());
    exercises.Exercise5Item = Exercise5Item;
    var Exercise6Item = (function () {
        function Exercise6Item(numberOne, numberTwo, resultSign) {
            this.numberOne = numberOne;
            this.numberTwo = numberTwo;
            this.resultSign = resultSign;
        }
        return Exercise6Item;
    }());
    exercises.Exercise6Item = Exercise6Item;
    var ComparatorSign = (function () {
        function ComparatorSign(value) {
            this.value = value;
        }
        return ComparatorSign;
    }());
    exercises.ComparatorSign = ComparatorSign;
    var Exercise7Item = (function () {
        function Exercise7Item(numbersToDouble) {
            this.numbersToDouble = numbersToDouble;
            this.givenNumbers = [];
            for (var i = 0; i < this.numbersToDouble.length; i++) {
                this.givenNumbers.push(new DoubleObject(this.numbersToDouble[i]));
            }
        }
        return Exercise7Item;
    }());
    exercises.Exercise7Item = Exercise7Item;
    var DoubleObject = (function () {
        function DoubleObject(toBeDoubled) {
            this.toBeDoubled = toBeDoubled;
            this.correctDouble = toBeDoubled + toBeDoubled;
        }
        DoubleObject.prototype.isCorrect = function () {
            if (this.enteredDouble == this.correctDouble) {
                return true;
            }
            else {
                return false;
            }
        };
        return DoubleObject;
    }());
    exercises.DoubleObject = DoubleObject;
    var Exercise8Item = (function () {
        function Exercise8Item(numbersToSplit) {
            this.numbersToSplit = numbersToSplit;
            this.givenNumbers = [];
            for (var i = 0; i < this.numbersToSplit.length; i++) {
                this.givenNumbers.push(new SplitObject(this.numbersToSplit[i]));
            }
        }
        return Exercise8Item;
    }());
    exercises.Exercise8Item = Exercise8Item;
    var SplitObject = (function () {
        function SplitObject(toBeSplit) {
            this.toBeSplit = toBeSplit;
            this.expectedSplit = this.toBeSplit / 2;
        }
        SplitObject.prototype.isCorrect = function () {
            if (this.enteredFirstSplit == this.expectedSplit && this.enteredSecondSplit == this.expectedSplit)
                return true;
            return false;
        };
        return SplitObject;
    }());
    exercises.SplitObject = SplitObject;
    var PlusMinusExercise1Item = (function () {
        function PlusMinusExercise1Item(firstNumberToSum, secondNumberToSum) {
            this.firstNumberToSum = firstNumberToSum;
            this.secondNumberToSum = secondNumberToSum;
            this.numberOnePoints = [{ top: '72.5px', left: '72.5px' }];
            this.numberTwoPoints = [{ top: '19px', left: '19px' }, { top: '126px', left: '126px' }];
            this.numberThreePoints = [{ top: '19px', left: '19px' }, { top: '72.5px', left: '72.5px' }, {
                    top: '126px',
                    left: '126px'
                }];
            this.numberFourPoints = [{ top: '19px', left: '19px' }, { top: '126px', left: '19px' }, {
                    top: '126px',
                    left: '126px'
                }, { top: '19px', left: '126px' }];
            this.numberFivePoints = [{ top: '19px', left: '19px' }, { top: '126px', left: '19px' }, {
                    top: '126px',
                    left: '126px'
                }, { top: '19px', left: '126px' }, { top: '72.5px', left: '72.5px' }];
            this.numberSixPoints = [{ top: '19px', left: '19px' }, { top: '126px', left: '19px' }, {
                    top: '126px',
                    left: '126px'
                }, { top: '19px', left: '126px' }, { top: '72.5px', left: '19px' }, { top: '72.5px', left: '126px' }];
            this.numberPointsForAllNumber = [this.numberOnePoints, this.numberTwoPoints, this.numberThreePoints, this.numberFourPoints, this.numberFivePoints, this.numberSixPoints];
            this.numberOneSmallPoints = [{ top: '25.5px', left: '25.5px' }];
            this.numberTwoSmallPoints = [{ top: '6.7px', left: '6.7px' }, { top: '44.3px', left: '44.3px' }];
            this.numberThreeSmallPoints = [{ top: '6.7px', left: '6.7px' }, { top: '25.5px', left: '25.5px' }, {
                    top: '44.3px',
                    left: '44.3px'
                }];
            this.numberFourSmallPoints = [{ top: '6.7px', left: '6.7px' }, { top: '44.3px', left: '6.7px' }, {
                    top: '44.3px',
                    left: '44.3px'
                }, { top: '6.7px', left: '44.3px' }];
            this.numberFiveSmallPoints = [{ top: '6.7px', left: '6.7px' }, { top: '44.3px', left: '6.7px' }, {
                    top: '44.3px',
                    left: '44.3px'
                }, { top: '6.7px', left: '44.3px' }, { top: '25.5px', left: '25.5px' }];
            this.numberSixSmallPoints = [{ top: '6.7px', left: '6.7px' }, { top: '44.3px', left: '6.7px' }, {
                    top: '44.3px',
                    left: '44.3px'
                }, { top: '6.7px', left: '44.3px' }, { top: '25.5px', left: '6.7px' }, { top: '25.5px', left: '44.3px' }];
            this.numberSmallPointsForAllNumber = [this.numberOneSmallPoints, this.numberTwoSmallPoints, this.numberThreeSmallPoints, this.numberFourSmallPoints, this.numberFiveSmallPoints, this.numberSixSmallPoints];
            this.enteredFormula = "";
            this.sumOfTwoNumbers = this.firstNumberToSum + this.secondNumberToSum;
        }
        PlusMinusExercise1Item.prototype.getPointsForSquare = function (squeryIdentifier) {
            if (squeryIdentifier == 1) {
                return this.numberPointsForAllNumber[this.firstNumberToSum - 1];
            }
            else if (squeryIdentifier == 2) {
                return this.numberPointsForAllNumber[this.secondNumberToSum - 1];
            }
        };
        PlusMinusExercise1Item.prototype.getSmallPointsForSquare = function (squeryIdentifier) {
            if (squeryIdentifier == 1) {
                return this.numberSmallPointsForAllNumber[this.firstNumberToSum - 1];
            }
            else if (squeryIdentifier == 2) {
                return this.numberSmallPointsForAllNumber[this.secondNumberToSum - 1];
            }
        };
        PlusMinusExercise1Item.prototype.isCorrect = function () {
            if (angular.isUndefined(this.enteredFormula))
                return false;
            var formulaTrimmed = this.enteredFormula.replace(/\s/g, "");
            if (formulaTrimmed == this.firstNumberToSum + "+" + this.secondNumberToSum + "=" + this.sumOfTwoNumbers)
                return true;
            return false;
        };
        PlusMinusExercise1Item.prototype.changeEnteredFormula = function (incomingFormula) {
            var givenEnteredFormula = this.enteredFormula;
            if (angular.isUndefined(givenEnteredFormula) || givenEnteredFormula == null) {
                givenEnteredFormula = incomingFormula;
            }
            else if (incomingFormula == "=" || incomingFormula == "+") {
                givenEnteredFormula = givenEnteredFormula + " " + incomingFormula + " ";
            }
            else if (incomingFormula == "del") {
                givenEnteredFormula = "";
            }
            else {
                givenEnteredFormula = givenEnteredFormula + incomingFormula;
            }
            this.enteredFormula = givenEnteredFormula;
        };
        return PlusMinusExercise1Item;
    }());
    exercises.PlusMinusExercise1Item = PlusMinusExercise1Item;
    var PlusMinusExercise2Item = (function () {
        function PlusMinusExercise2Item(firstNumberToSum, secondNumberToSum) {
            this.firstNumberToSum = firstNumberToSum;
            this.secondNumberToSum = secondNumberToSum;
            this.equationForSum = this.firstNumberToSum + " + " + this.secondNumberToSum + " = ";
            this.sumOfTwoNumbers = this.firstNumberToSum + this.secondNumberToSum;
        }
        PlusMinusExercise2Item.prototype.isCorrect = function () {
            if (angular.isDefined(this.enteredNumber) && this.enteredNumber == (this.sumOfTwoNumbers)) {
                return true;
            }
            return false;
        };
        return PlusMinusExercise2Item;
    }());
    exercises.PlusMinusExercise2Item = PlusMinusExercise2Item;
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
        ExerciseServices.prototype.getExercise6Data = function () {
            return this.$http.get('app/data/exe6Data.json').then(function (result) { return result.data; });
        };
        ExerciseServices.prototype.getExercise7Data = function () {
            return this.$http.get('app/data/exe7Data.json').then(function (result) { return result.data; });
        };
        ExerciseServices.prototype.getExercise8Data = function () {
            return this.$http.get('app/data/exe8Data.json').then(function (result) { return result.data; });
        };
        ExerciseServices.prototype.getExerciseFromJson = function (jsonFileName) {
            return this.$http.get("app/data/" + jsonFileName + ".json").then(function (result) { return result.data; });
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
        NavigationBase.prototype.isExerciseSinglePager = function () {
            return false;
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
        }
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
            this.unarranged = [];
            this.styles = ['column-one', 'column-two', 'column-three', 'column-four', 'column-five'];
            this.titleText = texts.exe5TitleText;
            for (var i = 0; i < exercise5Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise5Item(exercise5Data.subexerciseListDTO[i].unarrangedNumbers, exercise5Data.subexerciseListDTO[i].arrangedNumbers);
                exercise5Data.subexerciseListDTO[i] = exeItem;
            }
            for (var i = 0; i < 4; i++) {
                this.unarranged.push({});
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
    var Exercise6Ctrl = (function (_super) {
        __extends(Exercise6Ctrl, _super);
        function Exercise6Ctrl($scope, $location, $route, $rootScope, exercise6Data, texts) {
            _super.call(this, $scope, $location, $route, exercise6Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$rootScope = $rootScope;
            this.exercise6Data = exercise6Data;
            this.texts = texts;
            this.exetype = "N2b";
            this.progressBarType = "exe6";
            this.progressBarClass = "progress-color-exe6";
            this.allSigns = [];
            this.missingSigns = [];
            this.titleText = texts.exe6TitleText;
            for (var i = 0; i < exercise6Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise6Item(exercise6Data.subexerciseListDTO[i].numberOne, exercise6Data.subexerciseListDTO[i].numberTwo, exercise6Data.subexerciseListDTO[i].resultSign);
                exercise6Data.subexerciseListDTO[i] = exeItem;
            }
            for (var i = 0; i < 12; i++) {
                this.allSigns.push(new exercises.ComparatorSign("<"));
                this.allSigns.push(new exercises.ComparatorSign("="));
                this.allSigns.push(new exercises.ComparatorSign(">"));
                this.missingSigns.push({});
            }
        }
        Exercise6Ctrl.prototype.isSignOnRight = function (index) {
            if (this.allSigns[index].value == ">") {
                return true;
            }
            else {
                return false;
            }
        };
        Exercise6Ctrl.prototype.isSignOnLeft = function (index) {
            if (this.allSigns[index].value == "<") {
                return true;
            }
            else {
                return false;
            }
        };
        Exercise6Ctrl.prototype.isCorrect = function (index) {
            if (this.missingSigns[index].value == this.exercise6Data.subexerciseListDTO[index].resultSign) {
                return true;
            }
            else {
                return false;
            }
        };
        Exercise6Ctrl.prototype.isExerciseSinglePager = function () {
            return true;
        };
        Exercise6Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
            }
        };
        Exercise6Ctrl.$inject = ['$scope', '$location', '$route', '$rootScope', 'exercise6Data', 'texts'];
        return Exercise6Ctrl;
    }(NavigationBase));
    exercises.Exercise6Ctrl = Exercise6Ctrl;
    var Exercise7Ctrl = (function (_super) {
        __extends(Exercise7Ctrl, _super);
        function Exercise7Ctrl($scope, $location, $route, $rootScope, exercise7Data, texts) {
            _super.call(this, $scope, $location, $route, exercise7Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$rootScope = $rootScope;
            this.exercise7Data = exercise7Data;
            this.texts = texts;
            this.exetype = "N2c";
            this.progressBarType = "exe7";
            this.progressBarClass = "progress-color-exe7";
            this.selectedInput = 0;
            this.highlightPositions = [{ top: '13px', left: '20px' },
                { top: '13px', left: '234px' },
                { top: '13px', left: '446px' },
                { top: '98px', left: '20px' },
                { top: '98px', left: '234px' },
                { top: '98px', left: '446px' },
                { top: '182px', left: '20px' },
                { top: '182px', left: '234px' },
                { top: '182px', left: '446px' },
                { top: '269px', left: '20px' },
                { top: '269px', left: '234px' },
                { top: '269px', left: '446px' }];
            this.titleText = texts.exe7TitleText;
            for (var i = 0; i < exercise7Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise7Item(exercise7Data.subexerciseListDTO[i].numbersToDouble);
                exercise7Data.subexerciseListDTO[i] = exeItem;
            }
        }
        Exercise7Ctrl.prototype.selectSubExercise = function (index) {
            this.selectedInput = index;
        };
        Exercise7Ctrl.prototype.changeSelectedInput = function (value) {
            if (angular.isUndefined(this.selectedInput)) {
                return;
            }
            var givenNumber = this.exercise7Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredDouble;
            if (angular.isUndefined(givenNumber) || givenNumber == null) {
                givenNumber = value;
            }
            else if (givenNumber.toString().length < 2) {
                givenNumber = parseInt(String(givenNumber) + String(value));
            }
            this.exercise7Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredDouble = givenNumber;
        };
        Exercise7Ctrl.prototype.isSubExerciseSelected = function (index) {
            if (this.selectedInput == index) {
                return true;
            }
            else {
                return false;
            }
        };
        Exercise7Ctrl.prototype.getHighlightPosition = function () {
            return this.highlightPositions[this.selectedInput];
        };
        Exercise7Ctrl.prototype.isExerciseSinglePager = function () {
            return true;
        };
        Exercise7Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
            }
        };
        Exercise7Ctrl.$inject = ['$scope', '$location', '$route', '$rootScope', 'exercise7Data', 'texts'];
        return Exercise7Ctrl;
    }(NavigationBase));
    exercises.Exercise7Ctrl = Exercise7Ctrl;
    var Exercise8Ctrl = (function (_super) {
        __extends(Exercise8Ctrl, _super);
        function Exercise8Ctrl($scope, $location, $route, $rootScope, exercise8Data, texts) {
            _super.call(this, $scope, $location, $route, exercise8Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$rootScope = $rootScope;
            this.exercise8Data = exercise8Data;
            this.texts = texts;
            this.exetype = "N2d";
            this.selectedInput = 0;
            this.selectedSide = 0;
            this.titleText = texts.exe8TitleText;
            for (var i = 0; i < exercise8Data.subexerciseListDTO.length; i++) {
                var exeItem = new exercises.Exercise8Item(exercise8Data.subexerciseListDTO[i].numbersToSplit);
                exercise8Data.subexerciseListDTO[i] = exeItem;
            }
        }
        Exercise8Ctrl.prototype.selectSubExercise = function (index, oneOfTheSides) {
            this.selectedInput = index;
            this.selectedSide = oneOfTheSides;
        };
        Exercise8Ctrl.prototype.changeSelectedInput = function (value) {
            if (angular.isUndefined(this.selectedInput) || angular.isUndefined(this.selectedSide)) {
                return;
            }
            var givenNumber = null;
            if (this.selectedSide == 0) {
                givenNumber = this.exercise8Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredFirstSplit;
            }
            else {
                givenNumber = this.exercise8Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredSecondSplit;
            }
            if (givenNumber == null) {
                givenNumber = value;
            }
            else if (givenNumber.toString().length < 2) {
                givenNumber = parseInt(String(givenNumber) + String(value));
            }
            if (this.selectedSide == 0) {
                this.exercise8Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredFirstSplit = givenNumber;
            }
            else {
                this.exercise8Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredSecondSplit = givenNumber;
            }
        };
        Exercise8Ctrl.prototype.isSubExerciseSelected = function (index) {
            if (this.selectedInput == index) {
                return true;
            }
            else {
                return false;
            }
        };
        Exercise8Ctrl.prototype.isExerciseSinglePager = function () {
            return true;
        };
        Exercise8Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
            }
        };
        Exercise8Ctrl.$inject = ['$scope', '$location', '$route', '$rootScope', 'exercise8Data', 'texts'];
        return Exercise8Ctrl;
    }(NavigationBase));
    exercises.Exercise8Ctrl = Exercise8Ctrl;
    var PlusMinusExercise1Ctrl = (function (_super) {
        __extends(PlusMinusExercise1Ctrl, _super);
        function PlusMinusExercise1Ctrl($scope, $location, $route, $rootScope, plusMinusExe1Data, texts) {
            _super.call(this, $scope, $location, $route, plusMinusExe1Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$rootScope = $rootScope;
            this.plusMinusExe1Data = plusMinusExe1Data;
            this.texts = texts;
            this.exetype = "P1a";
            this.progressBarType = "pm-exe1";
            this.progressBarClass = "progress-color-pm-exe1";
            this.titleText = texts.plusMinusExe1TitleText;
            for (var i = 0; i < plusMinusExe1Data.subexerciseListDTO.length; i++) {
                var firstNumberToSumFromFile = plusMinusExe1Data.subexerciseListDTO[i].firstNumberToSum;
                var secondNumberToSumFromFile = plusMinusExe1Data.subexerciseListDTO[i].secondNumberToSum;
                var exeItem = new exercises.PlusMinusExercise1Item(firstNumberToSumFromFile, secondNumberToSumFromFile);
                plusMinusExe1Data.subexerciseListDTO[i] = exeItem;
            }
        }
        PlusMinusExercise1Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
                this.plusMinusExe1Data.subexerciseListDTO.unshift(new exercises.PlusMinusExercise1Item(0, 0));
                this.totalItems = this.plusMinusExe1Data.subexerciseListDTO.length;
            }
        };
        PlusMinusExercise1Ctrl.$inject = ['$scope', '$location', '$route', '$rootScope', 'plusMinusExe2Data', 'texts'];
        return PlusMinusExercise1Ctrl;
    }(NavigationBase));
    exercises.PlusMinusExercise1Ctrl = PlusMinusExercise1Ctrl;
    var PlusMinusExercise2Ctrl = (function (_super) {
        __extends(PlusMinusExercise2Ctrl, _super);
        function PlusMinusExercise2Ctrl($scope, $location, $route, $rootScope, plusMinusExe2Data, texts) {
            _super.call(this, $scope, $location, $route, plusMinusExe2Data.subexerciseListDTO.length);
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$rootScope = $rootScope;
            this.plusMinusExe2Data = plusMinusExe2Data;
            this.texts = texts;
            this.exetype = "P1b";
            this.selectedInput = 0;
            this.rubberPositions = [{ top: '-20px', left: '250px' },
                { top: '-20px', left: '530px' },
                { top: '45px', left: '250px' },
                { top: '45px', left: '530px' },
                { top: '105px', left: '250px' },
                { top: '105px', left: '530px' },
                { top: '165px', left: '250px' },
                { top: '165px', left: '530px' },
                { top: '230px', left: '250px' },
                { top: '230px', left: '530px' },
                { top: '290px', left: '250px' },
                { top: '290px', left: '530px' }];
            this.titleText = texts.plusMinusExe2TitleText;
            for (var i = 0; i < plusMinusExe2Data.subexerciseListDTO.length; i++) {
                var firstNumberToSumFromFile = plusMinusExe2Data.subexerciseListDTO[i].firstNumberToSum;
                var secondNumberToSumFromFile = plusMinusExe2Data.subexerciseListDTO[i].secondNumberToSum;
                var exeItem = new exercises.PlusMinusExercise2Item(firstNumberToSumFromFile, secondNumberToSumFromFile);
                plusMinusExe2Data.subexerciseListDTO[i] = exeItem;
            }
        }
        PlusMinusExercise2Ctrl.prototype.isExerciseSinglePager = function () {
            return true;
        };
        PlusMinusExercise2Ctrl.prototype.selectSubExercise = function (index) {
            this.selectedInput = index;
        };
        PlusMinusExercise2Ctrl.prototype.getRubberPosition = function () {
            return this.rubberPositions[this.selectedInput];
        };
        PlusMinusExercise2Ctrl.prototype.changeEnteredInput = function (incomingInput) {
            var givenNumber = this.plusMinusExe2Data.subexerciseListDTO[this.selectedInput].enteredNumber;
            if (angular.isUndefined(givenNumber) || givenNumber == null) {
                givenNumber = incomingInput;
            }
            else if (givenNumber.toString().length < 2) {
                givenNumber = parseInt(String(givenNumber) + String(incomingInput));
            }
            this.plusMinusExe2Data.subexerciseListDTO[this.selectedInput].enteredNumber = givenNumber;
        };
        PlusMinusExercise2Ctrl.prototype.deleteEnteredInput = function () {
            this.plusMinusExe2Data.subexerciseListDTO[this.selectedInput].enteredNumber = null;
        };
        PlusMinusExercise2Ctrl.prototype.getLiTagColor = function (index) {
            if (index % 2 == 0) {
                return { color: '#FF3D7F' };
            }
        };
        PlusMinusExercise2Ctrl.prototype.isSubExerciseSelected = function (index) {
            if (this.selectedInput == index) {
                return true;
            }
            else {
                return false;
            }
        };
        PlusMinusExercise2Ctrl.prototype.checkResult = function () {
            if (!this.isSummaryActive()) {
                _super.prototype.checkResult.call(this);
            }
        };
        PlusMinusExercise2Ctrl.$inject = ['$scope', '$location', '$route', '$rootScope', 'plusMinusExe2Data', 'texts'];
        return PlusMinusExercise2Ctrl;
    }(NavigationBase));
    exercises.PlusMinusExercise2Ctrl = PlusMinusExercise2Ctrl;
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
    function animateRubberWithPosition() {
        return {
            link: function ($scope, element, attributes) {
                $(element).on("click", function () {
                    $(this).addClass('remove-btn-pm-animate').delay(200).queue(function (next) {
                        $(this).removeClass('remove-btn-pm-animate');
                        next();
                    });
                });
            }
        };
    }
    exercises.animateRubberWithPosition = animateRubberWithPosition;
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
                        ui.draggable.css({
                            top: $(element).position().top + "px",
                            left: $(element).position().left + "px"
                        });
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
    function focusIf($timeout) {
        function link($scope, $element, $attrs) {
            var dom = $element[0];
            if ($attrs.focusIf) {
                $scope.$watch($attrs.focusIf, focus);
            }
            else {
                focus(true);
            }
            function focus(condition) {
                if (condition) {
                    $timeout(function () {
                        dom.focus();
                    }, $scope.$eval($attrs.focusDelay) || 0);
                }
            }
        }
        return {
            restrict: 'A',
            link: link
        };
    }
    exercises.focusIf = focusIf;
    focusIf.$inject = ['$timeout'];
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
    var mathApp = angular.module('maths', ['ngMdIcons', 'ngTouch', 'ui.bootstrap', 'ngRoute', 'ng-sortable', 'ngDragDrop']);
    mathApp.controller('homeCtrl', exercises.HomeCtrl);
    mathApp.controller('exercise1Ctrl', exercises.Exercise1Ctrl);
    mathApp.controller('exercise2Ctrl', exercises.Exercise2Ctrl);
    mathApp.controller('exercise3Ctrl', exercises.Exercise3Ctrl);
    mathApp.controller('exercise4Ctrl', exercises.Exercise4Ctrl);
    mathApp.controller('exercise5Ctrl', exercises.Exercise5Ctrl);
    mathApp.controller('exercise6Ctrl', exercises.Exercise6Ctrl);
    mathApp.controller('exercise7Ctrl', exercises.Exercise7Ctrl);
    mathApp.controller('exercise8Ctrl', exercises.Exercise8Ctrl);
    mathApp.controller('plusMinusExercise1Ctrl', exercises.PlusMinusExercise1Ctrl);
    mathApp.controller('plusMinusExercise2Ctrl', exercises.PlusMinusExercise2Ctrl);
    mathApp.service('exerciseServices', exercises.ExerciseServices);
    mathApp.directive('animateRubber', exercises.animateRubber);
    mathApp.directive('animateRubberWithPosition', exercises.animateRubberWithPosition);
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
                .when('/N2b', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise6Ctrl',
                resolve: {
                    'exercise6Data': function (exerciseServices) {
                        return exerciseServices.getExercise6Data();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            }).when('/N2c', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise7Ctrl',
                resolve: {
                    'exercise7Data': function (exerciseServices) {
                        return exerciseServices.getExercise7Data();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            }).when('/N2d', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'exercise8Ctrl',
                resolve: {
                    'exercise8Data': function (exerciseServices) {
                        return exerciseServices.getExercise8Data();
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            })
                .when('/P1a', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'plusMinusExercise1Ctrl',
                resolve: {
                    'plusMinusExe1Data': function (exerciseServices) {
                        return exerciseServices.getExerciseFromJson("plusMinusExe1Data");
                    },
                    'texts': function (exerciseServices) {
                        return exerciseServices.getTexts();
                    }
                }
            }).when('/P1b', {
                templateUrl: 'app/components/exerciseView.html',
                controller: 'plusMinusExercise2Ctrl',
                resolve: {
                    'plusMinusExe2Data': function (exerciseServices) {
                        return exerciseServices.getExerciseFromJson("plusMinusExe2Data");
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