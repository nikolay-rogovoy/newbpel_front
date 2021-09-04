import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Safe } from '../../../entities/room/safe';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadActiveListDecorator } from '../../../lib/load-active-list-decorator';

@Component({
  templateUrl: 'safes-select.component.html'
})
@LoadActiveListDecorator(EntityName.safe)
export class SafesSelectComponent extends LifecycleComponent implements IListSelectComponent<Safe>, OnInit {

  positions: Safe[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Safe name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  @Output()
  selection = new EventEmitter<Safe>();

  constructor(public injector: Injector) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  selectRow(row) {
    this.selection.emit(row);
  }
}
