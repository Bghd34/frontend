import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { Logger } from 'src/app/core/helpers/logger';
import { POE } from 'src/app/core/models/poe';
import { DateValidator } from 'src/app/core/validators/date-validator';
import { EmailExistsValidatorService } from 'src/app/core/validators/email-exists-validator.service';
import { POEService } from '../../core/services/poe.service';
import { Observable } from 'rxjs';
import { Intern } from 'src/app/core/models/intern';
import * as moment from 'moment';

export class InternFormBuilder {
  private form!: FormGroup;
  private addPoes: boolean = false;
  private _poes: POE[] | null = null;
  private intern: Intern = new Intern(); // the intern we want to manage (empty Model first)

  public constructor(
    private formBuilder: FormBuilder,
    private poeService: POEService
    ){

    this.intern.name = 'Andreotti';
    this.intern.firstName = 'Pia';
    this.intern.email = 'bli@bla.com';
    this.intern.phoneNumber = '07 23 56 89 87';
    this.intern.birthDate = new Date('1989-02-25');

    this._buildForm();
  }

  public get internInform(): FormGroup {
    return this.form;
  }

  public toggleAddPoes(): Observable<POE[]> {
    return this.poeService.findAll()
    .pipe(
      take(1),
      map((poes: POE[]) => {
        this.addPoes = true;
        this._poes = poes;
        const poesControl: FormControl = new FormControl('',  Validators.required);
        this.form.addControl('poes', poesControl);
        return poes;
      })
    )

  }

  public get poes(): POE[] | null {
    return this._poes;
  }

  private _buildForm(): void {
    //Logger.info(this.formBuilder instanceof FormBuilder ? 'Instance ok' : 'ko');
    this.form = this.formBuilder.group({
      name: [
        this.intern.name,
        [Validators.required, Validators.minLength(2)]
      ],
      firstName: [
        this.intern.firstName
      ],
      phoneNumber: [
        this.intern.phoneNumber
      ],
      email: [
        this.intern.email,
        [
          Validators.required,
          Validators.email
          //Validators.pattern(new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'))
        ],
        //this.emailExistsValidator.alreadyexists.bind(this.emailExistsValidator)
        EmailExistsValidatorService.emailExists
      ],
      birthDate: [
        moment(this.intern.birthDate).format('YYYY-MM-DD'),
        [Validators.required, DateValidator.dateNotLessThan]
      ],
      adress: [
        this.intern.address
      ]
    });
  }
}
