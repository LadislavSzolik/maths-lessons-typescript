/// <reference path="./_all.ts" />

module exercises {

  export interface IExercise1 {
    numberOfElements: number;
    numberOfRange: number;
    subexerciseListDTO: Exercise1Item[];
  }
  export class BaseItem { }

  export class Exercise1Item {
    public givenNumber: number;
    public listOfPositions: ObjectPosition[];
    public largeElementSize:number;
    public smallElementSize:number;

    constructor(public number: number) {

    }

    getElementSizeForFrameSize(size: number, numberOfRange: number) {
      var frameArea = size * size;
      var limitCorrection = CommonMath.findNextSqrt(numberOfRange);
      return Math.sqrt(Math.floor(frameArea / limitCorrection));
    }

    getListOfPositions(numberOfRange: number, largeFrame: number, smallFrame: number): ObjectPosition[] {
      if (angular.isUndefined(this.listOfPositions)) {
        this.listOfPositions = [];
        this.largeElementSize = this.getElementSizeForFrameSize(largeFrame, numberOfRange);
        this.smallElementSize = this.getElementSizeForFrameSize(smallFrame, numberOfRange);
        var largeFrameRowsNumber = Math.round(largeFrame / this.largeElementSize);
        var possiblePositions = CommonMath.getNumberArr(largeFrameRowsNumber * largeFrameRowsNumber, 1);

        for (var i = 0; i < this.number; i++) {
          var position = (possiblePositions.splice(Math.floor(Math.random() * possiblePositions.length), 1))[0];
          var largeTop = Math.floor(this.largeElementSize * Math.floor(position / largeFrameRowsNumber));
          var largeLeft = Math.floor(this.largeElementSize * (position % largeFrameRowsNumber));

          var smallTop = Math.floor(this.smallElementSize * Math.floor(position / largeFrameRowsNumber));
          var smallLeft = Math.floor(this.smallElementSize * (position % largeFrameRowsNumber));

          this.listOfPositions.push(new ObjectPosition(largeTop, largeLeft, smallTop, smallLeft));
        }
      }
      return this.listOfPositions;
    }


  }

  export class ObjectPosition {
    constructor(public largePositionTop: number,
      public largePositionLeft: number,
      public smallPositionTop: number,
      public smallPositionLeft: number) {
    }

    getLargePosition():Object {
      return {top: this.largePositionTop+'px', left: this.largePositionLeft+'px'};
    }

    getSmallPosition():Object {
      return {top: this.smallPositionTop+'px', left: this.smallPositionLeft+'px'};
    }
  }

  export class CommonMath {
    static findNextSqrt(x: number): number {
      if (Math.sqrt(x) % 1 > 0) {
        return this.findNextSqrt(x + 1);
      } else {
        return x;
      }
    }


    static getNumberArr(upperLimit: number, repeatCount: number) {
      var numberArr: Array<number> = [];
      var counter = 0;
      while (numberArr.length < (repeatCount * upperLimit)) {
        numberArr.push((counter++ % upperLimit));
      }
      return numberArr;
    }
  }
}
