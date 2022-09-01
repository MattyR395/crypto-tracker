import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import { addHolding, addHoldingSuccess } from 'src/app/state/actions/holding.actions';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateHoldingDto } from '@api/holdings/dto/create-holding.dto';

@Component({
  selector: 'app-add-asset-dialog',
  templateUrl: './add-asset-dialog.component.html',
  styleUrls: ['./add-asset-dialog.component.scss']
})
export class AddAssetDialogComponent implements OnDestroy {

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  formValues: CreateHoldingDto | undefined = undefined;
  isFormValid: boolean = false;

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private dialogRef: MatDialogRef<AddAssetDialogComponent>
  ) {

    // Listen for the addHoldingSuccess action and close the dialog if this occurs.
    this.actions$.pipe(
      ofType(addHoldingSuccess),
      takeUntil(this._onDestroy)
    ).subscribe(() => {
      this.dialogRef.close();
    })
  }

  updateValidity(isValid: boolean): void {
    this.isFormValid = isValid;
  }

  updateFormValues(values: any): void {
    this.formValues = values;
  }

  submitAddAssetForm(): void {
    this.store.dispatch(addHolding({ holdingDto: this.formValues! }));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
