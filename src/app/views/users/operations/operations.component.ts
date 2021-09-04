import { Component, Injector, OnInit } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Operation } from '../../../entities/user/operation';
import { CreateDecorator } from '../../../lib/create-decorator';
import { IListComponent } from '../../../lib/i-list-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadListDecorator } from '../../../lib/load-list-decorator';
import { SelectRowDecorator } from '../../../lib/select-row-decorator';

@Component({
  templateUrl: 'operations.component.html'
})
@LoadListDecorator(EntityName.operation)
@SelectRowDecorator(EntityName.operation)
@CreateDecorator(EntityName.operation)
export class OperationsComponent extends LifecycleComponent implements IListComponent<Operation>, OnInit {

  constructor(public injector: Injector) {
    super();
  }

  positions: Operation[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Operation name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('dtcre', 'Date of creation', true, new FilterInfo(''), ColumnFormat.Datetime, false),
  ];

  newItem() {
    throw new Error('Not implemented');
  }
  selectRow(entity) {
    throw new Error('Not implemented');
  }
}
