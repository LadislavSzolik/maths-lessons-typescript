/// <reference path="./_all.ts" />

module exercises {

  export interface IExercise1 {
    numberOfElements:Number;
    numberOfRange:Number;
    subexerciseListDTO : Exercise1Item[];
  }
  export class BaseItem {}

  export class Exercise1Item {
    number: number;
    givenNumber: number;
    
    constructor(){

    }
  }
}
