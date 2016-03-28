module exercises {

  export interface IExerciseServices {
    getMenuData(): any;
    getExercise1Data(): any;
    getExercise2Data(): any;
    getExercise3Data(): any;
    getExercise4Data(): any;
    getExercise5Data(): any;
    getExercise6Data(): any;
    getExercise7Data(): any;
    getExercise8Data(): any;
    getRandomData(choosenExercise: string): any;
    getExerciseFromJson(jsonFileName: string): any;

    getTexts(): any;
  }

  export class ExerciseServices implements IExerciseServices {
    $inject = ["$http"];

    constructor(public $http: ng.IHttpService) {
    }

    getMenuData() {
      return this.$http.get('app/data/menuData.json').then((result) => { return result.data });
    }

    getExercise1Data() {
      return this.$http.get('app/data/exe1Data.json').then((result) => { return result.data });
    }

    getExercise2Data() {
      return this.$http.get('app/data/exe2Data.json').then((result) => { return result.data });
    }

    getExercise3Data() {
      return this.$http.get('app/data/exe3Data.json').then((result) => { return result.data });
    }

    getExercise4Data() {
      return this.$http.get('app/data/exe4Data.json').then((result) => { return result.data });
    }

    getExercise5Data() {
      return this.$http.get('app/data/exe5Data.json').then((result) => { return result.data });
    }

    getExercise6Data() {
      return this.$http.get('app/data/exe6Data.json').then((result) => { return result.data });
    }

    getExercise7Data() {
      return this.$http.get('app/data/exe7Data.json').then((result) => { return result.data });
    }

    getExercise8Data() {
      return this.$http.get('app/data/exe8Data.json').then((result) => { return result.data });
    }

    getExerciseFromJson(jsonFileName: string) {
      return this.$http.get(`app/data/${jsonFileName}.json`).then((result) => { return result.data });
    }

    getTexts() {
      return this.$http.get('app/data/appTexts.json').then((result) => { return result.data });
    }

    getRandomData(choosenExercise: string) {
      switch (choosenExercise) {
        case 'n-exe1':
          return this.getExe1RandomData();
        case 'n-exe2':
          return this.getExe2RandomData();
        case 'n-exe3':
          return this.getExe3RandomData();
        case 'n-exe4':
          return this.getExe4RandomData();
        case 'n-exe5':
          return this.getExe5RandomData();
        case 'n-exe6':
          return this.getExe6RandomData();
        case 'n-exe7':
          return this.getExe7RandomData();
        case 'n-exe8':
          return this.getExe8RandomData();
        case 'pm-exe1':
          return this.getPmExe1RandomData();
        case 'pm-exe2':
          return this.getPmExe2RandomData();
        case 'pm-exe3':
          return this.getPmExe3RandomData();
        case 'pm-exe4':
          return this.getPmExe4RandomData();
        case 'pm-exe5':
          return this.getPmExe5RandomData();
        case 'pm-exe6':
          return this.getPmExe6RandomData();
        case 'pm-exe7':
          return this.getPmExe7RandomData();
        case 'pm-exe8':
          return this.getPmExe8RandomData();
        case 'pm-exe9':
          return this.getPmExe9RandomData();
        case 'pm-exe10':
          return this.getPmExe10RandomData();
        default:
          return {};
      }
    }
    getExe1RandomData() {
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(3);
      randomize.createRandomArray(12, 0, 20);
      var subexerciseListDTO: Exercise1Item[] = [];
      for (var i = 0; i < randomize.randimzedArray.length; i++) {

        subexerciseListDTO.push(new Exercise1Item(randomize.randimzedArray[i]));
      }
      var exercise1Data: any = {};
      exercise1Data.subexerciseListDTO = subexerciseListDTO;
      exercise1Data.numberOfElements = 20;
      exercise1Data.numberOfRange = 20;
      return exercise1Data;
    }

    getExe2RandomData() {
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(3);
      randomize.createRandomArray(12, 0, 20);
      var subexerciseListDTO: Exercise2Item[] = [];
      for (var i = 0; i < randomize.randimzedArray.length; i++) {
        subexerciseListDTO.push(new Exercise2Item(randomize.randimzedArray[i]));
      }
      var exercise2Data: any = {};
      exercise2Data.subexerciseListDTO = subexerciseListDTO;
      exercise2Data.numberOfElements = 20;
      exercise2Data.numberOfRange = 20;
      return exercise2Data;
    }

    getExe3RandomData() {
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(3);
      randomize.createRandomArray(12, 0, 20);
      var subexerciseListDTO: Exercise3Item[] = [];
      for (var i = 0; i < randomize.randimzedArray.length; i++) {
        var startFrom: number = RandomizeDataHelper.getRandomNumber(0, 12);
        var missingNumbers: number[] = RandomizeDataHelper.getRandomNumbersWithGivenNeigbours(startFrom, 4, 9);
        subexerciseListDTO.push(new Exercise3Item(startFrom, missingNumbers));
      }
      var exercise3Data: any = {};
      exercise3Data.subexerciseListDTO = subexerciseListDTO;
      return exercise3Data;
    }

    getExe4RandomData() {
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(3);
      randomize.createRandomArray(12, 0, 20);
      var subexerciseListDTO: Exercise4Item[] = [];
      for (var i = 0; i < randomize.randimzedArray.length; i++) {
        var startFrom: number = RandomizeDataHelper.getRandomNumber(0, 12);
        var blockedNumbers: number[] = RandomizeDataHelper.getRandomNumbersWithGivenNeigbours(startFrom, 2, 10);
        var missingNumbers: number[] = RandomizeDataHelper.getRandomNumbersWithGivenNeigbours(startFrom, 5, 10, blockedNumbers);

        subexerciseListDTO.push(new Exercise4Item(startFrom, missingNumbers, blockedNumbers));
      }
      var exercise4Data: any = {};
      exercise4Data.subexerciseListDTO = subexerciseListDTO;
      return exercise4Data;
    }

    getExe5RandomData() {
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(0);
      var subexerciseListDTO: Exercise5Item[] = [];
      for (var i = 0; i < 12; i++) {
        randomize.randimzedArray = [];
        randomize.createRandomArray(5, 1, 25);
        var randomNumbeRow: number[] = randomize.randimzedArray.slice(0);
        var arrangedNumbers: number[] = randomize.randimzedArray.sort(this.compareNumbers);
        subexerciseListDTO.push(new Exercise5Item(randomNumbeRow, arrangedNumbers));
      }
      var exercise5Data: any = {};
      exercise5Data.subexerciseListDTO = subexerciseListDTO;
      return exercise5Data;
    }

    compareNumbers(a: number, b: number) {
      return a - b;
    }

    getExe6RandomData() {
      var subexerciseListDTO: Exercise6Item[] = [];

      var randomize: RandomizeDataHelper = new RandomizeDataHelper(3);
      randomize.createRandomArray(12, 0, 25);
      var firstNumbers: number[] = randomize.randimzedArray.slice(0);
      randomize.randimzedArray = [];
      randomize.createRandomArray(12, 0, 25);
      var secondNumbers: number[] = randomize.randimzedArray.slice(0);

      for (var i = 0; i < 12; i++) {
        var firstNumber = firstNumbers[i];
        var secondNumber = secondNumbers[i];
        var resultSign = "";
        if (firstNumber > secondNumber) {
          resultSign = ">";
        } else if (firstNumber < secondNumber) {
          resultSign = "<";
        } else {
          resultSign = "=";
        }

        subexerciseListDTO.push(new Exercise6Item(firstNumber, secondNumber, resultSign));
      }
      var exercise6Data: any = {};
      exercise6Data.subexerciseListDTO = subexerciseListDTO;
      return exercise6Data;
    }

    getExe7RandomData() {
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(3);
      randomize.createRandomArray(12, 1, 10);
      var subexerciseListDTO: Exercise7Item[] = [];
      subexerciseListDTO.push(new Exercise7Item(randomize.randimzedArray));
      var exercise7Data: any = {};
      exercise7Data.subexerciseListDTO = subexerciseListDTO;
      return exercise7Data;
    }


    getExe8RandomData() {
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(3);
      randomize.createRandomArrayWithEvenNumbers(12, 1, 20);
      var subexerciseListDTO: Exercise8Item[] = [];
      subexerciseListDTO.push(new Exercise8Item(randomize.randimzedArray));
      var exercise8Data: any = {};
      exercise8Data.subexerciseListDTO = subexerciseListDTO;
      return exercise8Data;
    }

    getPmExe1RandomData() {
      var subexerciseListDTO: PlusMinusExercise1Item[] = [];
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(5);
      randomize.createRandomArray(12, 0, 6);
      var firstNumbers: number[] = randomize.randimzedArray.slice(0);
      randomize.randimzedArray = [];
      randomize.createRandomArray(12, 0, 6);
      var secondNumbers: number[] = randomize.randimzedArray.slice(0);
      for (var i = 0; i < 12; i++) {
        var firstNumber = firstNumbers[i];
        var secondNumber = secondNumbers[i];
        subexerciseListDTO.push(new PlusMinusExercise1Item(firstNumber, secondNumber));
      }
      var plusMinusExe1Data: any = {};
      plusMinusExe1Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe1Data;
    }

    getPmExe2RandomData() {
      var subexerciseListDTO: PlusMinusExercise2Item[] = [];
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(5);
      randomize.createRandomArray(12, 0, 20);
      var firstNumbers: number[] = randomize.randimzedArray.slice(0);
      randomize.randimzedArray = [];
      randomize.createRandomArray(12, 0, 20);
      var secondNumbers: number[] = randomize.randimzedArray.slice(0);
      for (var i = 0; i < 12; i++) {
        var firstNumber = firstNumbers[i];
        var secondNumber = secondNumbers[i];

        var firstNumberToSum = Math.abs(firstNumber - secondNumber);
        var secondNumberToSum = 0;
        if (firstNumber >= secondNumber) {
          secondNumberToSum = secondNumber;
        } else {
          secondNumberToSum = firstNumber;
        }
        subexerciseListDTO.push(new PlusMinusExercise2Item(firstNumberToSum, secondNumberToSum));
      }
      var plusMinusExe2Data: any = {};
      plusMinusExe2Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe2Data;
    }

    getPmExe3RandomData() {
      var subexerciseListDTO: PlusMinusExercise3Item[] = [];
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(5);
      randomize.createRandomArray(12, 0, 12);
      var firstNumbers: number[] = randomize.randimzedArray.slice(0);
      randomize.randimzedArray = [];
      randomize.createRandomArray(12, 0, 12);
      var secondNumbers: number[] = randomize.randimzedArray.slice(0);
      for (var i = 0; i < 12; i++) {
        var minuend: number = 0;
        var subtrahend: number = 0;
        if (firstNumbers[i] >= secondNumbers[i]) {
          minuend = firstNumbers[i];
          subtrahend = secondNumbers[i];
        } else {
          minuend = secondNumbers[i];
          subtrahend = firstNumbers[i];
        }

        subexerciseListDTO.push(new PlusMinusExercise3Item(minuend, subtrahend));
      }
      var plusMinusExe3Data: any = {};
      plusMinusExe3Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe3Data;
    };
    getPmExe4RandomData() {
      var subexerciseListDTO: PlusMinusExercise4Item[] = [];
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(5);
      randomize.createRandomArray(12, 0, 20);
      var firstNumbers: number[] = randomize.randimzedArray.slice(0);
      randomize.randimzedArray = [];
      randomize.createRandomArray(12, 0, 20);
      var secondNumbers: number[] = randomize.randimzedArray.slice(0);
      for (var i = 0; i < 12; i++) {
        var minuend: number = 0;
        var subtrahend: number = 0;
        if (firstNumbers[i] >= secondNumbers[i]) {
          minuend = firstNumbers[i];
          subtrahend = secondNumbers[i];
        } else {
          minuend = secondNumbers[i];
          subtrahend = firstNumbers[i];
        }

        subexerciseListDTO.push(new PlusMinusExercise4Item(minuend, subtrahend));
      }
      var plusMinusExe4Data: any = {};
      plusMinusExe4Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe4Data;
    };
    getPmExe5RandomData() {
      var subexerciseListDTO: PlusMinusExercise5Item[] = [];
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(5);
      randomize.createRandomArray(12, 0, 20);
      var firstNumbers: number[] = randomize.randimzedArray.slice(0);
      randomize.randimzedArray = [];
      randomize.createRandomArray(12, 0, 20);
      var secondNumbers: number[] = randomize.randimzedArray.slice(0);
      for (var i = 0; i < 12; i++) {
        var minuend: number = 0;
        var subtrahend: number = 0;
        if (firstNumbers[i] >= secondNumbers[i]) {
          minuend = firstNumbers[i];
          subtrahend = secondNumbers[i];
        } else {
          minuend = secondNumbers[i];
          subtrahend = firstNumbers[i];
        }

        subexerciseListDTO.push(new PlusMinusExercise5Item(minuend, subtrahend));
      }
      var plusMinusExe5Data: any = {};
      plusMinusExe5Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe5Data;
    };
    getPmExe6RandomData() {
      var subexerciseListDTO: PlusMinusExercise6Item[] = [];
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(5);
      randomize.createRandomArray(12, 0, 20);
      var firstNumbers: number[] = randomize.randimzedArray.slice(0);
      randomize.randimzedArray = [];
      randomize.createRandomArray(12, 0, 20);
      var secondNumbers: number[] = randomize.randimzedArray.slice(0);
      for (var i = 0; i < 12; i++) {
        var minuend: number = 0;
        var subtrahend: number = 0;
        if (firstNumbers[i] >= secondNumbers[i]) {
          minuend = firstNumbers[i];
          subtrahend = secondNumbers[i];
        } else {
          minuend = secondNumbers[i];
          subtrahend = firstNumbers[i];
        }

        subexerciseListDTO.push(new PlusMinusExercise6Item(minuend, subtrahend));
      }
      var plusMinusExe6Data: any = {};
      plusMinusExe6Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe6Data;
    };
    getPmExe7RandomData() {
      var subexerciseListDTO: PlusMinusExercise7Item[] = [];
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(5);
      randomize.createRandomArray(12, 3, 20);
      var finalNumbers: number[] = randomize.randimzedArray.slice(0);

      for (var i = 0; i < 12; i++) {
        var numberContainer: any = RandomizeDataHelper.createThreeRandomNumbers(0, 20);
        var expectedNumbers: number[] = [];
        expectedNumbers.push(numberContainer.number1 + 2 * numberContainer.number2 + numberContainer.number3);
        expectedNumbers.push(numberContainer.number2 + numberContainer.number3);
        expectedNumbers.push(numberContainer.number1 + numberContainer.number2);
        expectedNumbers.push(numberContainer.number3);
        expectedNumbers.push(numberContainer.number2);
        expectedNumbers.push(numberContainer.number1);
        var chooseType = RandomizeDataHelper.getRandomNumber(0, 2);
        var missingNumberIndicators: boolean[] = [];
        switch (chooseType) {
          case 0: missingNumberIndicators = [false, false, false, true, true, true];
            break;
          case 1: missingNumberIndicators = [false, true, false, false, true, true];
            break;
          case 2: missingNumberIndicators = [true, true, false, false, true, false];
            break;
        }

        subexerciseListDTO.push(new PlusMinusExercise7Item(expectedNumbers, missingNumberIndicators));
      }
      var plusMinusExe7Data: any = {};
      plusMinusExe7Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe7Data;
    };
    getPmExe8RandomData() {
      var subexerciseListDTO: PlusMinusExercise8Item[] = [];
      for (var i = 0; i < 12; i++) {
        var numberObject: any = RandomizeDataHelper.createTwoRandomNumbers(0, 20);
        subexerciseListDTO.push(new PlusMinusExercise8Item(numberObject.number1, numberObject.number2));
      }
      var plusMinusExe8Data: any = {};
      plusMinusExe8Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe8Data;
    };
    getPmExe9RandomData() {
      var subexerciseListDTO: PlusMinusExercise9Item[] = [];
      var randomize: RandomizeDataHelper = new RandomizeDataHelper(5);
      randomize.createRandomArray(12, 0, 20);
      var firstNumbers: number[] = randomize.randimzedArray.slice(0);
      randomize.randimzedArray = [];
      randomize.createRandomArray(12, 0, 20);
      var secondNumbers: number[] = randomize.randimzedArray.slice(0);
      for (var i = 0; i < 12; i++) {
        var minuend: number = 0;
        var subtrahend: number = 0;
        if (firstNumbers[i] >= secondNumbers[i]) {
          minuend = firstNumbers[i];
          subtrahend = secondNumbers[i];
        } else {
          minuend = secondNumbers[i];
          subtrahend = firstNumbers[i];
        }
        subexerciseListDTO.push(new PlusMinusExercise9Item(minuend, subtrahend));
      }
      var plusMinusExe9Data: any = {};
      plusMinusExe9Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe9Data;
    };
    getPmExe10RandomData() {
      var subexerciseListDTO: PlusMinusExercise10Item[] = [];
      for (var i = 0; i < 6; i++) {
        var numberObject: any = RandomizeDataHelper.createTwoRandomNumbers(0, 20);
        subexerciseListDTO.push(new PlusMinusExercise10Item(numberObject.number1, numberObject.number2, "+"));
      }

      var randomize: RandomizeDataHelper = new RandomizeDataHelper(5);
      randomize.createRandomArray(6, 0, 20);
      var firstNumbers: number[] = randomize.randimzedArray.slice(0);
      randomize.randimzedArray = [];
      randomize.createRandomArray(6, 0, 20);
      var secondNumbers: number[] = randomize.randimzedArray.slice(0);
      for (var i = 0; i < 6; i++) {
        var minuend: number = 0;
        var subtrahend: number = 0;
        if (firstNumbers[i] >= secondNumbers[i]) {
          minuend = firstNumbers[i];
          subtrahend = secondNumbers[i];
        } else {
          minuend = secondNumbers[i];
          subtrahend = firstNumbers[i];
        }
        subexerciseListDTO.push(new PlusMinusExercise10Item(minuend, subtrahend, "-"));
      }
      var plusMinusExe10Data: any = {};
      plusMinusExe10Data.subexerciseListDTO = subexerciseListDTO;
      return plusMinusExe10Data;
    };
  }





  export class RandomizeDataHelper {

    public randimzedArray: number[] = [];

    constructor(public numberOfRepeatedElements: number) {
    }

    static createTwoRandomNumbers(min: number, max: number) {
      var found: boolean = false;
      while (!found) {
        var numberCandidate1 = RandomizeDataHelper.getRandomNumber(min, max);
        var numberCandidate2 = RandomizeDataHelper.getRandomNumber(min, max);

        if (numberCandidate1 + numberCandidate2 <= max) {
          found = true;
        }
      }
      return { number1: numberCandidate1, number2: numberCandidate2 };
    }
    static createThreeRandomNumbers(min: number, max: number) {
      var found: boolean = false;
      while (!found) {
        var numberCandidate1 = RandomizeDataHelper.getRandomNumber(min, max);
        var numberCandidate2 = RandomizeDataHelper.getRandomNumber(min, max);
        var numberCandidate3 = RandomizeDataHelper.getRandomNumber(min, max);
        if (numberCandidate1 + 2 * numberCandidate2 + numberCandidate3 <= max) {
          found = true;
        }
      }
      return { number1: numberCandidate1, number2: numberCandidate2, number3: numberCandidate3 };
    }

    createRandomArrayWithEvenNumbers(size: number, min: number, max: number) {
      var nums: number[] = [];
      this.randimzedArray = [];

      for (var element = 0; element < size; element++) {
        var temp: number = -1;
        while (temp == -1) {
          var numberCandidate = RandomizeDataHelper.getRandomNumber(min, max);
          if (numberCandidate % 2 == 0) {
            temp = this.searchNumberInArray(numberCandidate, nums);
          }

        }
        nums[element] = temp;
      }
      this.randimzedArray = nums;
    }

    createRandomArray(size: number, min: number, max: number) {
      var nums: number[] = [];

      for (var element = 0; element < size; element++) {
        var temp: number = -1;
        while (temp == -1) {
          temp = this.searchNumberInArray(RandomizeDataHelper.getRandomNumber(min, max), nums);
        }
        nums[element] = temp;
      }
      this.randimzedArray = nums;
    }

    public static getRandomNumber(min: number, max: number): any {
      return (Math.round((max - min) * Math.random() + min));
    }

    searchNumberInArray(randomNumber: number, numberArray: any[]) {
      var countOfRepeat: number = 0;
      for (var element = 0; element < numberArray.length; element++) {
        if (randomNumber == numberArray[element]) {
          countOfRepeat++;
        }
      }
      if (countOfRepeat > this.numberOfRepeatedElements) {
        return -1
      } else {
        return randomNumber;
      }
    }

    public static getRandomNumbersWithGivenNeigbours(arrayStartsFrom: number, maxMissing: number, maxCount: number, blockedNumbers?: number[]): number[] {
      var numbers: number[] = [];

      for (var i = arrayStartsFrom; i < arrayStartsFrom + maxCount; i++) {
        numbers.push(i);
      }
      var numberOfMissing: number = RandomizeDataHelper.getRandomNumber(1, maxMissing);
      var missingNumberArray: number[] = [];
      for (var i = 0; i < numberOfMissing; i++) {
        var choosenFound = false;
        var whileKiller = 0;
        while (!choosenFound) {
          whileKiller++;
          if (whileKiller > 10) {
            console.log('while killer used');
            choosenFound = true;

          }
          var choosenToBeHidden = (numbers.splice(Math.floor(Math.random() * numbers.length), 1))[0];

          if (angular.isDefined(blockedNumbers) && blockedNumbers.length > 0 && blockedNumbers.indexOf(choosenToBeHidden) == -1 || angular.isUndefined(blockedNumbers)) {
            var indexInArray = missingNumberArray.indexOf(choosenToBeHidden);
            if (indexInArray == -1) {
              var neigbourOne: number = choosenToBeHidden - 1;
              var neigbourTwo: number = choosenToBeHidden + 1;
              if (missingNumberArray.indexOf(neigbourOne, 0) < 0 && missingNumberArray.indexOf(neigbourTwo, 0) < 0) {
                missingNumberArray.push(choosenToBeHidden);
                choosenFound = true;
              }
            }
          }

        }
      }
      return missingNumberArray;
    }





  }
}
