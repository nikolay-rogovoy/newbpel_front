import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Fridge } from '../../../entities/room/fridge';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadActiveListDecorator } from '../../../lib/load-active-list-decorator';

@Component({
  templateUrl: 'fridges-select.component.html'
})
@LoadActiveListDecorator(EntityName.fridge)
export class FridgesSelectComponent extends LifecycleComponent implements IListSelectComponent<Fridge>, OnInit {

  positions: Fridge[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Fridge name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  @Output()
  selection = new EventEmitter<Fridge>();

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