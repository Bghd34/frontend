import { Injectable } from '@angular/core';
import { Logger } from 'src/app/core/helpers/logger';
import { UserModel } from '../model/user-model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [
    {
      login: 'admin',
      pass: '0000'
    },
    {
      login: 'user',
      pass: '0000'
    },

  ];

  private user: UserModel | null = null;

  /**
   * Class constant always uppercase
   */
  private readonly STORAGE_KEY: string = 'auth-token';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  /**
   *
   * @param credentials From signinForm (login and password user entered)
   */
  public signin(credentials: any): void {
    const foundUser: any = this.users.find(
      (inUser: any) => inUser.login === credentials.login && inUser.pass === credentials.password
    );
    if(foundUser) {
      this.user = new UserModel();
      this.user.setLogin(credentials.login);
      this.user.setToken(credentials.login + '.xxxxxx.yyyyyyy');
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.user));
    }

  }

  public signout(): void {
    this.user = null;
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/', 'signin']);
  }

  /**
   *
   * @returns Yes or No a user was authenticated
   */
  public isAuthenticated(): boolean {
    return this.user !== null;
  }

  public getToken():void {
    const userAsString: string | null = localStorage.getItem(this.STORAGE_KEY);

    if(userAsString !== null) {
      this.user = new UserModel();
      const persistentUser: any = JSON.parse(userAsString);
      this.user.setLogin(persistentUser.login);
      this.user.setToken(persistentUser.token);
    }
  }
}
