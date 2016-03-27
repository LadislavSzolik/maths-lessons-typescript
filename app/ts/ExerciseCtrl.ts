/// <reference path='_all.ts' />

module exercises {

  export class HomeCtrl {
    public static $inject = ['$scope', 'menuData', 'texts'];

    constructor(public $scope: any,
      public menuData: any,
      public texts: any) {
      $scope.vm = this;
    }
  }

  /*
   * Base navigation class contains the basic functionality for controllers
   */
  export class NavigationBase {
    public currentPage: number;
    public summaryActivated: boolean;
    public onePercentage: number;

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public totalItems: number) {
      $scope.vm = this;
      this.currentPage = 1;
      this.summaryActivated = false;
      this.onePercentage = 100 / totalItems;
    }

    isCurrentExercise(index: number) {
      return this.currentPage == (index + 1);
    }

    exit() {
      this.$location.path('/');
    }

    reload() {
      this.$route.reload();
    }

    isSummaryActive() {
      return this.summaryActivated;
    }

    selectPage(page: number) {
      if (page > 0 && page <= this.totalItems) {
        this.currentPage = page;
      }
    }

    noPrevious() {
      return this.currentPage === 1;
    }

    noNext() {
      return this.currentPage === this.totalItems;
    }

    isExerciseSinglePager() {
      return false;
    }

    // Needs to be extended in the parent controller
    checkResult() {
      this.summaryActivated = true;
      this.currentPage = 1;
    }
  }

  /*
   * Exercise 1 controller
   */
  export class Exercise1Ctrl extends NavigationBase {

    public exetype: String = "N1a";
    public progressBarType: string = "exe1";
    public progressBarClass: string = "progress-color-exe1";
    public elementSize: number;
    public static $inject = ['$scope', '$location', '$route', 'exercise1Data', 'texts'];
    public titleText: string;

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public exercise1Data: IExercise1,
      public texts: any) {
      super($scope, $location, $route, exercise1Data.subexerciseListDTO.length);

      this.titleText = texts.exe1TitleText;

      for (var i: number = 0; i < exercise1Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise1Item = new Exercise1Item(exercise1Data.subexerciseListDTO[i].number);
        exercise1Data.subexerciseListDTO[i] = exeItem;
        exercise1Data.subexerciseListDTO[i].getListOfPositions(exercise1Data.numberOfRange, 330, 90, exercise1Data.subexerciseListDTO[i].number);
      }
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.exercise1Data.subexerciseListDTO.unshift(new Exercise1Item(99));
        this.totalItems = this.exercise1Data.subexerciseListDTO.length;
      }
    }

    backspace(index: number) {
      if (!this.isSummaryActive() && angular.isDefined(this.exercise1Data.subexerciseListDTO[index].givenNumber)) {
        var givenNumber: string = this.exercise1Data.subexerciseListDTO[index].givenNumber.toString();
        var tempNumberString: string = givenNumber.substring(0, givenNumber.length - 1);
        var finalNumber: number;

        if (tempNumberString.length == 0) {
          finalNumber = undefined;
        } else {
          finalNumber = parseInt(tempNumberString);
        }
        this.exercise1Data.subexerciseListDTO[index].givenNumber = finalNumber;
      }
    }

    setUserInput(index: number, newVal: number) {
      if (!this.isSummaryActive()) {
        var givenNumber: number = this.exercise1Data.subexerciseListDTO[index].givenNumber;

        if (angular.isUndefined(givenNumber) || givenNumber == null) {
          givenNumber = newVal;
        }
        else if (givenNumber.toString().length < 2) {
          givenNumber = parseInt(String(givenNumber) + String(newVal));
        }
        this.exercise1Data.subexerciseListDTO[index].givenNumber = givenNumber;
      }
    }

    isCorrect(index: number) {
      return this.exercise1Data.subexerciseListDTO[index].givenNumber == this.exercise1Data.subexerciseListDTO[index].number;
    }

  }

  /*
   * Exercise 2 controller
   */
  export class Exercise2Ctrl extends NavigationBase {
    public exetype: String = "N1b";
    public progressBarType: string = "exe2";
    public progressBarClass: string = "progress-color-exe2";
    public elementSize: number;
    public static $inject = ['$scope', '$location', '$route', 'exercise2Data', 'texts', '$rootScope'];
    public isLastElement: boolean;
    public titleText: string;

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public exercise2Data: IExercise2,
      public texts: any,
      public $rootScope: any) {
      super($scope, $location, $route, exercise2Data.subexerciseListDTO.length);

      this.isLastElement = false;

      this.titleText = texts.exe2TitleText;

      for (var i: number = 0; i < exercise2Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise2Item = new Exercise2Item(exercise2Data.subexerciseListDTO[i].number);
        exercise2Data.subexerciseListDTO[i] = exeItem;
        exercise2Data.subexerciseListDTO[i].getListOfPositions(exercise2Data.numberOfRange, 330, 90, 25);
        exercise2Data.subexerciseListDTO[i].addObject();
      }

      $rootScope.$on('dropped', (event: any, args: any) => {
        var countOfDisplayed = 0;
        var countOfDropped = 0;
        for (var i: number = 0; i < exercise2Data.subexerciseListDTO.length; i++) {
          if (exercise2Data.subexerciseListDTO[i].itemId == args.parentId) {
            for (var j: number = 0; j < exercise2Data.subexerciseListDTO[i].listOfPositions.length; j++) {
              if (exercise2Data.subexerciseListDTO[i].listOfPositions[j].isDisplayed) {
                countOfDisplayed++;
              }
              if (exercise2Data.subexerciseListDTO[i].listOfPositions[j].isDropped) {
                countOfDropped++;
              }
            }
            exercise2Data.subexerciseListDTO[i].givenNumber = countOfDropped;
            if (countOfDropped == exercise2Data.subexerciseListDTO[i].listOfPositions.length) {
              this.isLastElement = true;
              $rootScope.$digest();
            }
            if (countOfDisplayed == countOfDropped) {
              exercise2Data.subexerciseListDTO[i].addObject();
              $rootScope.$digest();
            }
          }
        }
      });

      $scope.$watch('vm.summaryActivated', (summaryActivated: boolean) => {
        if (summaryActivated == false) {
          return
        }
        for (var i: number = 0; i < exercise2Data.subexerciseListDTO.length; i++) {
          if (angular.isDefined(exercise2Data.subexerciseListDTO[i].listOfPositions)) {
            for (var j: number = 0; j < exercise2Data.subexerciseListDTO[i].listOfPositions.length; j++) {
              exercise2Data.subexerciseListDTO[i].listOfPositions[j].isDisabled = true;
            }
          }
        }
      });
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.exercise2Data.subexerciseListDTO.unshift(new Exercise2Item(99));
        this.totalItems = this.exercise2Data.subexerciseListDTO.length;
      }
    }

    removeOne(index: number) {
      if (!this.isSummaryActive() && angular.isDefined(this.exercise2Data.subexerciseListDTO[index].givenNumber)) {
        for (var i: number = 0; i < this.exercise2Data.subexerciseListDTO[index].listOfPositions.length; i++) {
          if (this.exercise2Data.subexerciseListDTO[index].listOfPositions[i].isDropped == true) {
            this.$rootScope.$emit('rubber.remove', { objectId: this.exercise2Data.subexerciseListDTO[index].listOfPositions[i].objectId });
            return;
          }
        }
      }
    }

    isCorrect(index: number) {
      return this.exercise2Data.subexerciseListDTO[index].givenNumber == this.exercise2Data.subexerciseListDTO[index].number;
    }

  }


  /***********************************************
   *
   * Exercise 3 controller
   *
   ***********************************************/
  export class Exercise3Ctrl extends NavigationBase {
    public exetype: String = "N1c";
    public progressBarType: string = "exe3";
    public progressBarClass: string = "progress-color-exe3";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'exercise3Data', 'texts'];
    public titleText: string;

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public exercise3Data: IExercise3,
      public texts: any) {

      super($scope, $location, $route, exercise3Data.subexerciseListDTO.length);
      this.titleText = texts.exe3TitleText;
      for (var i: number = 0; i < exercise3Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise3Item = new Exercise3Item(exercise3Data.subexerciseListDTO[i].startFrom, exercise3Data.subexerciseListDTO[i].missingNumbers);
        exercise3Data.subexerciseListDTO[i] = exeItem;
      }
    }


    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.exercise3Data.subexerciseListDTO.unshift(new Exercise3Item(99, []));
        this.totalItems = this.exercise3Data.subexerciseListDTO.length;
      }
    }
  }

  /***********************************************
   *
   * Exercise 4 controller
   *
   ***********************************************/
  export class Exercise4Ctrl extends NavigationBase {
    public exetype: String = "N1d";
    public progressBarType: string = "exe4";
    public progressBarClass: string = "progress-color-exe4";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'exercise4Data', 'texts'];
    public titleText: string;


    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public exercise4Data: IExercise4,
      public texts: any) {

      super($scope, $location, $route, exercise4Data.subexerciseListDTO.length);
      this.titleText = texts.exe4TitleText;
      for (var i: number = 0; i < exercise4Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise4Item = new Exercise4Item(exercise4Data.subexerciseListDTO[i].startFrom, exercise4Data.subexerciseListDTO[i].missingNumbers, exercise4Data.subexerciseListDTO[i].blockedNumbers);
        exercise4Data.subexerciseListDTO[i] = exeItem;
      }
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.exercise4Data.subexerciseListDTO.unshift(new Exercise4Item(0, [], []));
        this.totalItems = this.exercise4Data.subexerciseListDTO.length;
      }
    }

  }

  /***********************************************
   *
   * Exercise 5 controller
   *
   ***********************************************/
  export class Exercise5Ctrl extends NavigationBase {
    public exetype: String = "N2a";
    public progressBarType: string = "exe5";
    public progressBarClass: string = "progress-color-exe5";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'exercise5Data', 'texts'];
    public positions: any;
    public positionCorrections: any;
    public startingPosition: Object;
    public smallPositions: Object;
    public titleText: string;
    public unarranged: any[] = [];
    public styles: any = ['column-one', 'column-two', 'column-three', 'column-four', 'column-five'];

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public exercise5Data: IExercise5,
      public texts: any) {
      super($scope, $location, $route, exercise5Data.subexerciseListDTO.length);
      this.titleText = texts.exe5TitleText;
      for (var i: number = 0; i < exercise5Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise5Item = new Exercise5Item(exercise5Data.subexerciseListDTO[i].unarrangedNumbers, exercise5Data.subexerciseListDTO[i].arrangedNumbers);
        exercise5Data.subexerciseListDTO[i] = exeItem;
      }

      for (var i = 0; i < 4; i++) {
        this.unarranged.push({});
      }
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.exercise5Data.subexerciseListDTO.unshift(new Exercise5Item([], []));
        this.totalItems = this.exercise5Data.subexerciseListDTO.length;
      }
    }
  }

  /***********************************************
   *
   * Exercise 6 controller
   *
   ***********************************************/
  export class Exercise6Ctrl extends NavigationBase {
    public exetype: String = "N2b";
    public progressBarType: string = "exe6";
    public progressBarClass: string = "progress-color-exe6";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'exercise6Data', 'texts'];
    public positions: any;
    public positionCorrections: any;
    public startingPosition: Object;
    public smallPositions: Object;
    public titleText: string;


    public allSigns: ComparatorSign[] = [];
    public missingSigns: any[] = [];

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public exercise6Data: IExercise6,
      public texts: any) {
      super($scope, $location, $route, exercise6Data.subexerciseListDTO.length);
      this.titleText = texts.exe6TitleText;
      for (var i: number = 0; i < exercise6Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise6Item = new Exercise6Item(exercise6Data.subexerciseListDTO[i].numberOne, exercise6Data.subexerciseListDTO[i].numberTwo, exercise6Data.subexerciseListDTO[i].resultSign);
        exercise6Data.subexerciseListDTO[i] = exeItem;
      }

      for (var i = 0; i < 12; i++) {
        this.allSigns.push(new ComparatorSign("<"));
        this.allSigns.push(new ComparatorSign("="));
        this.allSigns.push(new ComparatorSign(">"));
        this.missingSigns.push({});
      }

    }

    isSignOnRight(index: number) {
      if (this.allSigns[index].value == ">") {
        return true
      } else {
        return false
      }
    }

    isSignOnLeft(index: number) {
      if (this.allSigns[index].value == "<") {
        return true
      } else {
        return false
      }
    }

    isCorrect(index: number) {
      if (this.missingSigns[index].value == this.exercise6Data.subexerciseListDTO[index].resultSign) {
        return true;
      } else {
        return false;
      }

    }

    isExerciseSinglePager() {
      return true;
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
      }
    }
  }

  /***********************************************
   *
   * Exercise 7 controller
   *
   ***********************************************/
  export class Exercise7Ctrl extends NavigationBase {
    public exetype: String = "N2c";
    public progressBarType: string = "exe7";
    public progressBarClass: string = "progress-color-exe7";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'exercise7Data', 'texts'];
    public titleText: string;
    public selectedInput: number = 0;
    public highlightPositions: any[] = [{ top: '13px', left: '20px' },
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

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public exercise7Data: IExercise7,
      public texts: any) {
      super($scope, $location, $route, exercise7Data.subexerciseListDTO.length);
      this.titleText = texts.exe7TitleText;
      for (var i: number = 0; i < exercise7Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise7Item = new Exercise7Item(exercise7Data.subexerciseListDTO[i].numbersToDouble);
        exercise7Data.subexerciseListDTO[i] = exeItem;
      }
    }

    selectSubExercise(index: number) {
      this.selectedInput = index;
    }

    changeSelectedInput(value: number) {

      if (angular.isUndefined(this.selectedInput)) {
        return;
      }

      var givenNumber: number = this.exercise7Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredDouble;

      if (angular.isUndefined(givenNumber) || givenNumber == null) {
        givenNumber = value;
      }
      else if (givenNumber.toString().length < 2) {
        givenNumber = parseInt(String(givenNumber) + String(value));
      }
      this.exercise7Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredDouble = givenNumber;
    }

    isSubExerciseSelected(index: number) {
      if (this.selectedInput == index) {
        return true;
      } else {
        return false
      }
    }

    getHighlightPosition() {
      return this.highlightPositions[this.selectedInput];
    }

    isExerciseSinglePager() {
      return true;
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
      }
    }
  }
  /***********************************************
   *
   * Exercise 8 controller
   *
   ***********************************************/
  export class Exercise8Ctrl extends NavigationBase {
    public exetype: String = "N2d";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'exercise8Data', 'texts'];
    public titleText: string;
    public selectedInput: number = 0;
    public selectedSide: number = 0;

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public exercise8Data: IExercise8,
      public texts: any) {
      super($scope, $location, $route, exercise8Data.subexerciseListDTO.length);
      this.titleText = texts.exe8TitleText;
      for (var i: number = 0; i < exercise8Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise8Item = new Exercise8Item(exercise8Data.subexerciseListDTO[i].numbersToSplit);
        exercise8Data.subexerciseListDTO[i] = exeItem;
      }
    }

    selectSubExercise(index: number, oneOfTheSides: number) {
      this.selectedInput = index;
      this.selectedSide = oneOfTheSides;
    }

    changeSelectedInput(value: number) {
      if (angular.isUndefined(this.selectedInput) || angular.isUndefined(this.selectedSide)) {
        return;
      }

      var givenNumber: number = null;

      if (this.selectedSide == 0) {
        givenNumber = this.exercise8Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredFirstSplit;
      } else {
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
      } else {
        this.exercise8Data.subexerciseListDTO[0].givenNumbers[this.selectedInput].enteredSecondSplit = givenNumber;
      }
    }

    isSubExerciseSelected(index: number) {
      if (this.selectedInput == index) {
        return true;
      } else {
        return false
      }
    }

    isExerciseSinglePager() {
      return true;
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
      }
    }
  }

  /***********************************************
   *
   * PlusMinusExercise 1 controller
   *
   ***********************************************/
  export class PlusMinusExercise1Ctrl extends NavigationBase {
    public exetype: String = "P1a";
    public progressBarType: string = "pm-exe1";
    public progressBarClass: string = "progress-color-pm-exe1";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'plusMinusExe1Data', 'texts'];
    public titleText: string;


    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public plusMinusExe1Data: IPlusMinusExercise1,
      public texts: any) {
      super($scope, $location, $route, plusMinusExe1Data.subexerciseListDTO.length);
      this.titleText = texts.plusMinusExe1TitleText;

      for (var i: number = 0; i < plusMinusExe1Data.subexerciseListDTO.length; i++) {
        var firstNumberToSumFromFile = plusMinusExe1Data.subexerciseListDTO[i].firstNumberToSum;
        var secondNumberToSumFromFile = plusMinusExe1Data.subexerciseListDTO[i].secondNumberToSum;
        var exeItem: PlusMinusExercise1Item = new PlusMinusExercise1Item(firstNumberToSumFromFile, secondNumberToSumFromFile);
        plusMinusExe1Data.subexerciseListDTO[i] = exeItem;
      }
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.plusMinusExe1Data.subexerciseListDTO.unshift(new PlusMinusExercise1Item(0, 0));
        this.totalItems = this.plusMinusExe1Data.subexerciseListDTO.length;
      }
    }
  }

  /***********************************************
   *
   * PlusMinusExercise 2 controller
   *
   ***********************************************/
  export class PlusMinusExercise2Ctrl extends NavigationBase {
    public exetype: String = "P1b";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'plusMinusExe2Data', 'texts'];
    public titleText: string;
    public selectedInput: number = 0;
    public rubberPositions: any[] = [{ top: '-20px', left: '275px' },
      { top: '-20px', left: '555px' },
      { top: '45px', left: '275px' },
      { top: '45px', left: '555px' },
      { top: '105px', left: '275px' },
      { top: '105px', left: '555px' },
      { top: '165px', left: '275px' },
      { top: '165px', left: '555px' },
      { top: '230px', left: '275px' },
      { top: '230px', left: '555px' },
      { top: '290px', left: '275px' },
      { top: '290px', left: '555px' }];

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public plusMinusExe2Data: IPlusMinusExercise2,
      public texts: any) {
      super($scope, $location, $route, plusMinusExe2Data.subexerciseListDTO.length);
      this.titleText = texts.plusMinusExe2TitleText;

      for (var i: number = 0; i < plusMinusExe2Data.subexerciseListDTO.length; i++) {
        var firstNumberToSumFromFile = plusMinusExe2Data.subexerciseListDTO[i].firstNumberToSum;
        var secondNumberToSumFromFile = plusMinusExe2Data.subexerciseListDTO[i].secondNumberToSum;
        var exeItem: PlusMinusExercise2Item = new PlusMinusExercise2Item(firstNumberToSumFromFile, secondNumberToSumFromFile);
        plusMinusExe2Data.subexerciseListDTO[i] = exeItem;
      }
    }

    isExerciseSinglePager() {
      return true;
    }

    selectSubExercise(index: number) {
      this.selectedInput = index;
    }

    getRubberPosition() {
      return this.rubberPositions[this.selectedInput];
    }

    changeEnteredInput(incomingInput: number) {

      var givenNumber: number = this.plusMinusExe2Data.subexerciseListDTO[this.selectedInput].enteredNumber;

      if (angular.isUndefined(givenNumber) || givenNumber == null) {
        givenNumber = incomingInput;
      }
      else if (givenNumber.toString().length < 2) {
        givenNumber = parseInt(String(givenNumber) + String(incomingInput));
      }
      this.plusMinusExe2Data.subexerciseListDTO[this.selectedInput].enteredNumber = givenNumber;
    }

    deleteEnteredInput() {
      this.plusMinusExe2Data.subexerciseListDTO[this.selectedInput].enteredNumber = null;
    }

    getLiTagColor(index: number) {
      if (index % 2 == 0) {
        return { color: '#FF3D7F' }
      }
    }

    setWhiteBackgroundIfSelected(index: number) {
      if(this.selectedInput == index) {
        return {background: 'white'};
      }
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
      }
    }
  }

  /***********************************************
   *
   * PlusMinusExercise 3 controller
   *
   ***********************************************/
  export class PlusMinusExercise3Ctrl extends NavigationBase {
    public exetype: String = "P1c";
    public progressBarType: string = "pm-exe3";
    public progressBarClass: string = "progress-color-pm-exe3";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'plusMinusExe3Data', 'texts'];
    public titleText: string;


    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public plusMinusExe3Data: IPlusMinusExercise3,
      public texts: any) {
      super($scope, $location, $route, plusMinusExe3Data.subexerciseListDTO.length);
      this.titleText = texts.plusMinusExe3TitleText;

      for (var i: number = 0; i < plusMinusExe3Data.subexerciseListDTO.length; i++) {
        var minuend = plusMinusExe3Data.subexerciseListDTO[i].minuend;
        var subtrahend = plusMinusExe3Data.subexerciseListDTO[i].subtrahend;
        var exeItem: PlusMinusExercise3Item = new PlusMinusExercise3Item(minuend, subtrahend);
        plusMinusExe3Data.subexerciseListDTO[i] = exeItem;
      }


    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.plusMinusExe3Data.subexerciseListDTO.unshift(new PlusMinusExercise3Item(0, 0));
        this.totalItems = this.plusMinusExe3Data.subexerciseListDTO.length;
      }
    }
  }

  /***********************************************
   *
   * PlusMinusExercise 4 controller
   *
   ***********************************************/
  export class PlusMinusExercise4Ctrl extends NavigationBase {
    public exetype: String = "P1d";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'plusMinusExe4Data', 'texts'];
    public titleText: string;
    public selectedInput: number = 0;
    public rubberPositions: any[] = [{ top: '-20px', left: '275px' },
      { top: '-20px', left: '555px' },
      { top: '45px', left: '275px' },
      { top: '45px', left: '555px' },
      { top: '105px', left: '275px' },
      { top: '105px', left: '555px' },
      { top: '165px', left: '275px' },
      { top: '165px', left: '555px' },
      { top: '230px', left: '275px' },
      { top: '230px', left: '555px' },
      { top: '290px', left: '275px' },
      { top: '290px', left: '555px' }];

    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public plusMinusExe4Data: IPlusMinusExercise4,
      public texts: any) {
      super($scope, $location, $route, plusMinusExe4Data.subexerciseListDTO.length);
      this.titleText = texts.plusMinusExe4TitleText;

      for (var i: number = 0; i < plusMinusExe4Data.subexerciseListDTO.length; i++) {
        var minuend = plusMinusExe4Data.subexerciseListDTO[i].minuend;
        var subtrahend = plusMinusExe4Data.subexerciseListDTO[i].subtrahend;
        var exeItem: PlusMinusExercise4Item = new PlusMinusExercise4Item(minuend, subtrahend);
        plusMinusExe4Data.subexerciseListDTO[i] = exeItem;
      }
    }

    isExerciseSinglePager() {
      return true;
    }

    selectSubExercise(index: number) {
      this.selectedInput = index;
    }

    setWhiteBackgroundIfSelected(index: number) {
      if(this.selectedInput == index) {
        return {background: 'white'};
      }
    }

    getRubberPosition() {
      return this.rubberPositions[this.selectedInput];
    }

    changeEnteredInput(incomingInput: number) {

      var givenNumber: number = this.plusMinusExe4Data.subexerciseListDTO[this.selectedInput].enteredNumber;

      if (angular.isUndefined(givenNumber) || givenNumber == null) {
        givenNumber = incomingInput;
      }
      else if (givenNumber.toString().length < 2) {
        givenNumber = parseInt(String(givenNumber) + String(incomingInput));
      }
      this.plusMinusExe4Data.subexerciseListDTO[this.selectedInput].enteredNumber = givenNumber;
    }

    deleteEnteredInput() {
      this.plusMinusExe4Data.subexerciseListDTO[this.selectedInput].enteredNumber = null;
    }

    getLiTagColor(index: number) {
      if (index % 2 == 0) {
        return { color: '#C580DA' }
      }
    }
    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
      }
    }
  }

  /***********************************************
   *
   * PlusMinusExercise 5 controller
   *
   ***********************************************/
  export class PlusMinusExercise5Ctrl extends NavigationBase {
    public exetype: String = "P2a";
    public progressBarType: string = "pm-exe5";
    public progressBarClass: string = "progress-color-pm-exe5";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'plusMinusExe5Data', 'texts'];
    public titleText: string;


    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public plusMinusExe5Data: IPlusMinusExercise5,
      public texts: any) {
      super($scope, $location, $route, plusMinusExe5Data.subexerciseListDTO.length);
      this.titleText = texts.plusMinusExe5TitleText;

      for (var i: number = 0; i < plusMinusExe5Data.subexerciseListDTO.length; i++) {
        var minuend = plusMinusExe5Data.subexerciseListDTO[i].minuend;
        var subtrahend = plusMinusExe5Data.subexerciseListDTO[i].subtrahend;
        var exeItem: PlusMinusExercise5Item = new PlusMinusExercise5Item(minuend, subtrahend);
        plusMinusExe5Data.subexerciseListDTO[i] = exeItem;
      }
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.plusMinusExe5Data.subexerciseListDTO.unshift(new PlusMinusExercise5Item(0, 0));
        this.totalItems = this.plusMinusExe5Data.subexerciseListDTO.length;
      }
    }
  }

  /***********************************************
   *
   * PlusMinusExercise 6 controller
   *
   ***********************************************/
  export class PlusMinusExercise6Ctrl extends NavigationBase {
    public exetype: String = "P2b";
    public progressBarType: string = "pm-exe6";
    public progressBarClass: string = "progress-color-pm-exe6";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'plusMinusExe6Data', 'texts'];
    public titleText: string;


    constructor(protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public plusMinusExe6Data: IPlusMinusExercise6,
      public texts: any) {
      super($scope, $location, $route, plusMinusExe6Data.subexerciseListDTO.length);
      this.titleText = texts.plusMinusExe5TitleText;

      for (var i: number = 0; i < plusMinusExe6Data.subexerciseListDTO.length; i++) {
        var minuend = plusMinusExe6Data.subexerciseListDTO[i].minuend;
        var subtrahend = plusMinusExe6Data.subexerciseListDTO[i].subtrahend;
        var exeItem: PlusMinusExercise6Item = new PlusMinusExercise6Item(minuend, subtrahend);
        plusMinusExe6Data.subexerciseListDTO[i] = exeItem;
      }
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.plusMinusExe6Data.subexerciseListDTO.unshift(new PlusMinusExercise6Item(0, 0));
        this.totalItems = this.plusMinusExe6Data.subexerciseListDTO.length;
      }
    }
  }
}
