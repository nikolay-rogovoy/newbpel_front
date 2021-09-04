import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Role } from '../../../entities/user/role';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadActiveListDecorator } from '../../../lib/load-active-list-decorator';

@Component({
  templateUrl: 'roles-select.component.html'
})
@LoadActiveListDecorator(EntityName.role)
export class RolesSelectComponent extends LifecycleComponent implements IListSelectComponent<Role>, OnInit {

  positions: Role[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Role name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  @Output()
  selection = new EventEmitter<Role>();

  constructor(public injector: Injector) {
    super();
  }

  selectRow(row) {
    this.selection.emit(row);
  }
}
