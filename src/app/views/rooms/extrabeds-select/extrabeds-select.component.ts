import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Extrabed } from '../../../entities/room/extrabed';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { LoadActiveListDecorator } from '../../../lib/load-active-list-decorator';

@Component({
  templateUrl: 'extrabeds-select.component.html'
})
@LoadActiveListDecorator(EntityName.extrabed)
export class ExtrabedsSelectComponent extends LifecycleComponent implements IListSelectComponent<Extrabed>, OnInit {

  positions: Extrabed[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Extrabed name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  @Output()
  selection = new EventEmitter<Extrabed>();

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
