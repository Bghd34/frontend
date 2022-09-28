import { Pipe, PipeTransform } from '@angular/core';
import { Intern } from '../../core/models/intern';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: Intern, ...args: unknown[]): string {
    return (this.getInitials(value.firstName!) + this.getInitials(value.name!)).toUpperCase();
  }


  /**
   * Get initial(s) from the given argument according spaces dash or underscore char
   * @param value Name or Firstname (PINA BARACALDO)
   */
  private getInitials(value: string): string {
    value = value.trim(); // Supprimer les espaces de début et de fin et les caractères de fin de ligne d'une chaîne.

    const regex: RegExp = /[-_ ]/g; // expression régulière ca permet de verifier si les motifs suivants('-', '_', 'espace') existent

    let firstInitial: string = value.charAt(0);

    while(firstInitial.match(regex)) {
      value = value.substring(1); // PINA BARACALDO // c apermet de supprimer une sous chaine de cractère entre l'index 0 (inclu) et 1(non inclu)
      firstInitial = value.charAt(0); // P
    }

    let lastInitial: string = ''; // Get ''


    const matches: string[] | null = value.match(regex); // matches => [' ']

    if (matches !== null) {
      const sepChar: string = matches[0]; // ' '
      let matchPosition: number = value.indexOf(sepChar) + 1; // 4 + 1 = 5
        lastInitial = value.charAt(matchPosition); //  ' '
        while(lastInitial.match(regex)) {
          matchPosition  = matchPosition + 1; // 6
          lastInitial = value.charAt(matchPosition); // B
        }
    }
    return firstInitial + lastInitial;
  }

}
