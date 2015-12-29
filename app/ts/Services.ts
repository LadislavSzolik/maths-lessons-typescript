module exercises {

export interface IExerciseServices {
  getExercise1Data():any;
}

  export class ExerciseServices implements IExerciseServices {
    $inject = ["$http"];

    constructor(public $http: ng.IHttpService){
    }

    getExercise1Data() {
      return this.$http.get('app/data/exe1Data.json').then((result) => {return result.data});
    }
  }
}
