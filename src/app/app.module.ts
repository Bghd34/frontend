import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternModule } from './intern/intern.module';
import { POEModule } from './POE/poe.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { appInit } from './core/services/app-init.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    POEModule,
    SharedModule,
    BrowserAnimationsModule,
    InternModule,
    UserModule
  ],
  providers: [
    appInit
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
