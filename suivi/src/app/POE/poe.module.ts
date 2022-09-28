import { NgModule } from '@angular/core';

import { POERoutingModule } from './poe-routing.module';
import { POEAddComponent } from './components/poe-add/poe-add.component';
import { POETableComponent } from './components/poe-table/poe-table.component';
import { POEDetailComponent } from './components/poe-detail/poe-detail.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    POETableComponent,
    POEAddComponent,
    POEDetailComponent
  ],
  exports: [
    POEAddComponent,
    POEDetailComponent,
    POETableComponent
  ],
  imports: [
    CommonModule,
    POERoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    UiModule
  ]
})
export class POEModule { }
