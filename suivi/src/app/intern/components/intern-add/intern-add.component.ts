import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { InternService } from '../../../core/services/intern.service';
import { Intern } from '../../../core/models/intern';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Logger } from '../../../core/helpers/logger';
import { DateValidator } from 'src/app/core/validators/date-validator';
import { POEService } from 'src/app/core/services/poe.service';
import { take } from 'rxjs/operators';
import { POE } from 'src/app/core/models/poe';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subscribable } from 'rxjs';
import { EmailExistsValidatorService } from '../../../core/validators/email-exists-validator.service';
import { InternFormBuilder } from '../../builder/intern-form-builder';

@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss']
})
export class InternAddComponent implements OnInit, OnDestroy {

  public internForm!: FormGroup;
  public poes: POE[] | null = null;
  private subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private internService: InternService,
    private addSnackBarService: AddSnackService,
    private poeService: POEService,
    private router: Router,
    private crudSnackBar: AddSnackService,
    private emailExistsValidator: EmailExistsValidatorService
  ) { }
  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe;
    }
  }

  ngOnInit(): void {
    const myInternForm: InternFormBuilder = new InternFormBuilder(this.formBuilder, this.poeService);
    this.internForm = myInternForm.internInform;
    myInternForm.toggleAddPoes().subscribe((poes : POE[]) => {
      this.poes = poes;
    })

  }

  get c(): {[key: string]: AbstractControl} {
    return this.internForm.controls;
  }

  onSubmit() {

    this.subscription = this.internService.add(this.internForm.value)
    .subscribe((intern: Intern) => {
      this.crudSnackBar.show(`Intern was successfully added Got it`);

    })
    this.internForm.reset();
  }


}
