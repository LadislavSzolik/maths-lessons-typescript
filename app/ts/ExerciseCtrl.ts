module exercises {

  export class NavigationBase {

    public currentPage:number;

    constructor(
        protected $scope:any,
        protected $location:ng.ILocationService,
        protected $route:any) {
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
        if (page > 0 && page <= this.$scope.totalItems) {
            this.$scope.currentPage = page;
        }
    };

    noPrevious() {
        return this.$scope.currentPage === 1;
    };

    noNext() {
        return this.$scope.currentPage === this.$scope.totalItems;
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
      super($scope,$location,$route);


    };


  }

}
