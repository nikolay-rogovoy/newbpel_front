import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { EntityName } from '../../../entities/entity-name';
import { Operation } from '../../../entities/user/operation';
import { Operationresource } from '../../../entities/user/operationresource';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { ServiceProvider } from '../../../services/service-provider';

@Component({
  templateUrl: 'operations-resource-select.component.html'
})
export class OperationsResourceSelectComponent extends LifecycleComponent implements IListSelectComponent<Operation>, OnInit {

  positions: Operation[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('name', 'Operation name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('comment', 'Comment', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  @Output()
  selection = new EventEmitter<Operation>();

  idresource = new BehaviorSubject<number>(null);

  constructor(public injector: Injector) {
    super();
  }

  onInit(): void {
    this.idresource
      .pipe(
        filter(x => x != null),
        switchMap((idresource: number) => {
          return this.injector.get(ServiceProvider).getEntityForField<Operationresource>('idresource', idresource.toString(), EntityName.operationresource);
        })
      )
      .subscribe(
        (operationresources: Operationresource[]) => {
          this.positions = operationresources.map(x => {
            return <Operation>{
              idoperation: x.idoperation,
              name: x.operation_name,
            };
          });
          super.onInit();
        }
      );
  }

  selectRow(row) {
    this.selection.emit(row);
  }
}
