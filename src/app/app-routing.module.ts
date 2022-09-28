import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternAddComponent } from './intern/components/intern-add/intern-add.component';
import { InternDetailComponent } from './intern/components/intern-detail/intern-detail.component';
import { InternEditComponent } from './intern/components/intern-edit/intern-edit.component';
import { InternTableComponent } from './intern/components/intern-table/intern-table.component';
import { POEAddComponent } from './POE/components/poe-add/poe-add.component';
import { POEDetailComponent } from './POE/components/poe-detail/poe-detail.component';
import { POETableComponent } from './POE/components/poe-table/poe-table.component';
import { UserSigninComponent } from './user/components/user-signin/user-signin.component';
import { HasUserGuard } from './user/guards/has-user.guard';
import { NoUserGuard } from './user/guards/no-user.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'signin',
      pathMatch: 'full'
    },
    {
      path: 'interns',
      component: InternTableComponent,
      canActivate : [
        NoUserGuard
      ]
    },
    {
      path: 'intern/:id',
      component: InternDetailComponent,
      canActivate : [
        NoUserGuard
      ]
    },
    {
      path: 'intern/manage/add',
      component: InternAddComponent,
      canActivate : [
        NoUserGuard
      ]
    },
    {
      path: 'intern/manage/edit/:id',
      component: InternEditComponent,
      canActivate : [
        NoUserGuard
      ]
    },
    {
      path: 'poes',
      component: POETableComponent,
      canActivate : [
        NoUserGuard
      ]
    },
    {
      path: 'poe/:id',
      component: POEDetailComponent,
      canActivate : [
        NoUserGuard
      ]
    },
    {
      path: 'poe/manage/add',
      component:POEAddComponent,
      canActivate : [
        NoUserGuard
      ]
    },
    {
      path: 'signin',
      component: UserSigninComponent,
      canActivate: [ //patern COF (Chain of Responsibilities)
        HasUserGuard
      ]
    },
    {
      path: '**',
      redirectTo: 'interns',
      pathMatch: 'full'
    }
  ];
}
