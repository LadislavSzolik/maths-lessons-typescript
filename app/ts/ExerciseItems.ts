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

  export interface IExercise3 {
    subexerciseListDTO: Exercise3Item[];
  }

  export interface IExercise4 {
    subexerciseListDTO: Exercise4Item[];
  }

  export interface IExercise5 {
    subexerciseListDTO: Exercise5Item[];
  }

  export interface IExercise6 {
    subexerciseListDTO: Exercise6Item[];
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
// --------------------------------------------------------EXE 4-----------------------------------------------------------------------


  export class Bubble {
    public isMissing:boolean = false;
    public positionIndex:number=0;

    public positions:any = [
      { top: '359px', left: '39px' },  //1
      { top: '301px', left: '179px' }, //2
      { top: '300px', left: '322px' }, //3
      { top: '207px', left: '438px' }, //4
      { top: '122px', left: '581px' }, //5
      { top: '18px', left: '468px' },  //6
      { top: '84px', left: '312px' },  //7
      { top: '15px', left: '176px' },  //8
      { top: '105px', left: '51px' }];//9

    public smallPositions:any = [
      { top: '74px', left: '8px' },
      { top: '60px', left: '37px' },
      { top: '65px', left: '68px' },
      { top: '43px', left: '93px' },
      { top: '25px', left: '123px' },
      { top: '3px', left: '98px' },
      { top: '17px', left: '66px' },
      { top: '3px', left: '37px' },
      { top: '21px', left: '11px' },
    ];
    constructor(public value:number) {
    }

    getPosition() {
      return this.positions[this.positionIndex];
    }

    getSmallPosition() {
      return this.smallPositions[this.positionIndex];
    }

  }

  export class Exercise3Item {
    public static id: number = 0;
    public itemId: number;
    public listOfGiven: Bubble[] = [];
    public listOfEmpty: any[] = [];
    public listOfMissing: Bubble[] = [];
    public maxNumber: number = 9;

    constructor(public startFrom: number, public missingNumbers: number[]) {
      this.itemId = Exercise3Item.id++;
      var positionIndex:number = 0;
      for (var i: number = startFrom; i < startFrom + this.maxNumber; i++) {
        var bubble = new Bubble(i);
        if(this.missingNumbers.indexOf(bubble.value, 0) > -1) {
          bubble.isMissing = true;
        }
        bubble.positionIndex = positionIndex;
        this.listOfGiven.push(bubble);
        this.listOfEmpty.push({});
        positionIndex++
      }

      for(var i=0;i<this.missingNumbers.length;i++){
        this.listOfMissing.push(new Bubble(this.missingNumbers[i]));
      }
    }
    isCorrect(index:number) {
      if(this.listOfEmpty[index].value == this.listOfGiven[index].value ) {
        return true;
      }else {
        return false;
      }

    }
  }
// --------------------------------------------------------EXE 4-----------------------------------------------------------------------
export class NumberCube {
  public listOfDroppedNumbers: NumberCube[];
  public position: Object;

  constructor(public value: number) {
    this.listOfDroppedNumbers = [];

  }

  isCorrect() {
    if (this.listOfDroppedNumbers.length == 0) {
      return false;
    }
    return this.listOfDroppedNumbers[this.listOfDroppedNumbers.length - 1].value == this.value;
  }
}

  export class Exercise4Item {
    public static id: number = 0;
    public itemId: number;


    public maxNumber: number = 10;

    public listOfGivenNumbers: NumberCube[];
    public listOfMissingNumbers: NumberCube[];
    public numberOnStart: NumberCube;
    public listOfBlockedNumbers: NumberCube[];

    public positionInit: Object[] = [
      { top: '64px', left: '288px' },  //1
      { top: '163px', left: '228px' }, //2
      { top: '163px', left: '347px' }, //3
      { top: '262px', left: '171px' }, //4
      { top: '262px', left: '296px' }, //5
      { top: '262px', left: '420px' },  //6
      { top: '358px', left: '112px' },  //7
      { top: '358px', left: '235px' },  //8
      { top: '358px', left: '358px' },  //9
      { top: '358px', left: '481px' }]; //10


    public positionForNumber: Object;

    public smallPositionInit: Object[] = [
      { top: '6px', left: '64px' },  //1
      { top: '31px', left: '49px' }, //2
      { top: '31px', left: '78px' }, //3
      { top: '55px', left: '35px' }, //4
      { top: '55px', left: '66px' }, //5
      { top: '55px', left: '97px' },  //6
      { top: '79px', left: '20px' },  //7
      { top: '79px', left: '50px' },  //8
      { top: '79px', left: '81px' },  //9
      { top: '79px', left: '112px' }]; //10

    public smallPositionForNumber: Object;


    constructor(public startFrom: number, public missingNumbers: number[], public blockedNumbers: number[]) {

      this.itemId = Exercise4Item.id++;
      this.listOfGivenNumbers = [];
      this.listOfMissingNumbers = [];
      this.numberOnStart = new NumberCube(0);
      this.listOfBlockedNumbers = [];
      this.positionForNumber = {};
      this.smallPositionForNumber = {};

      for (var i: number = startFrom; i < startFrom + this.maxNumber; i++) {
        if (missingNumbers.indexOf(i) == -1 && blockedNumbers.indexOf(i) == -1) {
          this.listOfGivenNumbers.push(new NumberCube(i));
        }
        this.positionForNumber[i] = this.positionInit.shift();
        this.smallPositionForNumber[i] = this.smallPositionInit.shift();
      }

      for (var i: number = 0; i < missingNumbers.length; i++) {
        this.listOfMissingNumbers.push(new NumberCube(missingNumbers[i]));
        this.numberOnStart.listOfDroppedNumbers.push(new NumberCube(missingNumbers[i]));
      }

      for (var i: number = 0; i < blockedNumbers.length; i++) {
        this.listOfBlockedNumbers.push(new NumberCube(blockedNumbers[i]));
      }

    }

  }

// --------------------------------------------------------EXE 5-----------------------------------------------------------------------
  export class SquareObject {
    constructor(public value:number) {
    }
  }

  export class Column {
    public listOfDropped:SquareObject[];
    public styles:any = ['column-one', 'column-two', 'column-three','column-four','column-five'];

    constructor(public expectedNumber:number){
      this.listOfDropped = [];

    }

    isCorrect(){
      if (this.listOfDropped.length == 0) {
        return false;
      }
      return this.listOfDropped[this.listOfDropped.length - 1].value == this.expectedNumber;
      }

  }
  export class Exercise5Item {
    public static id: number = 0;
    public itemId: number;
    public listOfUnarrangedNumbers:SquareObject[];
    public listOfArrangedNumbers:any[];
    public correctAnswers:SquareObject[];

    constructor(public unarrangedNumbers:number[], public arrangedNumbers: number[]) {
      this.listOfUnarrangedNumbers = [];
      this.listOfArrangedNumbers = [];
      this.correctAnswers = [];

      for(var i:number = 0; i< unarrangedNumbers.length; i++){
        this.listOfUnarrangedNumbers.push(new SquareObject(unarrangedNumbers[i]));
      }

      for(var i:number = 0; i< arrangedNumbers.length; i++){
        this.listOfArrangedNumbers.push({});
      }

      for(var i:number = 0; i< arrangedNumbers.length; i++){
        this.correctAnswers.push(new SquareObject(arrangedNumbers[i]));
      }

    }

    isCorrect(index: number){
      if(this.correctAnswers[index].value == this.listOfArrangedNumbers[index].value) {
        return true;
      } else {
        return false;
      }
    }

  }

// --------------------------------------------------------EXE 6-----------------------------------------------------------------------

  export class Exercise6Item {
    constructor(public numberOne:number, public numberTwo:number, public resultSign:string ) {
    }
  }

  export class ComparatorSign {
    constructor(public value:string) {
    }
  }

// --------------------------------------------------------EXE ?-----------------------------------------------------------------------

  export class ObjectPosition {
    public isDisplayed: boolean;
    public isDropped: boolean;
    public isDisabled: boolean;
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

    setLargePosition(top: number, left: number) {
      this.largePositionTop = top;
      this.largePositionLeft = left;
    }

    getSmallPosition(): Object {
      return { top: this.smallPositionTop + 'px', left: this.smallPositionLeft + 'px' };
    }

    setSmallPosition(top: number, left: number) {
      this.smallPositionTop = top;
      this.smallPositionLeft = left;
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
