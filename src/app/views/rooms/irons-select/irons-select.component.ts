import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Iron } from '../../../entities/room/iron';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadActiveListDecorator } from '../../../lib/load-active-list-decorator';

@Component({
  templateUrl: 'irons-select.component.html'
})
@LoadActiveListDecorator(EntityName.iron)
export class IronsSelectComponent extends LifecycleComponent implements IListSelectComponent<Iron>, OnInit {

  positions: Iron[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Iron name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  @Output()
  selection = new EventEmitter<Iron>();

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
