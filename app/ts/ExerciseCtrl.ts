module exercises {

  export class NavigationBase {

    public currentPage:number;

    constructor(
        protected $scope:any,
        protected $location:ng.ILocationService,
        protected $route:any,
        public totalItems:number) {
      $scope.vm = this;
      this.currentPage = 1;
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

    }

    isSummaryActive() {
      return false;
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

  export class Exercise1Ctrl extends NavigationBase{

    public exetype:String = "N1a";
    public elementSize:number;

    public static $inject = ['$scope','$location', '$route', 'exercise1Data'];

    constructor(
        protected $scope:any,
        protected $location:ng.ILocationService,
        protected $route:any,
        public exercise1Data:IExercise1) {
      super($scope,$location,$route,exercise1Data.subexerciseListDTO.length);

        for(var i:number = 0; i<exercise1Data.subexerciseListDTO.length; i++){
          var exeItem: Exercise1Item = new Exercise1Item(exercise1Data.subexerciseListDTO[i].number);
          exercise1Data.subexerciseListDTO[i] = exeItem;
          exercise1Data.subexerciseListDTO[i].getListOfPositions(exercise1Data.numberOfRange,330,80);
        }

    };

    backspace(index:number) {
      if (!this.isSummaryActive() && angular.isDefined(this.exercise1Data.subexerciseListDTO[index].givenNumber)) {
        var givenNumber:string = this.exercise1Data.subexerciseListDTO[index].givenNumber.toString();
        var tempNumberString:string = givenNumber.substring(0,givenNumber.length-1);
        var finalNumber:number;

        if(tempNumberString.length == 0){
          finalNumber = undefined;
        } else{
          finalNumber = parseInt(tempNumberString);
        }
        this.exercise1Data.subexerciseListDTO[index].givenNumber =  finalNumber;
      }
    }

    setUserInput(index:number, newVal:number) {
        if (!this.isSummaryActive()) {
          var givenNumber:number = this.exercise1Data.subexerciseListDTO[index].givenNumber;

          if (angular.isUndefined(givenNumber) || givenNumber == null) {
            givenNumber = newVal;
          }
          else if (givenNumber.toString().length < 2) {
            givenNumber =  parseInt(String(givenNumber)+String(newVal));
          }
          this.exercise1Data.subexerciseListDTO[index].givenNumber = givenNumber;
        }
    }

  }

}
