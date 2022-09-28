import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from 'src/app/core/helpers/logger';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss']
})
export class UserSigninComponent implements OnInit {
  public signinForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      login: [
        '', // Dafault value og login : '
        Validators.required
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

  get f() {
    return this.signinForm.controls;
  }



  public onSubmit(): void {
    this.submitted = true;

    if (this.signinForm.invalid) {
      return;
    }

    this.userService.signin(this.signinForm.value);

    if (this.userService.isAuthenticated()) {
      //Logger.info(`Got a user`);
      this.router.navigate(['/', 'interns']);
    } else {
      //Logger.info(`Bad credentials`);
      this.submitted = false;
      this.signinForm.reset();
      //setTimeout(() => { this.hasError = false }, 5000);
    }
  }

  reset() {
    this.submitted = false;
    this.signinForm.reset();
  }

}
