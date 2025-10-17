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

      if (!customDelimiter) throw new Error(App.ERROR_MESSAGES.EMPTY_STRING);
      if (!isNaN(+customDelimiter))
        throw new Error(App.ERROR_MESSAGES.NUMBER_DELIMITER);
      return customDelimiter;
    }
  }

  // 정규표현식에서 특별한 의미를 가지는 특수문자 $, ^, *, (, ), +, [, |,
  // 정규표현식에서 가능한 특수문자 !, @, #, %, &, -, _, =, ], {, }, :, ;, ', ", <, >, /
  // 기타 처리가 필요한 특수문자 \, ?

  escapeRegExp(string) {
    return string.replace(/[$^*()+[\]|\\?]/g, '\\$&');
  }

  deleteDelimiter(value) {
    let delimiter = /,|:/;
    let parts = value;

    const customDelimiter = this.checkCustomDelimiter(value);
    if (customDelimiter) {
      const escapeDelimiter = this.escapeRegExp(customDelimiter);
      delimiter = new RegExp(escapeDelimiter);
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
