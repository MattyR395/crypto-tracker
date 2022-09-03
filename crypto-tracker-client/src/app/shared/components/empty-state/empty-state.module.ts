import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from './empty-state.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EmptyStateComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    EmptyStateComponent
  ]
})
export class EmptyStateModule { }
