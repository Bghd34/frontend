import { Component, OnInit } from '@angular/core';
import { POE } from 'src/app/core/models/poe';
import { POEService } from '../../../core/services/poe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss']
})
export class POETableComponent implements OnInit {

  public poes?: POE[];

  constructor(public poeService: POEService) { }

  ngOnInit(): void {
    //this.poes = this.poeService.findAll();
  }

  onDelete(poe: POE) {
    this.poeService.delete(poe);
  }


}
