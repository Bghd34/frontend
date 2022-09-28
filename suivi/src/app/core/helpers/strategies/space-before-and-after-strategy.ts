import { ISanitizePunctuationStrategy } from './i-sanitize-punctuation-strategy';
export class SpaceBeforeAndAfterStrategy implements ISanitizePunctuationStrategy{
  sanitize(index: number, stringAsArray: string[], output: string): string {
    return 'je dois ajouter un espace avant et après';
  }
}
