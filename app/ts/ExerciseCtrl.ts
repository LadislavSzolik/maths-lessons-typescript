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

  export class NavigationBase {

    public currentPage: number;
    public summaryActivated: boolean;
    public totalItems: number;

    constructor(
      protected $scope: any,
      protected $location: ng.ILocationService,
      protected $route: any,
      public exercise1Data: IExercise1) {
      $scope.vm = this;
      this.currentPage = 1;
      this.totalItems = this.exercise1Data.subexerciseListDTO.length;
      this.summaryActivated = false;

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

    checkResult() {
      if (!this.isSummaryActive()) {
        this.summaryActivated = true;
        this.exercise1Data.subexerciseListDTO.unshift(new Exercise1Item(99));
        this.currentPage = 1;
        this.totalItems = this.exercise1Data.subexerciseListDTO.length;
      }
    }

    isSummaryActive() {
      return this.summaryActivated;
    }


    selectPage(page: number) {
      if (page > 0 && page <= this.totalItems) {
        this.currentPage = page;
      }
    };

    noPrevious() {
      return this.currentPage === 1;
    };

    noNext() {
      return this.currentPage === this.totalItems;
    };

  }

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
      super($scope, $location, $route, exercise1Data);
      for (var i: number = 0; i < exercise1Data.subexerciseListDTO.length; i++) {
        var exeItem: Exercise1Item = new Exercise1Item(exercise1Data.subexerciseListDTO[i].number);
        exercise1Data.subexerciseListDTO[i] = exeItem;
        exercise1Data.subexerciseListDTO[i].getListOfPositions(exercise1Data.numberOfRange, 330, 90, exercise1Data.subexerciseListDTO[i].number);
      }
    };

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

      super($scope, $location, $route, exercise2Data);

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

    };

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

}
