import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Hygienekit } from '../../../entities/room/hygienekit';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadActiveListDecorator } from '../../../lib/load-active-list-decorator';

@Component({
  templateUrl: 'hygienekits-select.component.html'
})
@LoadActiveListDecorator(EntityName.hygienekit)
export class HygienekitsSelectComponent extends LifecycleComponent implements IListSelectComponent<Hygienekit>, OnInit {

  positions: Hygienekit[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Hygienekit name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  @Output()
  selection = new EventEmitter<Hygienekit>();

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
