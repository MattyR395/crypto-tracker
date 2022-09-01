import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateHoldingDto } from '@api/holdings/dto/create-holding.dto';
import { Holding } from '@models/holding.model';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { editHolding, editHoldingSuccess } from 'src/app/state/actions/holding.actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-edit-asset-dialog',
  templateUrl: './edit-asset-dialog.component.html',
  styleUrls: ['./edit-asset-dialog.component.scss']
})
export class EditAssetDialogComponent {

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  formValues: CreateHoldingDto | undefined = undefined;
  isFormValid: boolean = false;

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private dialogRef: MatDialogRef<EditAssetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public holding: Holding
  ) {

    // Listen for the addHoldingSuccess action and close the dialog if this occurs.
    this.actions$.pipe(
      ofType(editHoldingSuccess),
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

  submitEditAssetForm(): void {
    this.store.dispatch(editHolding({ holding: {
      id: this.holding.id,
      tokenId: this.formValues!.tokenId,
      amount: this.formValues!.amount,
      paidUsd: this.formValues!.paidUsd,
      dateAquired: this.formValues!.dateAquired ?? undefined
    }}));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
