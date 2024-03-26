import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { TableComponent } from './table/table.component';
import { dataSource } from './data-source.list';
import localePt from '@angular/common/locales/pt';
import { IConfig } from 'ngx-mask';
registerLocaleData(localePt);
const maskConfig: Partial<IConfig> = {
  validation: true,
};

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  createdAt: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    TableComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'filter';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dataSourceBackup: PeriodicElement[] = [];
  toppingsSelectedBackup: FormControl<Array<string>> = new FormControl();
  isApplyFilter: boolean = false;
  dataSource: PeriodicElement[] = dataSource;
  symbolsSelected: FormControl<Array<string>> = new FormControl();
  constructor(private dialog: MatDialog) {
    this.dataSourceBackup = this.dataSource;
  }

  openDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: {
        range: this.range,
        toppingsSelected: this.symbolsSelected,
      },
      panelClass: 'filter-dialog',
    });
    this.closedFilter(dialogRef);
  }

  closedFilter(dialogRef: MatDialogRef<FilterDialogComponent, any>) {
    dialogRef.afterClosed().subscribe({
      next: (result: {
        range: FormGroup;
        symbolsSelected: FormControl<Array<string>>;
        isApplyFilter: boolean;
      }) => {
        if (!result) return;

        this.range = result.range;
        this.symbolsSelected = result.symbolsSelected;
        this.isApplyFilter = result.isApplyFilter;
        this.dataSource = this.dataSourceBackup;
        this.applyDateFilter();
        this.applyToppingsFilter();
      },
    });
  }

  applyDateFilter() {
    if (this.range) {
      const start = this.range.value.start?.toISOString() as string;
      const end = this.range.value.end?.toISOString() as string;
      this.dataSource = this.dataSource.filter((element) => {
        if (this.range.value.start && this.range.value.end) {
          return element.createdAt >= start && element.createdAt <= end;
        } else {
          return element;
        }
      });
    }
  }
  applyToppingsFilter() {
    if (this.symbolsSelected.value) {
      this.dataSource = this.dataSource.filter((element) => {
        if (this.symbolsSelected.value.length > 0) {
          return this.symbolsSelected.value.includes(element.symbol);
        } else {
          return element;
        }
      });
    }
  }
}
