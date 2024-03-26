import { Component, Input, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe, registerLocaleData } from '@angular/common';
import {
  MAT_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { IConfig } from 'ngx-mask';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
const maskConfig: Partial<IConfig> = {
  validation: true,
};
@Component({
  selector: 'app-options-filter',
  standalone: true,
  imports: [
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    JsonPipe,
    MatSelectModule,
  ],
  templateUrl: './options-filter.component.html',
  styleUrl: './options-filter.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class OptionsFilterComponent {
  @Input() range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  @Input() symbolsSelected: FormControl<Array<string>> = new FormControl();
  symbols: string[] = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
}
