import { APP_INITIALIZER, Injectable } from '@angular/core';
import { Logger } from '../helpers/logger';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private userService: UserService
  ) { }

  /**
   *
   * @returns
   */
  public init(): Promise<void> {
    return new Promise(
      (resolve) => {
      Logger.info(`take my propise here, before app was started`);
      this.userService.getToken();
      resolve();
    });
  }
}

export const initializeApp = (appInitService: AppInitService): any => {
  return (): Promise<void> => {
    return appInitService.init();
  }
}

export const appInit = {
  provide: APP_INITIALIZER,
  useFactory: initializeApp,
  deps: [
    AppInitService
  ],
  multi :true
}
