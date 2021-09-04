import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityName } from '../../../entities/entity-name';
import { ReactiveFormDecorator } from '../../../lib/reactive-form-decorator';
import { IReactiveForm } from '../../../lib/i-reactive-form';
import { from, of } from 'rxjs';
import { DeleteFormDecorator } from '../../../lib/delete-form-decorator';
import { ExistsEntityFormDecorator } from '../../../lib/exists-entity-form-decorator';
import { CancelFormDecorator } from '../../../lib/cancel-form-decorator';
import { InvalidControlFormDecorator } from '../../../lib/invalid-control-form-decorator';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { Operationresource } from '../../../entities/user/operationresource';
import { TemplateProviderComponent } from '../../../lib/template-provider-component/template-provider-component';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, reduce, switchMap } from 'rxjs/operators';
import { Resource } from '../../../entities/user/resource';
import { ServiceProvider } from '../../../services/service-provider';
import { ColumnTypeMetadata, getEntitiesMetadata } from '../../../entities/metadata/entity-metadata';
import { CommonLib } from '../../../lib/common-lib';
import { NotificationService } from '../../../services/notification-service';
import { IUserDep } from '../../../interfaces/i-user-dep';
import { ModalContainerService } from '../../../components/modal-container-module/modal-container-service';
import { OperationsSelectComponent } from '../operations-select/operations-select.component';
import { ListModalContainerStrategy } from '../../../components/modal-container-module/strategy/list-modal-container-strategy';
import { Operation } from '../../../entities/user/operation';

@Component({
  templateUrl: 'resource-edit.component.html'
})
@ReactiveFormDecorator()
@DeleteFormDecorator(EntityName.resource)
@ExistsEntityFormDecorator()
@CancelFormDecorator()
@InvalidControlFormDecorator()
export class ResourceEditComponent extends LifecycleComponent implements IReactiveForm, OnInit {

  formGroup = new FormGroup({
    idresource: new FormControl(''),
    name: new FormControl('', Validators.required),
    comment: new FormControl(''),
    active: new FormControl(''),
    dtcre: new FormControl({ value: '', disabled: true }),
  });

  changed = false;

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('operation_name', 'Operation name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('dtcre', 'Creation date', true, new FilterInfo(''), ColumnFormat.Datetime, false),
    new ColumnInfo('actions', 'Actions', true, new FilterInfo(''), ColumnFormat.Template, false),
  ];

  operationresources: Operationresource[] = [];
  operationresourcesToDelete: Operationresource[] = [];

  @ViewChild(TemplateProviderComponent, { static: true })
  templateProvider: TemplateProviderComponent;

  constructor(public injector: Injector) {
    super();
  }

  onInit() {
    this.injector.get(ActivatedRoute).paramMap.pipe(
      switchMap(params => {
        if (params.get('id') === 'new') {
          return of({ idresource: null, dtcre: new Date(), active: true });
        } else {
          const id = Number(params.get('id'));
          return this.injector.get(ServiceProvider).getEntity<Resource>(id, EntityName.resource)
            .pipe(
              switchMap((entity) => {
                return this.injector.get(ServiceProvider).getEntityForField<Operationresource>('idresource', entity.idresource.toString(), EntityName.operationresource)
                  .pipe(
                    switchMap((operationresources: Operationresource[]) => {
                      operationresources.forEach((entity) => {
                        this.addControl(entity);
                      });
                      this.operationresources = operationresources;
                      return of(entity);
                    })
                  );
              })
            );
        }
      })
    ).subscribe((entity) => {
      const patchValue = <any>{ ...entity };
      const entityMetadata = getEntitiesMetadata().find(x => x.name === EntityName.resource);
      if (entityMetadata) {
        for (const dateColumn of entityMetadata.columns.filter(x => x.type === ColumnTypeMetadata.date)) {
          if (entity[dateColumn.name]) {
            patchValue[dateColumn.name] = CommonLib.formatDate(entity[dateColumn.name]);
          }
        }
      }
      this.formGroup.patchValue(patchValue);
    });
  }

  acceptChanges(): void {
    throw new Error('Not implemented');
  }
  goBack(): void {
    throw new Error('Not implemented');
  }
  getChanged(): boolean {
    throw new Error('Not implemented');
  }

  cancel() {
    throw new Error(`Not implemented`);
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.injector.get(NotificationService).dep.pipe(
        switchMap((dep: IUserDep) => {
          let value = { ...this.formGroup.getRawValue() };
          value = CommonLib.removeEmptyPrimaryKey(value, EntityName.resource);
          return this.injector.get(ServiceProvider).postEntity(value, dep.iddep, EntityName.resource)
            .pipe(
              switchMap((id) => {
                return from(this.operationresources.filter(x => x.idoperationresource == null))
                  .pipe(
                    mergeMap((operationresource: Operationresource) => {
                      operationresource.idresource = id;
                      let value = { ...operationresource };
                      delete value['actions'];
                      return this.injector.get(ServiceProvider).postEntity(value, dep.iddep, EntityName.operationresource);
                    }),
                    reduce((acc, val) => {
                      acc.push(val);
                      return acc;
                    }, []),
                    map(() => id),
                    switchMap(() => {
                      return this.injector.get(ServiceProvider).deleteEntitys(this.operationresourcesToDelete, EntityName.operationresource);
                    })
                  );
              }),
            );
        }),
      ).subscribe(() => {
        this.acceptChanges();
        this.goBack();
      });
    }
  }

  invalidControlClass(controlName: string) {
    throw new Error('Not implemented');
  }

  isExistsEntity() {
    throw new Error('Not implemented');
  }

  addOperation() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select operation',
      style: 'primary',
      ctor: OperationsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((operation: Operation) => {
          if (operation) {
            const operationresource = <Operationresource>{
              operation_name: operation.name,
              dtcre: new Date(),
              idoperation: operation.idoperation,
            };
            this.addControl(operationresource);
            this.operationresources.push(operationresource);
            this.changed = true;
            return of(operationresource);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  addControl(entity: Operationresource) {
    entity['actions'] = {
      template: this.templateProvider.gridButtons,
      context: {
        data:
        {
          buttons: [
            {
              click: this.deleteResourceoperation.bind(this),
              item: { entity: entity },
              css: { 'oi-x': true, 'oi': true, 'grid-button': true },
              caption: 'Delete',
              icon: { 'fa': true, 'fa-trash': true },
            }
          ],
        }
      }
    };
  }

  deleteResourceoperation(operationresource: { entity: Operationresource }) {
    this.operationresources.splice(this.operationresources.indexOf(operationresource.entity), 1);
    if (operationresource.entity.idoperationresource) {
      this.operationresourcesToDelete.push(operationresource.entity);
    }
    this.changed = true;
  }
}
