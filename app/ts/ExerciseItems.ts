/// <reference path="./_all.ts" />

module exercises {

  export interface IExercise1 {
    numberOfElements: number;
    numberOfRange: number;
    subexerciseListDTO: Exercise1Item[];
  }

  export interface IExercise2 {
    numberOfElements: number;
    numberOfRange: number;
    subexerciseListDTO: Exercise2Item[];
  }


  export class Exercise1Item {
    public givenNumber: number;
    public listOfPositions: ObjectPosition[];
    public largeElementSize: number;
    public smallElementSize: number;
    public static id: number = 0;
    public itemId: number;

    constructor(public number: number) {
      this.itemId = Exercise1Item.id++;
    }

    getElementSizeForFrameSize(size: number, numberOfRange: number) {
      var frameArea = size * size;
      var limitCorrection = CommonMath.findNextSqrt(numberOfRange);
      return Math.sqrt(Math.floor(frameArea / limitCorrection));
    }

    getListOfPositions(numberOfRange: number, largeFrame: number, smallFrame: number, targetNumber: number): ObjectPosition[] {
      if (angular.isUndefined(this.listOfPositions)) {
        this.listOfPositions = [];
        this.largeElementSize = this.getElementSizeForFrameSize(largeFrame, numberOfRange);
        this.smallElementSize = this.getElementSizeForFrameSize(smallFrame, numberOfRange);
        var largeFrameRowsNumber = Math.round(largeFrame / this.largeElementSize);
        var possiblePositions = CommonMath.getNumberArr(largeFrameRowsNumber * largeFrameRowsNumber, 1);

        for (var i = 0; i < targetNumber; i++) {
          var position = (possiblePositions.splice(Math.floor(Math.random() * possiblePositions.length), 1))[0];
          var largeTop = Math.floor(this.largeElementSize * Math.floor(position / largeFrameRowsNumber));
          var largeLeft = Math.floor(this.largeElementSize * (position % largeFrameRowsNumber));

          var smallTop = Math.floor(this.smallElementSize * Math.floor(position / largeFrameRowsNumber));
          var smallLeft = Math.floor(this.smallElementSize * (position % largeFrameRowsNumber));

          var objectPosition: ObjectPosition = new ObjectPosition(largeTop, largeLeft, smallTop, smallLeft);
          objectPosition.parentId = this.itemId;
          this.listOfPositions.push(objectPosition);
        }
      }
      return this.listOfPositions;
    }


  }

  export class Exercise2Item extends Exercise1Item {

    constructor(public number: number) {
      super(number);
    }


    addObject() {
      for (var i = 0; i < this.listOfPositions.length; i++) {
        if (this.listOfPositions[i].isDisplayed == false) {
          this.listOfPositions[i].isDisplayed = true;
          return;
        }
      }
    }
  }

  export class ObjectPosition {
    public isDisplayed: boolean;
    public isDropped: boolean;
    public isDisabled:boolean;
    public objectId: number;
    public parentId: number;
    public static id: number = 0;

    constructor(public largePositionTop: number,
      public largePositionLeft: number,
      public smallPositionTop: number,
      public smallPositionLeft: number
      ) {
      this.isDisplayed = false;
      this.objectId = ObjectPosition.id++;
      this.isDropped = false;
      this.isDisabled = false;
    }

    getInitPlace(): Object {
      if (this.isDropped) {
        return {
          top: this.largePositionTop,
          left: this.largePositionLeft,
        }
      } else {
        return {
          top: '230px',
          left: '-200px',
          height: '120px',
          'z-index': '99'
        };
      }
    }

    getLargePosition(): Object {
      return { top: this.largePositionTop + 'px', left: this.largePositionLeft + 'px' };
    }

    setLargePosition(top:number, left:number) {
      this.largePositionTop = top;
      this.largePositionLeft = left ;
    }

    getSmallPosition(): Object {
      return { top: this.smallPositionTop + 'px', left: this.smallPositionLeft + 'px' };
    }

    setSmallPosition(top:number, left:number) {
      this.smallPositionTop = top;
      this.smallPositionLeft = left ;
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
