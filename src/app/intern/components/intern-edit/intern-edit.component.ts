import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Logger } from 'src/app/core/helpers/logger';
import { Intern } from '../../../core/models/intern';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { POE } from 'src/app/core/models/poe';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { InternService } from '../../../core/services/intern.service';
import { error } from '@angular/compiler/src/util';
import * as moment from 'moment';
import { DateValidator } from '../../../core/validators/date-validator';
import { EmailExistsValidatorService } from '../../../core/validators/email-exists-validator.service';
import { POEService } from '../../../core/services/poe.service';

@Component({
  selector: 'app-intern-edit',
  templateUrl: './intern-edit.component.html',
  styleUrls: ['./intern-edit.component.scss']
})
export class InternEditComponent implements OnInit{

  constructor(

  ) { }

  ngOnInit(): void {

  }


}
