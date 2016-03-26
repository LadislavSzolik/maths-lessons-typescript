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

  export interface IExercise7 {
    subexerciseListDTO: Exercise7Item[];
  }

  export interface IExercise8 {
    subexerciseListDTO: Exercise8Item[];
  }

  export interface IPlusMinusExercise1 {
    subexerciseListDTO: PlusMinusExercise1Item[];
  }

  export interface IPlusMinusExercise2 {
    subexerciseListDTO: PlusMinusExercise2Item[];
  }

  export interface IPlusMinusExercise3 {
    subexerciseListDTO: PlusMinusExercise3Item[];
  }

  export interface IPlusMinusExercise4 {
    subexerciseListDTO: PlusMinusExercise4Item[];
  }
  export interface IPlusMinusExercise5 {
    subexerciseListDTO: PlusMinusExercise5Item[];
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
  // --------------------------------------------------------EXE 3-----------------------------------------------------------------------
  export class Bubble {
    public isMissing: boolean = false;
    public positionIndex: number = 0;

    public positions: any = [
      { top: '359px', left: '39px' },  //1
      { top: '301px', left: '179px' }, //2
      { top: '300px', left: '322px' }, //3
      { top: '207px', left: '438px' }, //4
      { top: '122px', left: '581px' }, //5
      { top: '18px', left: '468px' },  //6
      { top: '84px', left: '312px' },  //7
      { top: '15px', left: '176px' },  //8
      { top: '105px', left: '51px' }];//9

    public smallPositions: any = [
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

    constructor(public value: number) {
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
      var positionIndex: number = 0;
      for (var i: number = startFrom; i < startFrom + this.maxNumber; i++) {
        var bubble = new Bubble(i);
        if (this.missingNumbers.indexOf(bubble.value, 0) > -1) {
          bubble.isMissing = true;
        }
        bubble.positionIndex = positionIndex;
        this.listOfGiven.push(bubble);
        this.listOfEmpty.push({});
        positionIndex++
      }

      for (var i = 0; i < this.missingNumbers.length; i++) {
        this.listOfMissing.push(new Bubble(this.missingNumbers[i]));
      }
    }

    isCorrect(index: number) {
      if (this.listOfEmpty[index].value == this.listOfGiven[index].value) {
        return true;
      } else {
        return false;
      }
    }
  }
  // --------------------------------------------------------EXE 4-----------------------------------------------------------------------
  export class NumberSquare {
    public isMissing: boolean = false;
    public positionIndex: number = 0;
    public isBlocked: boolean = false;
    public positions: Object[] = [
      { top: '295px', left: '26px' },  //1
      { top: '295px', left: '137px' }, //2
      { top: '186px', left: '137px' }, //3
      { top: '76px', left: '137px' }, //4
      { top: '76px', left: '242px' }, //5
      { top: '76px', left: '346px' },  //6
      { top: '76px', left: '450px' },  //7
      { top: '186px', left: '450px' },  //8
      { top: '295px', left: '450px' },  //9
      { top: '295px', left: '560px' }]; //10

    public smallPositions: Object[] = [
      { top: '67px', left: '8px' },  //1
      { top: '67px', left: '32px' }, //2
      { top: '43px', left: '32px' }, //3
      { top: '19px', left: '32px' }, //4
      { top: '19px', left: '55px' }, //5
      { top: '19px', left: '78px' },  //6
      { top: '19px', left: '101px' },  //7
      { top: '43px', left: '101px' },  //8
      { top: '67px', left: '101px' },  //9
      { top: '67px', left: '126px' }]; //10

    constructor(public value: number) {
    }

    getPosition() {
      return this.positions[this.positionIndex];
    }

    getSmallPosition() {
      return this.smallPositions[this.positionIndex];
    }
  }

  export class Exercise4Item {
    public static id: number = 0;
    public itemId: number;
    public maxNumber: number = 10;
    public listOfGiven: Bubble[] = [];
    public listOfEmpty: any[] = [];
    public listOfMissing: NumberSquare[] = [];

    constructor(public startFrom: number, public missingNumbers: number[], public blockedNumbers: number[]) {
      this.itemId = Exercise4Item.id++;
      var positionIndex: number = 0;
      for (var i: number = startFrom; i < startFrom + this.maxNumber; i++) {
        var square = new NumberSquare(i);
        if (this.missingNumbers.indexOf(square.value, 0) > -1) {
          square.isMissing = true;
        }
        if (this.blockedNumbers.indexOf(square.value, 0) > -1) {
          square.isBlocked = true;
        }
        square.positionIndex = positionIndex;
        this.listOfGiven.push(square);
        this.listOfEmpty.push({});
        positionIndex++
      }

      for (var i = 0; i < this.missingNumbers.length; i++) {
        this.listOfMissing.push(new NumberSquare(missingNumbers[i]));
      }
    }

    isCorrect(index: number) {
      if (this.listOfEmpty[index].value == this.listOfGiven[index].value) {
        return true;
      } else {
        return false;
      }
    }

  }

  // --------------------------------------------------------EXE 5-----------------------------------------------------------------------
  export class SquareObject {
    constructor(public value: number) {
    }
  }

  export class Column {
    public listOfDropped: SquareObject[];
    public styles: any = ['column-one', 'column-two', 'column-three', 'column-four', 'column-five'];

    constructor(public expectedNumber: number) {
      this.listOfDropped = [];

    }

    isCorrect() {
      if (this.listOfDropped.length == 0) {
        return false;
      }
      return this.listOfDropped[this.listOfDropped.length - 1].value == this.expectedNumber;
    }

  }
  export class Exercise5Item {
    public static id: number = 0;
    public itemId: number;
    public listOfUnarrangedNumbers: SquareObject[];
    public listOfArrangedNumbers: any[];
    public correctAnswers: SquareObject[];

    constructor(public unarrangedNumbers: number[], public arrangedNumbers: number[]) {
      this.listOfUnarrangedNumbers = [];
      this.listOfArrangedNumbers = [];
      this.correctAnswers = [];

      for (var i: number = 0; i < unarrangedNumbers.length; i++) {
        this.listOfUnarrangedNumbers.push(new SquareObject(unarrangedNumbers[i]));
      }

      for (var i: number = 0; i < arrangedNumbers.length; i++) {
        this.listOfArrangedNumbers.push({});
      }

      for (var i: number = 0; i < arrangedNumbers.length; i++) {
        this.correctAnswers.push(new SquareObject(arrangedNumbers[i]));
      }

    }

    isCorrect(index: number) {
      if (this.correctAnswers[index].value == this.listOfArrangedNumbers[index].value) {
        return true;
      } else {
        return false;
      }
    }

  }

  // --------------------------------------------------------EXE 6-----------------------------------------------------------------------

  export class Exercise6Item {
    constructor(public numberOne: number, public numberTwo: number, public resultSign: string) {
    }
  }

  export class ComparatorSign {
    constructor(public value: string) {
    }
  }

  // --------------------------------------------------------EXE 7-----------------------------------------------------------------------
  export class Exercise7Item {
    public givenNumbers: DoubleObject[] = [];

    constructor(public numbersToDouble: number[]) {
      for (var i = 0; i < this.numbersToDouble.length; i++) {
        this.givenNumbers.push(new DoubleObject(this.numbersToDouble[i]));
      }
    }
  }

  export class DoubleObject {
    public enteredDouble: number;
    public correctDouble: number;

    constructor(public toBeDoubled: number) {
      this.correctDouble = toBeDoubled + toBeDoubled;
    }

    isCorrect() {
      if (this.enteredDouble == this.correctDouble) {
        return true;
      } else {
        return false;
      }
    }
  }

  // --------------------------------------------------------EXE 8-----------------------------------------------------------------------

  export class Exercise8Item {
    public givenNumbers: SplitObject[] = [];

    constructor(public numbersToSplit: number[]) {
      for (var i = 0; i < this.numbersToSplit.length; i++) {
        this.givenNumbers.push(new SplitObject(this.numbersToSplit[i]));
      }
    }
  }

  export class SplitObject {
    public enteredFirstSplit: number;
    public enteredSecondSplit: number;
    public expectedSplit: number;

    constructor(public toBeSplit: number) {
      this.expectedSplit = this.toBeSplit / 2;
    }

    isCorrect() {
      if (this.enteredFirstSplit == this.expectedSplit && this.enteredSecondSplit == this.expectedSplit) return true;
      return false;
    }
  }
  // --------------------------------------------------------PM_EXE_1-----------------------------------------------------------------------
  export class PlusMinusExercise1Item {
    public sumOfTwoNumbers: number;
    public numberOnePoints: any[] = [{ top: '72.5px', left: '72.5px' }];
    public numberTwoPoints: any[] = [{ top: '19px', left: '19px' }, { top: '126px', left: '126px' }];
    public numberThreePoints: any[] = [{ top: '19px', left: '19px' }, { top: '72.5px', left: '72.5px' }, {
      top: '126px',
      left: '126px'
    }];
    public numberFourPoints: any[] = [{ top: '19px', left: '19px' }, { top: '126px', left: '19px' }, {
      top: '126px',
      left: '126px'
    }, { top: '19px', left: '126px' }];
    public numberFivePoints: any[] = [{ top: '19px', left: '19px' }, { top: '126px', left: '19px' }, {
      top: '126px',
      left: '126px'
    }, { top: '19px', left: '126px' }, { top: '72.5px', left: '72.5px' }];
    public numberSixPoints: any[] = [{ top: '19px', left: '19px' }, { top: '126px', left: '19px' }, {
      top: '126px',
      left: '126px'
    }, { top: '19px', left: '126px' }, { top: '72.5px', left: '19px' }, { top: '72.5px', left: '126px' }];

    public numberPointsForAllNumber: any[] = [this.numberOnePoints, this.numberTwoPoints, this.numberThreePoints, this.numberFourPoints, this.numberFivePoints, this.numberSixPoints];

    public numberOneSmallPoints: any[] = [{ top: '25.5px', left: '25.5px' }];
    public numberTwoSmallPoints: any[] = [{ top: '6.7px', left: '6.7px' }, { top: '44.3px', left: '44.3px' }];
    public numberThreeSmallPoints: any[] = [{ top: '6.7px', left: '6.7px' }, { top: '25.5px', left: '25.5px' }, {
      top: '44.3px',
      left: '44.3px'
    }];
    public numberFourSmallPoints: any[] = [{ top: '6.7px', left: '6.7px' }, { top: '44.3px', left: '6.7px' }, {
      top: '44.3px',
      left: '44.3px'
    }, { top: '6.7px', left: '44.3px' }];
    public numberFiveSmallPoints: any[] = [{ top: '6.7px', left: '6.7px' }, { top: '44.3px', left: '6.7px' }, {
      top: '44.3px',
      left: '44.3px'
    }, { top: '6.7px', left: '44.3px' }, { top: '25.5px', left: '25.5px' }];
    public numberSixSmallPoints: any[] = [{ top: '6.7px', left: '6.7px' }, { top: '44.3px', left: '6.7px' }, {
      top: '44.3px',
      left: '44.3px'
    }, { top: '6.7px', left: '44.3px' }, { top: '25.5px', left: '6.7px' }, { top: '25.5px', left: '44.3px' }];

    public numberSmallPointsForAllNumber: any[] = [this.numberOneSmallPoints, this.numberTwoSmallPoints, this.numberThreeSmallPoints, this.numberFourSmallPoints, this.numberFiveSmallPoints, this.numberSixSmallPoints];

    public enteredFormula: string = "";

    constructor(public firstNumberToSum: number, public secondNumberToSum: number) {
      this.sumOfTwoNumbers = this.firstNumberToSum + this.secondNumberToSum;
    }

    getPointsForSquare(squeryIdentifier: number) {
      if (squeryIdentifier == 1) {
        return this.numberPointsForAllNumber[this.firstNumberToSum - 1];
      } else if (squeryIdentifier == 2) {
        return this.numberPointsForAllNumber[this.secondNumberToSum - 1];
      }
    }

    getSmallPointsForSquare(squeryIdentifier: number) {
      if (squeryIdentifier == 1) {
        return this.numberSmallPointsForAllNumber[this.firstNumberToSum - 1];
      } else if (squeryIdentifier == 2) {
        return this.numberSmallPointsForAllNumber[this.secondNumberToSum - 1];
      }
    }

    isCorrect() {
      if (angular.isUndefined(this.enteredFormula)) return false;

      var formulaTrimmed: string = this.enteredFormula.replace(/\s/g, "");
      if (formulaTrimmed == this.firstNumberToSum + "+" + this.secondNumberToSum + "=" + this.sumOfTwoNumbers) return true;
      return false
    }

    changeEnteredFormula(incomingFormula: string) {
      var givenEnteredFormula: string = this.enteredFormula;
      if (angular.isUndefined(givenEnteredFormula) || givenEnteredFormula == null) {
        givenEnteredFormula = incomingFormula;
      } else if (incomingFormula == "=" || incomingFormula == "+") {
        givenEnteredFormula = givenEnteredFormula + " " + incomingFormula + " ";
      } else if (incomingFormula == "del") {
        givenEnteredFormula = "";
      } else {
        givenEnteredFormula = givenEnteredFormula + incomingFormula;
      }

      this.enteredFormula = givenEnteredFormula;
    }
  }

  // --------------------------------------------------------PM_EXE_2-----------------------------------------------------------------------
  export class PlusMinusExercise2Item {
    public equationForSum: string;
    public enteredNumber: number;
    public sumOfTwoNumbers: number;

    constructor(public firstNumberToSum: number, public secondNumberToSum: number) {
      this.equationForSum = this.firstNumberToSum + " + " + this.secondNumberToSum + " = ";
      this.sumOfTwoNumbers = this.firstNumberToSum + this.secondNumberToSum;
    }

    isCorrect() {
      if (angular.isDefined(this.enteredNumber) && this.enteredNumber == (this.sumOfTwoNumbers)) {
        return true;
      }
      return false;
    }
  }
  // --------------------------------------------------------PM_EXE_3-----------------------------------------------------------------------
  export class PlusMinusExercise3Item {
    public enteredFormula: string = "";
    public difference: number;
    public flowers: Flower[] = [];
    public wholes: Whole[] = [];
    public randomNumberGenerator: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    constructor(public minuend: number, public subtrahend: number) {
      this.difference = this.minuend - this.subtrahend;
      this.generateFlowerPositionKeys();
      this.generateWholesPositionKeys();

    }

    generateFlowerPositionKeys() {
      for (var i = 0; i < this.difference; i++) {
        var randomIndex: number = (this.randomNumberGenerator.splice(Math.floor(Math.random() * this.randomNumberGenerator.length), 1))[0]
        this.flowers.push(new Flower(randomIndex));
      }
    }

    generateWholesPositionKeys() {
      for (var i = 0; i < this.subtrahend; i++) {
        var randomIndex: number = (this.randomNumberGenerator.splice(Math.floor(Math.random() * this.randomNumberGenerator.length), 1))[0]
        this.wholes.push(new Whole(randomIndex));
      }
    }

    isCorrect() {
      if (angular.isUndefined(this.enteredFormula)) return false;

      var formulaTrimmed: string = this.enteredFormula.replace(/\s/g, "");
      if (formulaTrimmed == this.minuend + "-" + this.subtrahend + "=" + this.difference) return true;
      return false
    }

    changeEnteredFormula(incomingFormula: string) {
      var givenEnteredFormula: string = this.enteredFormula;
      if (angular.isUndefined(givenEnteredFormula) || givenEnteredFormula == null) {
        givenEnteredFormula = incomingFormula;
      } else if (incomingFormula == "=" || incomingFormula == "-") {
        givenEnteredFormula = givenEnteredFormula + " " + incomingFormula + " ";
      } else if (incomingFormula == "del") {
        givenEnteredFormula = "";
      } else {
        givenEnteredFormula = givenEnteredFormula + incomingFormula;
      }

      this.enteredFormula = givenEnteredFormula;
    }
  }
  export class Flower {
    public largePositions: any[] = [
      { top: '7px', left: '14px' }, { top: '90px', left: '14px' }, { top: '173px', left: '14px' },
      { top: '7px', left: '121px' }, { top: '90px', left: '121px' }, { top: '173px', left: '121px' },
      { top: '7px', left: '229px' }, { top: '90px', left: '229px' }, { top: '173px', left: '229px' },
      { top: '7px', left: '336px' }, { top: '90px', left: '336px' }, { top: '173px', left: '336px' }];

    public smallPositions: any[] = [
      { top: '2px', left: '9px' }, { top: '22px', left: '9px' }, { top: '43px', left: '9px' },
      { top: '2px', left: '35px' }, { top: '22px', left: '35px' }, { top: '43px', left: '35px' },
      { top: '2px', left: '62px' }, { top: '22px', left: '62px' }, { top: '43px', left: '62px' },
      { top: '2px', left: '88px' }, { top: '22px', left: '88px' }, { top: '43px', left: '88px' }];

    constructor(public keyToPosition: number) {
    }

    getLargePosition() {
      return this.largePositions[this.keyToPosition];
    }

    getSmallPosition() {
      return this.smallPositions[this.keyToPosition];
    }
  }
  export class Whole {
    public largePositions: any[] = [
      { top: '58px', left: '19px' }, { top: '141px', left: '19px' }, { top: '219px', left: '19px' },
      { top: '58px', left: '121px' }, { top: '141px', left: '121px' }, { top: '219px', left: '121px' },
      { top: '58px', left: '229px' }, { top: '141px', left: '229px' }, { top: '219px', left: '229px' },
      { top: '58px', left: '336px' }, { top: '141px', left: '336px' }, { top: '219px', left: '336px' }];

    public smallPositions: any[] = [
      { top: '13px', left: '10px' }, { top: '35px', left: '10px' }, { top: '55px', left: '10px' },
      { top: '13px', left: '35px' }, { top: '35px', left: '35px' }, { top: '55px', left: '35px' },
      { top: '13px', left: '62px' }, { top: '35px', left: '62px' }, { top: '55px', left: '62px' },
      { top: '13px', left: '88px' }, { top: '35px', left: '88px' }, { top: '55px', left: '88px' }];

    constructor(public keyToPosition: number) {
    }

    getLargePosition() {
      return this.largePositions[this.keyToPosition];
    }
    getSmallPosition() {
      return this.smallPositions[this.keyToPosition];
    }
  }
  // --------------------------------------------------------PM_EXE_4-----------------------------------------------------------------------
  export class PlusMinusExercise4Item {
    public equationForSub: string;
    public enteredNumber: number;
    public difference: number;

    constructor(public minuend: number, public subtrahend: number) {
      this.equationForSub = this.minuend + " - " + this.subtrahend + " = ";
      this.difference = this.minuend - this.subtrahend;
    }

    isCorrect() {
      if (angular.isDefined(this.enteredNumber) && this.enteredNumber == (this.difference)) {
        return true;
      }
      return false;
    }
  }

// --------------------------------------------------------PM_EXE_5-----------------------------------------------------------------------
  export class PlusMinusExercise5Item {
    public difference: number;
    public enteredNumber: number;
    public maxNumberInRow:number = 5;

    public randomNumbersForMinuend:number[] = [];
    public randomNumbersForSubtrahend:number[] = [];

    public largeMinuendCssPositions:any[] = [];
    public largeSubtrahendCssPositions:any[] = [];

    constructor(public minuend: number, public subtrahend: number) {
      this.difference = this.minuend - this.subtrahend;
      this.generateRandomPostionsForMinuend();
      this.createLargeMinuendCSSPositions();

      this.generateRandomPostionsForSubtrahend();
      this.createLargeSubtrahendCSSPositions();
    }

    generateRandomPostionsForMinuend(){
      var numberSeq = this.getNumberSequences();
      for(var j=0; j<this.minuend; j++ ){
          var randomIndex: number = (numberSeq.splice(Math.floor(Math.random() * numberSeq.length), 1))[0]
          this.randomNumbersForMinuend.push(randomIndex);
      }
    }

    generateRandomPostionsForSubtrahend(){
      var numberSeq = this.getNumberSequences();
      for(var j=0; j<this.subtrahend; j++ ){
          var randomIndex: number = (numberSeq.splice(Math.floor(Math.random() * numberSeq.length), 1))[0]
          this.randomNumbersForSubtrahend.push(randomIndex);
      }
    }

    getNumberSequences() {
      var numberSeq:number[] = [];
      for(var i=0;i<25;i++) {
        numberSeq.push(i);
      }
      return numberSeq;
    }

    createLargeMinuendCSSPositions() {
      for(var i=0; i<this.randomNumbersForMinuend.length;i++){
        var randomPoint = this.randomNumbersForMinuend[i];
        var rowNumber:number = this.getRowNumber(randomPoint);
        var topPixels: number = this.calculateTopPxForRow(rowNumber);
        var columnNumber: number = this.getColumnNumber(randomPoint);
        var leftPixels:number = this.calculateLeftPxForColumn(columnNumber);
        var styleObject:any = {top:topPixels+'px',left:leftPixels+'px'}
        this.largeMinuendCssPositions.push(styleObject);
      }
    }

    createLargeSubtrahendCSSPositions() {
      for(var i=0; i<this.randomNumbersForSubtrahend.length;i++){
        var randomPoint = this.randomNumbersForSubtrahend[i];
        var rowNumber:number = this.getRowNumber(randomPoint);
        var topPixels: number = this.calculateTopPxForRow(rowNumber);
        var columnNumber: number = this.getColumnNumber(randomPoint);
        var leftPixels:number = this.calculateLeftPxForColumn(columnNumber);
        var styleObject:any = {top:topPixels+'px',left:leftPixels+'px'}
        this.largeSubtrahendCssPositions.push(styleObject);
      }
    }

    calculateTopPxForRow(rowNumber:number){
      return (rowNumber*25) + (rowNumber*27) + 17;
    }

    calculateLeftPxForColumn(columnNumber:number){
      return (columnNumber*25) + (columnNumber*24) + 18;
    }

    getRowNumber(inputNumber:number) {
      var result:any = inputNumber/this.maxNumberInRow;
      return parseInt(result);
    }

    getColumnNumber(inputNumber:number) {
      var mod = inputNumber%this.maxNumberInRow;
      if(mod == 0) {
        return 4;
      }
      return mod -1;

    }

    changeEnteredNumber(incomingNumber: number) {
      var currentNumber: number = this.enteredNumber;
      if (angular.isUndefined(currentNumber) || currentNumber == null) {
        currentNumber = incomingNumber;
      } else if (currentNumber.toString().length < 2) {
        currentNumber = parseInt(String(currentNumber) + String(incomingNumber));
      }
      this.enteredNumber = currentNumber;
    }

    deleteEnteredNumber(){
      this.enteredNumber = null;
    }

    isCorrect() {
      if (angular.isUndefined(this.enteredNumber)) return false;

      if (this.enteredNumber == this.difference) return true;
      return false
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
      public smallPositionLeft: number) {
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
