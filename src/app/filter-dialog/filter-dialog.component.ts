import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OptionsFilterComponent } from '../options-filter/options-filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

type DialogData = {
  range: FormGroup;
  toppingsSelected: FormControl<Array<string>>;
};
@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    OptionsFilterComponent,
    MatDatepickerModule,
    MatInputModule,
    JsonPipe,
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',
})
export class FilterDialogComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  symbolsSelected: FormControl<Array<string>> = new FormControl();
  isClear: boolean = false;
  isApplyFilter: boolean = false;
  constructor(
    public matDialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.range = data.range;
    this.symbolsSelected = data.toppingsSelected;
  }

  applyFilter() {
    let filter = {
      range: this.range,
      symbolsSelected: this.symbolsSelected,
      isApplyFilter: this.isClear ? false : true
    }
    this.matDialogRef.close(filter);
  }

  clearFilter() {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    this.symbolsSelected = new FormControl();
    this.isClear = true;
  }
}
