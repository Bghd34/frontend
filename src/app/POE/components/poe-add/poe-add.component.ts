import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { POE } from 'src/app/core/models/poe';
import { POEService } from '../../../core/services/poe.service';
import { Router } from '@angular/router';
import { AddSnackService } from '../../../core/services/add-snack.service';

@Component({
  selector: 'app-poe-add',
  templateUrl: './poe-add.component.html',
  styleUrls: ['./poe-add.component.scss']
})
export class POEAddComponent implements OnInit {
  public poeForm!: FormGroup;
  submitted:boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private poeService: POEService,
    private addSnackBarService: AddSnackService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.poeForm = this.formBuilder.group({
      title: [
        '',
        [Validators.required, Validators.minLength(3), Validators.max(20)]
      ]
    })
  }

  public onSubmit() {
    this.submitted = true;
    if(this.poeForm.valid){
      //console.log(`Bout to send : ${JSON.stringify(this.poeForm.value)}`);
    const nextId: number = this.poeService.getNextId();
    //console.log(nextId);
    const poe: POE = new POE();
    poe.name = this.poeForm.value.title;
    poe.id = nextId;
    //console.log(poe)
    this.poeService.add(poe);

    this.addSnackBarService.config = 'bottom';
    this.addSnackBarService.show('Adding POE');

    this.onReset();
    this.router.navigateByUrl('/poes');
    }

  }
  onReset() {
    this.poeForm.reset();
    this.submitted = false;
  }


}
