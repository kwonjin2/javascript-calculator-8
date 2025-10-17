import { Console } from '@woowacourse/mission-utils';

class App {
  static ERROR_MESSAGES = {
    EMPTY_STRING:
      '[ERROR] 커스텀 구분자가 없습니다. //와 \\n 사이에 커스텀 구분자를 입력해주세요.',
    NUMBER_DELIMITER: '[ERROR] 커스텀 구분자를 숫자로 지정할 수 없습니다.',
    NEGATIVE_NUMBER: '[ERROR] 음수는 입력할 수 없습니다.',
    INVALID_INPUT: '[ERROR] 입력이 올바르지 않습니다.',
  };

  async run() {
    const input = await Console.readLineAsync(
      '덧셈할 문자열을 입력해 주세요. \n'
    );
    const result = this.calculateSumFromString(input);
    Console.print(`결과 : ${result}`);
  }

  calculateSumFromString(input) {
    const parts = this.deleteDelimiter(input);
    const numbers = this.mapToNumbers(parts);
    return this.sumNumbers(numbers);
  }

  checkCustomDelimiter(input) {
    if (input.startsWith('//')) {
      const customDelimiter = input.slice(2, input.indexOf('\\n'));
      return customDelimiter;
    }
  }

  deleteDelimiter(value) {
    let delimiter = /,|:/;
    let parts = value;

    const customDelimiter = this.checkCustomDelimiter(value);
    if (customDelimiter) {
      delimiter = new RegExp(customDelimiter);
      parts = value.split('\\n')[1];
    }

    return parts.split(delimiter);
  }

  mapToNumbers(stringArray) {
    return stringArray.map((str) => Number(str));
  }

  sumNumbers(numberArray) {
    return numberArray.reduce((acc, cur) => acc + cur, 0);
  }
}
export default App;
