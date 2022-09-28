import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { POE } from 'src/app/core/models/poe';
import { POEService } from '../../../core/services/poe.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-poe-detail',
  templateUrl: './poe-detail.component.html',
  styleUrls: ['./poe-detail.component.scss']
})
export class POEDetailComponent implements OnInit, OnDestroy {
  public _id!:number;
  public poe: POE | null=null ;

  // Pay attention to unsubscribe from all Observables
  private subscripes:Subscription[] = [];

  constructor(private activatedRoute:ActivatedRoute, private poeService:POEService) {}

  ngOnInit(): void {
    //this.poe = this.poeService.findOne(this.getId())
    console.log(this.poe);
  }

  // cette methode sera appelé aprés que le composant soit monté
  ngOnDestroy(): void {
    this.subscripes.forEach((s:Subscription) => s.unsubscribe());
    /** seconde method
     * for(const maVariable of this.subscripes){
         maVariable.unsubscribe
       }
     */

  }


  public getId():number {
    this.subscripes.push(this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this._id = +paramMap.get('id')!;
        //console.log(this._id)
      }
    ))
    return this._id;
  }



}
