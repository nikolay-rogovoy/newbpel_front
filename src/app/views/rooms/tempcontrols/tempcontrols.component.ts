import { Component, Injector, OnInit } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Tempcontrol } from '../../../entities/room/tempcontrol';
import { CreateDecorator } from '../../../lib/create-decorator';
import { IListComponent } from '../../../lib/i-list-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadListDecorator } from '../../../lib/load-list-decorator';
import { SelectRowDecorator } from '../../../lib/select-row-decorator';

@Component({
  templateUrl: 'tempcontrols.component.html'
})
@LoadListDecorator(EntityName.tempcontrol)
@SelectRowDecorator(EntityName.tempcontrol)
@CreateDecorator(EntityName.tempcontrol)
export class TempcontrolsComponent extends LifecycleComponent implements IListComponent<Tempcontrol>, OnInit {

  constructor(public injector: Injector) {
    super();
  }

  positions: Tempcontrol[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Tempcontrol', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('dtcre', 'Date of creation', true, new FilterInfo(''), ColumnFormat.Datetime, false),
    new ColumnInfo('active', 'Active', true, new FilterInfo(''), ColumnFormat.Boolean, false),
  ];

  newItem() {
    throw new Error('Not implemented');
  }
  selectRow(entity) {
    throw new Error('Not implemented');
  }
}
