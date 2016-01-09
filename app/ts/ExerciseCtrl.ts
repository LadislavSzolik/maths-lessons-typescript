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
    public elementSize: number;
    public static $inject = ['$scope', '$location', '$route', 'exercise1Data', 'texts'];

    constructor(
      protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public exercise1Data: IExercise1,
      public texts: any) {
      super($scope, $location, $route, exercise1Data.subexerciseListDTO.length);
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
    public elementSize: number;
    public static $inject = ['$scope', '$location', '$route', 'exercise2Data', 'texts', '$rootScope'];
    public isLastElement: boolean;

    constructor(
      protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public exercise2Data: IExercise2,
      public texts: any,
      public $rootScope: any) {
      super($scope, $location, $route, exercise2Data.subexerciseListDTO.length);
      this.isLastElement = false;

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


  export class Exercise3Ctrl extends NavigationBase {
    public exetype: String = "N1c";
    public static $inject = ['$scope', '$location', '$route', '$rootScope', 'exercise3Data'];
    public positions:any;
    public startingPosition:Object;
    public listOfCorrect:number[];

    constructor(
      protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public $rootScope: any,
      public exercise3Data: IExercise3
      ) {

      super($scope, $location, $route, exercise3Data.subexerciseListDTO.length);

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

      this.startingPosition = {top:'364px', left: '561px'};

      this.listOfCorrect = [];

      $rootScope.$on('ball.dropped', (event:any, args:any) => {
        console.log('before listOfCorrect'+ this.listOfCorrect);
        if(args.dropped ==  args.destination) {
          this.listOfCorrect.push(args.dropped);
        } else if(this.listOfCorrect.indexOf(args.dropped,0) > -1) {
          this.listOfCorrect.splice(this.listOfCorrect.indexOf(args.dropped,0),1);
        }
        console.log('after listOfCorrect'+ this.listOfCorrect);
        this.addNextVisible()

      })
    }

    addNextVisible() {
      for(var i:number = 0; i< this.exercise3Data.subexerciseListDTO[this.currentPage-1].missingNumbers.length; i++) {
        var missingNumber:number = this.exercise3Data.subexerciseListDTO[this.currentPage-1].missingNumbers[i];
        if(this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfVisibleNumbers.indexOf(missingNumber,0) == -1){
          this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfVisibleNumbers.push(missingNumber);
          this.$rootScope.$digest();
          return;

        }
      }
    }

    isNumberMissing(index:number) {
      return this.exercise3Data.subexerciseListDTO[this.currentPage-1].missingNumbers.indexOf(index,0) > -1;
    }

    isVisible(number:number) {
      return this.exercise3Data.subexerciseListDTO[this.currentPage-1].listOfVisibleNumbers.indexOf(number,0) > -1;
    }

  }

}
