import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternAddComponent } from './components/intern-add/intern-add.component';
import { InternDetailComponent } from './components/intern-detail/intern-detail.component';
import { InternTableComponent } from './components/intern-table/intern-table.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { UiModule } from '../ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InternEditComponent } from './components/intern-edit/intern-edit.component';




@NgModule({
  declarations: [
    InternAddComponent,
    InternDetailComponent,
    InternTableComponent,
    InternEditComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    UiModule
  ]
})
export class InternModule { }
