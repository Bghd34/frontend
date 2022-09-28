import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InternService } from './../../../core/services/intern.service';
import { Logger } from './../../../core/helpers/logger';
import { Intern } from 'src/app/core/models/intern';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { POE } from '../../../core/models/poe';
import { POEService } from '../../../core/services/poe.service';
import { StringHelper } from 'src/app/core/helpers/string.helper';




@Component({
  selector: 'app-intern-table',
  templateUrl: './intern-table.component.html',
  styleUrls: ['./intern-table.component.scss']
})
export class InternTableComponent implements OnInit {

  private static sortOrder: number = 1;
  public interns: Intern[] = [];
  public bubbleConfig: any = {
    height: '3em',
    width: '3em',
    lineHeight: '3em',
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: '50%',
    fontWeight: 'bold',
    color: '#000',
    //color: '#00BFFF',
    verticalAlign: 'middle',
    textAlign: 'center'

}


  constructor(
    private internService: InternService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllInterns();

    Logger.info(`Hello, je poursuis l'exécusion`);

  }

  findAllInterns() {
    this.interns = [];
    this.internService.findAll()
    .subscribe((interns: Intern[]) => {
      Logger.info(`je viens d'être notifié`)
      this.interns = interns;

    })
  }



  public onDelete(intern: Intern): void {
    this.internService.delete(intern)
    .pipe(
      take(1)
    ).subscribe((response: HttpResponse<any>) => {
      if(response.status === 204) {
        this.interns.slice( this.interns.findIndex((obj: Intern) => obj.id === intern.id), 1);
        this.ngOnInit();
      }
    });
  }

  public sortByName(): void {
    Logger.info(`Before sort, sortOrder is : ${InternTableComponent.sortOrder}`);
    this.internService.interns.sort(
      InternTableComponent.sortName
    );
    InternTableComponent.sortOrder = InternTableComponent.sortOrder * -1;
    console.log(`After sort, sortOrder is : ${InternTableComponent.sortOrder}`);
  }

  private static sortName(intern1: Intern, intern2: Intern): number {
    if (intern1.name > intern2.name) {
      return 1 * InternTableComponent.sortOrder;
    } else if (intern1.name < intern2.name) {
      return -1 * InternTableComponent.sortOrder;
    } else {
      return 0;
    }
  }

  onEdit(intern: Intern) {
    this.router.navigate(['/','intern','manage','edit',intern.id]);
  }


}
