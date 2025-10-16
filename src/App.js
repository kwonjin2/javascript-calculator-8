import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const input = await Console.readLineAsync(
      '덧셈할 문자열을 입력해 주세요. \n'
    );
    Console.print(`입력한 결과: ${input}`);
    Console.print(this.deleteDelimiter(input));
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
}
export default App;
