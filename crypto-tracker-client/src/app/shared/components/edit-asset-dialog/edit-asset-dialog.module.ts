import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAssetDialogComponent } from './edit-asset-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { AssetFormModule } from '../asset-form/asset-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    EditAssetDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AssetFormModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    EditAssetDialogComponent
  ]
})
export class EditAssetDialogModule { }
