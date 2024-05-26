import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

const sharedModule = [
  CommonModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  FormsModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  ReactiveFormsModule,
  MatInputModule,
  MatIconModule
]
@NgModule({
  imports: sharedModule,
  exports: sharedModule,
})
export class SharedModule {}
