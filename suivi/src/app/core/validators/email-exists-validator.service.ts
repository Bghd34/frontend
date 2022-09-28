import { Injectable } from '@angular/core';
import { InternService } from '../services/intern.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Logger } from '../helpers/logger';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailExistsValidatorService {
  private static myValidator: EmailExistsValidatorService;
  constructor(
    private internService: InternService
  ) {
    EmailExistsValidatorService.myValidator = this;
  }

  public static emailExists(control: AbstractControl): Promise<ValidationErrors | null> {
    return EmailExistsValidatorService.myValidator.alreadyexists(control);
  }

  public alreadyexists(control: AbstractControl): Promise<ValidationErrors | null> {
    const ValidationError: ValidationErrors = {alreadyExists: true};

    return new Promise((emailExists) => {
      this.internService.emailAlreadyExists(control.value)
      .pipe(
        take(1)
      )
      .subscribe(
        {
          next: (response: HttpResponse<any>) => {
            Logger.info(`Got a ${response.status} so, all is okay`);
            emailExists(null);
          },
          error: (error: any) => {
            Logger.error(`email ${control.value} is already taken`);
            emailExists(ValidationError);
          }
        }
      );
    });
  }
}
