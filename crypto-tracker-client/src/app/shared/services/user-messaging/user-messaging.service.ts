import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogOptions } from '@models/confirm-dialog-options.model';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserMessagingService {

  constructor(private dialog: MatDialog) { }

  /**
   * Opens a confirmation dialog which returns a boolean observable that is true if the user confirmed..
   * @param dialogData ConfirmDialogOptions
   * @returns A boolean observable that is true if the user confirmed.
   */
  openConfirmDialog(dialogData: ConfirmDialogOptions): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '30rem',
      width: '100%',
      data: dialogData
    }).afterClosed();
  }
}
