import { ISanitizePunctuationStrategy } from './i-sanitize-punctuation-strategy';


export class SpaceAfterOnlyStrategy implements ISanitizePunctuationStrategy{

  sanitize(index: number, stringAsArray: string[], output: string): string {
    const previousChar: string = stringAsArray[index -1];
    if(previousChar === ' ') {
      output = output.substring(0, output.length-1) + stringAsArray[index];
    } else {
      output = output + stringAsArray[index];
    }
    return output;
  }

}
