import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router, RouterStateSnapshot } from '@angular/router';
import { Logger } from 'src/app/core/helpers/logger';
import { Intern } from 'src/app/core/models/intern';


import { InternService } from 'src/app/core/services/intern.service';

@Component({
  selector: 'app-intern-detail',
  templateUrl: './intern-detail.component.html',
  styleUrls: ['./intern-detail.component.scss']
})
export class InternDetailComponent implements OnInit {

  private _id!: number;
  public intern: Intern | null = null;

  public bubbleConfig: any = {
    height: '3em',
    width: '3em',
    lineHeight: '3em',
    backgroundColor: 'rgba(255, 138, 3, 0.7)',
    borderRadius: '50%',
    fontWeight: 'bold',
    color: '#000',
    //color: '#00BFFF',
    verticalAlign: 'middle',
    textAlign: 'center'
  }

  //public initials: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private internService: InternService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this._id = +paramMap.get('id')!;
          this.internService.findOne(this._id).subscribe({
            next: (intern: Intern) => {
              this.intern = intern;
            },
            error: (error) => {
              Logger.info(JSON.stringify(error));
            }
          })
        });
  }

  public get id(): number {
    return this._id;
  }
  public navigate(): void {

    this.router.navigate(['/', 'interns']);

  }


}
