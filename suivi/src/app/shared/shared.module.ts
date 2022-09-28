import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { UiModule } from '../ui/ui.module';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgePipe } from './pipes/age.pipe';
import { InitialsDirective } from './directives/initials.directive';
import { InitialsPipe } from './pipes/initials.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AgePipe,
    InitialsDirective,
    InitialsPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HttpClientModule, // le l'ai pas importé car je sais pas encore si je vais l'utiliser dans les composants HeaderComponent et FooterComponent
    ReactiveFormsModule,
    UiModule,
    AgePipe,
    InitialsDirective,
    InitialsPipe,
    FormsModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiModule,
    ReactiveFormsModule

  ]
})
export class SharedModule { }
