import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsDialogComponent } from './settings-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SettingsDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDialogModule
  ],
  exports: [
  SettingsDialogComponent    
  ]
})
export class SettingsDialogModule { }
