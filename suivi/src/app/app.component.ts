import { Component, OnInit } from '@angular/core';
import { InternService } from './core/services/intern.service';
import { UserService } from './user/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public title = 'Internship';
  public internsNumber: number = 0;

  public constructor(
    public internService: InternService,
    public userService: UserService
  ) {
  }
  ngOnInit(): void { //

  }

  public getTitle(): string {
    return this.title;
  }

}

