import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Operation } from '../../../entities/user/operation';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadActiveListDecorator } from '../../../lib/load-active-list-decorator';

@Component({
  templateUrl: 'operations-select.component.html'
})
@LoadActiveListDecorator(EntityName.operation)
export class OperationsSelectComponent extends LifecycleComponent implements IListSelectComponent<Operation>, OnInit {

  positions: Operation[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Operation name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  @Output()
  selection = new EventEmitter<Operation>();

  constructor(public injector: Injector) {
    super();
  }

  selectRow(row) {
    this.selection.emit(row);
  }
}
