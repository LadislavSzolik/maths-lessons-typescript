module exercises {

export interface IExerciseServices {
  getMenuData():any;
  getExercise1Data():any;
  getExercise2Data():any;
  getExercise3Data():any;
  getExercise4Data():any;
  getTexts():any;
}

  export class ExerciseServices implements IExerciseServices {
    $inject = ["$http"];

    constructor(public $http: ng.IHttpService){
    }

    getMenuData(){
      return this.$http.get('app/data/menuData.json').then((result) => {return result.data});
    }

    getExercise1Data() {
      return this.$http.get('app/data/exe1Data.json').then((result) => {return result.data});
    }

    getExercise2Data() {
      return this.$http.get('app/data/exe2Data.json').then((result) => {return result.data});
    }

    getExercise3Data() {
      return this.$http.get('app/data/exe3Data.json').then((result) => {return result.data});
    }

    getExercise4Data() {
      return this.$http.get('app/data/exe4Data.json').then((result) => {return result.data});
    }

    getTexts() {
      return this.$http.get('app/data/appTexts.json').then((result) => {return result.data});
    }
  }
}
