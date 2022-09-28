import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InternService } from '../../core/services/intern.service';
import { POEService } from '../../core/services/poe.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public title:string = '';
  @Input() public internsNumber: number = 0;

  public itemNumber$!: BehaviorSubject<number>;

  constructor(
    public internService: InternService,
    public poeService: POEService,
    public router: Router,
    public userService: UserService
    ) { }

  ngOnInit(): void {
    this.itemNumber$ = this.internService.itemNumber;
  }


  navigate() {
    this.router.navigate(['/', 'interns','login']);
  }

}
