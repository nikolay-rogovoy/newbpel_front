import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityName } from '../../../entities/entity-name';
import { ReactiveFormDecorator } from '../../../lib/reactive-form-decorator';
import { IReactiveForm } from '../../../lib/i-reactive-form';
import { forkJoin, from, of } from 'rxjs';
import { DeleteFormDecorator } from '../../../lib/delete-form-decorator';
import { ExistsEntityFormDecorator } from '../../../lib/exists-entity-form-decorator';
import { CancelFormDecorator } from '../../../lib/cancel-form-decorator';
import { InvalidControlFormDecorator } from '../../../lib/invalid-control-form-decorator';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { ModalContainerService } from '../../../components/modal-container-module/modal-container-service';
import { ListModalContainerStrategy } from '../../../components/modal-container-module/strategy/list-modal-container-strategy';
import { map, mergeMap, reduce, switchMap } from 'rxjs/operators';
import { Role } from '../../../entities/user/role';
import { TemplateProviderComponent } from '../../../lib/template-provider-component/template-provider-component';
import { OperationsSelectComponent } from '../operations-select/operations-select.component';
import { ActivatedRoute } from '@angular/router';
import { ServiceProvider } from '../../../services/service-provider';
import { ColumnTypeMetadata, getEntitiesMetadata } from '../../../entities/metadata/entity-metadata';
import { CommonLib } from '../../../lib/common-lib';
import { NotificationService } from '../../../services/notification-service';
import { IUserDep } from '../../../interfaces/i-user-dep';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { Roleresource } from '../../../entities/user/roleresource';
import { Resource } from '../../../entities/user/resource';
import { ResourcesSelectComponent } from '../resource-select/resource-select.component';
import { Rroperation } from '../../../entities/user/rroperation';
import { Operation } from '../../../entities/user/operation';
import { OperationsResourceSelectComponent } from '../operations-resource-select/operations-resource-select.component';
import { OperationsResourceSelectModalContainerStrategy } from '../../../components/modal-container-module/strategy/operations-resource-select-modal-container-strategy';

@Component({
  templateUrl: 'role-edit.component.html'
})
@ReactiveFormDecorator()
@DeleteFormDecorator(EntityName.role)
@ExistsEntityFormDecorator()
@CancelFormDecorator()
@InvalidControlFormDecorator()
export class RoleEditComponent extends LifecycleComponent implements IReactiveForm, OnInit {

  formGroup = new FormGroup({
    idrole: new FormControl(''),
    name: new FormControl('', Validators.required),
    comment: new FormControl(''),
    active: new FormControl(''),
    dtcre: new FormControl({ value: '', disabled: true }),
  });

  changed = false;

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('resource_name', 'Resource name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('dtcre', 'Creation date', true, new FilterInfo(''), ColumnFormat.Datetime, false),
    new ColumnInfo('operations', 'Operations', true, new FilterInfo(''), ColumnFormat.Template, false),
    new ColumnInfo('actions', 'Actions', true, new FilterInfo(''), ColumnFormat.Template, false),
  ];

  roleresources: Roleresource[] = [];
  roleresourcesToDelete: Roleresource[] = [];

  @ViewChild(TemplateProviderComponent, { static: true })
  templateProvider: TemplateProviderComponent;

  constructor(public injector: Injector) {
    super();
  }

  onInit() {
    this.injector.get(ActivatedRoute).paramMap.pipe(
      switchMap(params => {
        if (params.get('id') === 'new') {
          return of({ idrole: null, dtcre: new Date(), active: true });
        } else {
          const id = Number(params.get('id'));
          return this.injector.get(ServiceProvider).getEntity<Role>(id, EntityName.role)
            .pipe(
              switchMap((entity) => {
                return this.injector.get(ServiceProvider).getEntityForField<Roleresource>('idrole', entity.idrole.toString(), EntityName.roleresource)
                  .pipe(
                    switchMap((roleresources: Roleresource[]) => {
                      return from(roleresources)
                        .pipe(
                          mergeMap((roleresource: Roleresource) => {
                            return this.injector.get(ServiceProvider).getEntityForField<Rroperation>('idroleresource', roleresource.idroleresource.toString(), EntityName.rroperation)
                              .pipe(
                                switchMap((rroperations: Rroperation[]) => {
                                  rroperations.forEach(rroperation => rroperation['roleresource'] = roleresource);
                                  roleresource['rroperations'] = rroperations;
                                  roleresource['rroperationsToDelete'] = [];
                                  return of(roleresource);
                                })
                              );
                          }),
                          reduce((acc, val) => {
                            acc.push(val);
                            return acc;
                          }, []),
                          map((roleresources: Roleresource[]) => {
                            roleresources.forEach((entity) => {
                              this.addControl(entity);
                            });
                            this.roleresources = roleresources;
                          })
                        );
                    }),
                    map(() => entity)
                  );
              })
            );
        }
      })
    ).subscribe((entity) => {
      const patchValue = <any>{ ...entity };
      const entityMetadata = getEntitiesMetadata().find(x => x.name === EntityName.role);
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
  invalidControlClass(controlName: string) {
    throw new Error('Not implemented');
  }
  isExistsEntity() {
    throw new Error('Not implemented');
  }
  cancel() {
    throw new Error('Not implemented');
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.injector.get(NotificationService).dep.pipe(
        switchMap((dep: IUserDep) => {
          let value = { ...this.formGroup.getRawValue() };
          value = CommonLib.removeEmptyPrimaryKey(value, EntityName.role);
          return this.injector.get(ServiceProvider).postEntity(value, dep.iddep, EntityName.role)
            .pipe(
              switchMap((id) => {
                return from(this.roleresources)
                  .pipe(
                    mergeMap((roleresource: Roleresource) => {
                      return (() => {
                        if (roleresource.idroleresource) {
                          return of(roleresource.idroleresource);
                        } else {
                          roleresource.idrole = id;
                          let value = { ...roleresource };
                          delete value['actions'];
                          delete value['operations'];
                          delete value['rroperations'];
                          delete value['rroperationsToDelete'];
                          return this.injector.get(ServiceProvider).postEntity(value, dep.iddep, EntityName.roleresource)
                        }
                      })()
                        .pipe(
                          switchMap((idroleresource: number) => {
                            return this.submitRroperation(roleresource['rroperations'], roleresource['rroperationsToDelete'], idroleresource, dep.iddep);
                          })
                        );
                    }),
                    reduce((acc, val) => {
                      acc.push(val);
                      return acc;
                    }, []),
                    map(() => id),
                    switchMap(() => {
                      return this.injector.get(ServiceProvider).deleteEntitys(this.roleresourcesToDelete, EntityName.roleresource);
                    })
                  );
              }),
            );
        })
      ).subscribe(() => {
        this.acceptChanges();
        this.goBack();
      });
    }
  }

  submitRroperation(rroperations: Rroperation[], rroperationsToDelete: Rroperation[], idroleresource: number, iddep: number) {
    return forkJoin(
      [
        from(rroperations.filter(x => x.idrroperation == null))
          .pipe(
            mergeMap((rroperation: Rroperation) => {
              let value = { ...rroperation };
              value.idroleresource = idroleresource;
              delete value['roleresource'];
              delete value['rroperations'];
              return this.injector.get(ServiceProvider).postEntity(value, iddep, EntityName.rroperation);
            }),
            reduce((acc, val) => {
              acc.push(val);
              return acc;
            }, []),
          ),
        this.injector.get(ServiceProvider).deleteEntitys(rroperationsToDelete, EntityName.rroperation)
      ]
    );
  }

  addResource() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select resource',
      style: 'primary',
      ctor: ResourcesSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((resource: Resource) => {
          if (resource) {
            const roleresource = <Roleresource>{
              idresource: resource.idresource,
              resource_name: resource.name,
              dtcre: new Date(),
            };
            roleresource['rroperations'] = [];
            roleresource['rroperationsToDelete'] = [];
            this.addControl(roleresource);
            this.roleresources.push(roleresource);
            this.changed = true;
            return of(roleresource);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  addControl(entity: Roleresource) {
    entity['actions'] = {
      template: this.templateProvider.gridButtons,
      context: {
        data:
        {
          buttons: [
            {
              click: this.deleteRoleresource.bind(this),
              item: { entity: entity },
              css: { 'oi-x': true, 'oi': true, 'grid-button': true },
              caption: 'Delete',
              icon: { 'fa': true, 'fa-trash': true },
            },
            {
              click: this.addOperation.bind(this),
              item: { entity: entity },
              css: { 'oi-x': true, 'oi': true, 'grid-button': true },
              caption: 'Add operation',
              icon: { 'fa': true, 'fa-plus-circle': true },
            }
          ],
        }
      }
    };

    entity['operations'] = {
      template: this.templateProvider.gridButtons,
      context: {
        data:
        {
          buttons: entity['rroperations'].map((rroperation: Rroperation) => {
            return {
              click: this.deleteRroperation.bind(this),
              item: { entity: rroperation },
              css: { 'oi-x': true, 'oi': true, 'grid-button': true },
              caption: rroperation.operation_name,
              icon: { 'fa': true, 'fa-trash': true },
            };
          }),
        }
      }
    };
  }

  deleteRroperation(rroperation: { entity: Rroperation }) {
    let rroperations = rroperation.entity['roleresource']['rroperations'];
    rroperations.splice(rroperations.indexOf(rroperation.entity), 1);
    if (rroperation.entity.idrroperation) {
      rroperation.entity['roleresource']['rroperationsToDelete'].push(rroperation.entity);
    }
    this.addControl(rroperation.entity['roleresource']);
    this.changed = true;
  }

  deleteRoleresource(roleresource: { entity: Roleresource }) {
    this.roleresources.splice(this.roleresources.indexOf(roleresource.entity), 1);
    if (roleresource.entity.idroleresource) {
      this.roleresourcesToDelete.push(roleresource.entity);
    }
    this.changed = true;
  }

  addOperation(roleresourceWrap: { entity: Roleresource }) {
    let roleresource = roleresourceWrap.entity;
    this.injector.get(ModalContainerService).show({
      caption: 'Select operation',
      style: 'primary',
      ctor: OperationsResourceSelectComponent,
      modalContainerStrategy: new OperationsResourceSelectModalContainerStrategy(roleresource.idresource)
    })
      .pipe(
        switchMap((operation: Operation) => {
          if (operation) {
            const rroperation = <Rroperation>{
              idoperation: operation.idoperation,
              operation_name: operation.name,
              dtcre: new Date(),
            };
            rroperation['roleresource'] = roleresource;
            roleresource['rroperations'].push(rroperation);
            this.addControl(roleresource);
            this.changed = true;
            return of(rroperation);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }
}
