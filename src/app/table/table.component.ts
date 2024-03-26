import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../app.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @Input() dataSource: PeriodicElement[] = [];
}
