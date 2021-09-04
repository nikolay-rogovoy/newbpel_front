import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Resource } from '../../../entities/user/resource';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadActiveListDecorator } from '../../../lib/load-active-list-decorator';

@Component({
  templateUrl: 'resource-select.component.html'
})
@LoadActiveListDecorator(EntityName.resource)
export class ResourcesSelectComponent extends LifecycleComponent implements IListSelectComponent<Resource>, OnInit {

  positions: Resource[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Resource name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  @Output()
  selection = new EventEmitter<Resource>();

  constructor(public injector: Injector) {
    super();
  }

  selectRow(row) {
    this.selection.emit(row);
  }
}
