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

    constructor(
      protected $scope: any,
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
    public progressBarType:string = "exe1";
    public progressBarClass:string = "progress-color-exe1";
    public elementSize: number;
    public static $inject = ['$scope', '$location', '$route', 'exercise1Data', 'texts'];
    public titleText:string;
    constructor(
      protected $scope: any,
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
    public progressBarType:string = "exe2";
    public progressBarClass:string = "progress-color-exe2";
    public elementSize: number;
    public static $inject = ['$scope', '$location', '$route', 'exercise2Data', 'texts', '$rootScope'];
    public isLastElement: boolean;
    public titleText:string;

    constructor(
      protected $scope: any,
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
    public progressBarType:string = "exe3";
    public progressBarClass:string = "progress-color-exe3";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'exercise3Data', 'texts'];
    public positions:any;
    public startingPosition:Object;
    public smallPositions:Object;
    public titleText:string;


    constructor(
      protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public exercise3Data: IExercise3,
      public texts:any
      ) {

      super($scope, $location, $route, exercise3Data.subexerciseListDTO.length);
      this.titleText = texts.exe3TitleText;
      for (var i: number = 0; i < exercise3Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise3Item = new Exercise3Item(exercise3Data.subexerciseListDTO[i].startFrom, exercise3Data.subexerciseListDTO[i].missingNumbers);
        exercise3Data.subexerciseListDTO[i] = exeItem;
      }

      this.positions = [
        {top:'359px', left: '39px'},  //1
        {top:'301px', left: '179px'}, //2
        {top:'300px', left: '322px'}, //3
        {top:'207px', left: '438px'}, //4
        {top:'122px', left: '581px'}, //5
        {top:'18px', left: '468px'},  //6
        {top:'84px', left: '312px'},  //7
        {top:'15px', left: '176px'},  //8
        {top:'105px', left: '51px'}];//9

      this.smallPositions = [
        {top:'74px', left:'8px'},
        {top:'60px', left:'37px'},
        {top:'65px', left:'68px'},
        {top:'43px', left:'93px'},
        {top:'25px', left:'123px'},
        {top:'3px', left:'98px'},
        {top:'17px', left:'66px'},
        {top:'3px', left:'37px'},
        {top:'21px', left:'11px'},
        ];

      this.startingPosition = {top:'364px', left: '561px'};



      $rootScope.$on('ball.dropped', (event:any, args:any) => {
        var droppedBall:number = parseInt(args.dropped);

        // check listOfDroppedNumbers
        if(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfDroppedNumbers.indexOf(droppedBall,0) == -1){
          this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfDroppedNumbers.push(droppedBall);
        }
        // check listOfCorrectNumbers
        if(args.dropped ==  args.destination) {
          this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfCorrectNumbers.push(droppedBall);
        } else if(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfCorrectNumbers.indexOf(droppedBall,0) > -1) {
          this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfCorrectNumbers.splice(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfCorrectNumbers.indexOf(droppedBall,0),1);
        }
        // try to add the next
        this.addNextVisible();

      });

      $rootScope.$on('ball.removed',(event:any, args:any) => {
        this.removeBall(args.removedBall);
      });

    }

    addNextVisible() {
      // check listOfDroppedNumbers.length = listOfVisibleNumbers.length
      if(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfDroppedNumbers.length == this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfVisibleNumbers.length) {

        for(var i:number = 0; i< this.exercise3Data.subexerciseListDTO[this.currentPage-1].missingNumbers.length; i++) {

          var missingNumber:number = this.exercise3Data.subexerciseListDTO[this.currentPage-1].missingNumbers[i];
          if(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfVisibleNumbers.indexOf(missingNumber,0) == -1){
            this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfVisibleNumbers.push(missingNumber);
            this.$rootScope.$apply();
            return;
          }
        }
      }
    }

    removeBall(ballNumberString:any) {
      var ballNumber:number = parseInt(ballNumberString);
      // remove it from listOfVisibleNumbers
      this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfVisibleNumbers.splice(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfVisibleNumbers.indexOf(ballNumber,0), 1);
      // remove it from listOfDroppedNumbers
      this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfDroppedNumbers.splice(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfDroppedNumbers.indexOf(ballNumber,0), 1);
      // if it's part of listOfCorrectNumbers remove it from there too
      if(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfCorrectNumbers.indexOf(ballNumber,0) > -1) {
        this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfCorrectNumbers.splice(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfCorrectNumbers.indexOf(ballNumber,0), 1);
      }

      this.$rootScope.$apply();

      // if it was the last then should be added back
      this.addNextVisible();
    }

    isNumberMissing(parentIndex:number, index:number) {
      return this.exercise3Data.subexerciseListDTO[parentIndex].missingNumbers.indexOf(index,0) > -1;
    }

    isVisible(parentIndex:number, number:number) {
      return this.exercise3Data.subexerciseListDTO[parentIndex].listOfVisibleNumbers.indexOf(number,0) > -1;
    }

    isDropped(parentIndex:number, number:number){
      return this.exercise3Data.subexerciseListDTO[parentIndex].listOfDroppedNumbers.indexOf(number,0) > -1;
    }

    isCorrect(parentIndex:number, number:number) {
      return this.exercise3Data.subexerciseListDTO[parentIndex].listOfCorrectNumbers.indexOf(number,0) > -1;
    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.exercise3Data.subexerciseListDTO.unshift(new Exercise3Item(99,[]));
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
    public progressBarType:string = "exe4";
    public progressBarClass:string = "progress-color-exe4";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'exercise4Data', 'texts'];
    public positions:any;
    public positionCorrections:any;
    public startingPosition:Object;
    public smallPositions:Object;
    public titleText:string;

    public testArray1:any;
    public testArray2:any;

    public sortableConfig:any;

    constructor(
      protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public exercise4Data: IExercise4,
      public texts:any
      ) {

      super($scope, $location, $route, exercise4Data.subexerciseListDTO.length);
      this.titleText = texts.exe4TitleText;
      for (var i: number = 0; i < exercise4Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise4Item = new Exercise4Item(exercise4Data.subexerciseListDTO[i].startFrom, exercise4Data.subexerciseListDTO[i].missingNumbers, exercise4Data.subexerciseListDTO[i].blockedNumbers);
        exercise4Data.subexerciseListDTO[i] = exeItem;
      }

      this.sortableConfig = {group:'home'};

    }

    checkResult() {
      if (!this.isSummaryActive()) {
        super.checkResult();
        this.exercise4Data.subexerciseListDTO.unshift(new Exercise4Item(0,[],[]));
        this.totalItems = this.exercise4Data.subexerciseListDTO.length;
      }
    }

  }

}
