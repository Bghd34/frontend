import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AddSnackService {

  private readonly duration: number = 3;
  private  _config: MatSnackBarConfig = {
    duration: this.duration*1000,
    verticalPosition: 'top'
  }
  constructor(
    private snackBar: MatSnackBar
  ) { }

  public set config(position: MatSnackBarVerticalPosition) {
    this._config = {
      duration: this._config.duration,
      verticalPosition: position
    }
  }

  public show(message: string): void {
    this.snackBar.open(message,'',this._config);
  }
}
