import * as fs from 'fs';
export class Utils {
  static isoDateStringToDate(isoDate: string): Date {
    const dateArray = isoDate.split('-');
    const resultDate = new Date();
    resultDate.setFullYear(Number(dateArray[0]));
    resultDate.setMonth(Number(dateArray[1]) - 1);
    resultDate.setDate(Number(dateArray[2]));
    return resultDate;
  }

  static dateToIsoDateString(date: Date): string {
    let month = (date.getMonth() + 1).toString();
    month = parseInt(month) < 10 ? `0${month}` : month;

    let day = date.getDate().toString();
    day = parseInt(day) < 10 ? `0${day}` : day;
    return `${date.getFullYear()}-${month}-${day}`;
  }

  static yesterday(): Date {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  static setToString(set: Set<string>): string {
    let result = '';
    set.forEach((element: string) => {
      result += `[${element}], `;
    });
    return result;
  }

  static parseBoolean(value: number): boolean {
    if (value) {
      return value != 0;
    }
  }

  static isFloat(x) {
    if (!isNaN(x)) {
      if (parseInt(x) != parseFloat(x)) {
        return true;
      }
    }

    return false;
  }

  static buildObjectFromFile(fileName): Promise<any> {
    return new Promise((resolve) => {
      fs.readFile(fileName, (err, content) => {
        if (err) {
          throw new Error(err.message);
        }
        return resolve(JSON.parse(content.toString()));
      });
    });
  }
}
