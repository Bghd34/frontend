import { ISanitizePunctuationStrategy } from './strategies/i-sanitize-punctuation-strategy';
import { SpaceAfterOnlyStrategy } from './strategies/space-after-only-strategy';
import { SpaceBeforeAndAfterStrategy } from './strategies/space-before-and-after-strategy';
import { Logger } from './logger';
export class StringHelper {

  /**
   *
   * @param {string} value
   * @returns String without leading and trailing spaces from param
   * @usage StringHelper.removeSpaces('string to trim')
   */
  public static removeSpaces(value: string): string {
    return value.trim();
  }
  /**
   *
   * @param value
   * @returns a string with dashes instead of spaces except leading and trailing spaces
   * @usage StringHelper.replaceSpacesWithDashes('string to replace')
   */
  public static replaceSpacesWithDashes(value: string): string {
    return StringHelper.removeSpaces(value).replace(' ', '-');
  }

  /**
   *
   * @param value string to remove leading chars
   * @param regex patternof unexpected chars
   * @returns StringHelper.removeUnexpectedLeadingChars('my string', \[-_ ]\g)
   */
  public static removeUnexpectedLeadingChars(value: string, regex: RegExp): string {
    let firstChar: string = value.charAt(0);
    while(firstChar.match(regex)) {
      value = value.substring(1);
      firstChar = value.charAt(0);
    }
    return value;
  }

  public static removeUnexpectedTrailingChars(value: string, regex: RegExp): string {
    value = value.split('').reverse().join('');
    value = StringHelper.removeUnexpectedLeadingChars(value, regex);
    return value.split('').reverse().join('');
  }

  /**
   *
   * @param value string to sanitize
   * @param locale optional locale to compute, default fr
   * @usage StringHelper.sanitizePunctuation('ma chaine', 'es') or StringHelper.sanitizePunctuation('ma chaine')
   */
  public static sanitizePunctuation(value: string, locale?: string): string {
    if(locale === undefined) {
      locale = 'fr';
    }

    if(value.match(/[.,;:\!\?]/g) === null) {
      return value;
    }

    const initialValue: string[] = value.split('');
    let output: string = '';
    let strategy: ISanitizePunctuationStrategy;

    for(let i: number=0; i<initialValue.length; i++) {
      if(initialValue[i] === ';' || initialValue[i] === ':' || initialValue[i] === '?'){
        strategy = ( (locale === 'fr') ? new SpaceBeforeAndAfterStrategy() : new SpaceAfterOnlyStrategy() );

      }
      else if (initialValue[i] === ',' || initialValue[i] === '.') {
        strategy = new SpaceAfterOnlyStrategy();
        const previousChar: string = initialValue[i -1];
        if(previousChar === ' ') {
          output = output.substring(0, output.length-1) + initialValue[i];
        }

      }
      else {
        output = output + initialValue[i];
      }
    }

    return output;
  }

}


