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
import { ActivatedRoute } from '@angular/router';
import { delay, map, mergeMap, reduce, switchMap } from 'rxjs/operators';
import { ServiceProvider } from '../../../services/service-provider';
import { User } from '../../../entities/user/user';
import { ColumnTypeMetadata, getEntitiesMetadata } from '../../../entities/metadata/entity-metadata';
import { CommonLib } from '../../../lib/common-lib';
import { Userdep } from '../../../entities/user/userdep';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { ModalContainerService } from '../../../components/modal-container-module/modal-container-service';
import { ListModalContainerStrategy } from '../../../components/modal-container-module/strategy/list-modal-container-strategy';
import { DepsSelectComponent } from '../deps-select/deps-select.component';
import { Dep } from '../../../entities/user/dep';
import { TemplateProviderComponent } from '../../../lib/template-provider-component/template-provider-component';
import { NotificationService } from '../../../services/notification-service';
import { IUserDep } from '../../../interfaces/i-user-dep';
import { RolesSelectComponent } from '../roles-select/roles-select.component';
import { Role } from '../../../entities/user/role';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { DisableUIDecorator, IDisableUIComponent } from '../../../lib/disable-ui-decorator';

@Component({
  templateUrl: 'user-edit.component.html'
})
@DisableUIDecorator()
@ReactiveFormDecorator()
@DeleteFormDecorator(EntityName.user)
@ExistsEntityFormDecorator()
@CancelFormDecorator()
@InvalidControlFormDecorator()
export class UserEditComponent extends LifecycleComponent implements IReactiveForm, IDisableUIComponent {

  formGroup = new FormGroup({
    iduser: new FormControl(''),
    name: new FormControl('', Validators.required),
    comment: new FormControl(''),
    login: new FormControl(''),
    pass: new FormControl(''),
    active: new FormControl(''),
    dtcre: new FormControl({ value: '', disabled: true }),
  });

  @ViewChild(TemplateProviderComponent, { static: true })
  templateProvider: TemplateProviderComponent;

  userdeps: Userdep[] = [];
  userdepsToDelete: Userdep[] = [];

  changed = false;

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('dep_name', 'Department name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('role_name', 'Role', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('dtcre', 'Creation date', true, new FilterInfo(''), ColumnFormat.Datetime, false),
    new ColumnInfo('actions', 'Actions', true, new FilterInfo(''), ColumnFormat.Template, false),
  ];

  constructor(public injector: Injector) {
    super();
  }

  disableUI(): void { throw new Error('Not implemented'); }
  enableUI(): void { throw new Error('Not implemented'); }
  isDisabledUI(): boolean { throw new Error('Not implemented'); }

  onInit() {
    this.injector.get(ActivatedRoute).paramMap.pipe(
      switchMap(params => {
        if (params.get('id') === 'new') {
          return of({ iduser: null, dtcre: new Date() });
        } else {
          const id = Number(params.get('id'));
          return this.injector.get(ServiceProvider).getEntity<User>(id, EntityName.user)
            .pipe(
              switchMap((entity) => {
                return this.injector.get(ServiceProvider).getEntityForField<Userdep>('iduser', entity.iduser.toString(), EntityName.userdep)
                  .pipe(
                    switchMap((userdeps: Userdep[]) => {
                      userdeps.forEach((entity) => {
                        this.addControl(entity);
                      });
                      this.userdeps = userdeps;
                      return of(entity);
                    })
                  );
              })
            );
        }
      })
    ).subscribe((entity) => {
      const patchValue = <any>{ ...entity };
      const entityMetadata = getEntitiesMetadata().find(x => x.name === EntityName.user);
      if (entityMetadata) {
        for (const dateColumn of entityMetadata.columns.filter(x => x.type === ColumnTypeMetadata.date)) {
          if (entity[dateColumn.name]) {
            patchValue[dateColumn.name] = CommonLib.formatDate(entity[dateColumn.name]);
          }
        }
      }
      this.formGroup.patchValue(patchValue);
      this.enableUI();
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
  addControl(entity: Userdep) {
    entity['actions'] = {
      template: this.templateProvider.gridButtons,
      context: {
        data:
        {
          buttons: [
            {
              click: this.deleteUserdep.bind(this),
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

  deleteUserdep(userdep: { entity: Userdep }) {
    this.userdeps.splice(this.userdeps.indexOf(userdep.entity), 1);
    if (userdep.entity.iduserdep) {
      this.userdepsToDelete.push(userdep.entity);
    }
    this.changed = true;
  }

  addDep() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select role',
      style: 'primary',
      ctor: RolesSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((role: Role) => {
          if (role) {
            return of(role)
              .pipe(
                delay(200),
                switchMap(() => {
                  return this.injector.get(ModalContainerService).show({
                    caption: 'Select department',
                    style: 'primary',
                    ctor: DepsSelectComponent,
                    modalContainerStrategy: new ListModalContainerStrategy()
                  })
                    .pipe(
                      switchMap((dep: Dep) => {
                        if (dep) {
                          const userdep = <Userdep>{
                            iddep: dep.iddep,
                            idrole: role.idrole,
                            dep_name: dep.name,
                            role_name: role.name,
                            dtcre: new Date(),
                            iduser: this.formGroup.value.id,
                          };
                          this.addControl(userdep);
                          this.userdeps.push(userdep);
                          this.changed = true;
                        }
                        return of(dep);
                      })
                    );
                })
              );
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.disableUI();
      this.injector.get(NotificationService).dep.pipe(
        switchMap((dep: IUserDep) => {
          let value = { ...this.formGroup.getRawValue() };
          value = CommonLib.removeEmptyPrimaryKey(value, EntityName.user);
          return this.injector.get(ServiceProvider).postEntity(value, dep.iddep, EntityName.user)
            .pipe(
              switchMap((id) => {
                return from(this.userdeps.filter(x => x.iduserdep == null))
                  .pipe(
                    mergeMap((userdep: Userdep) => {
                      userdep.iduser = id;
                      let value = { ...userdep };
                      delete value['actions'];
                      return this.injector.get(ServiceProvider).postEntity(value, dep.iddep, EntityName.userdep);
                    }),
                    reduce((acc, val) => {
                      acc.push(val);
                      return acc;
                    }, []),
                    map(() => id),
                    switchMap(() => {
                      return this.injector.get(ServiceProvider).deleteEntitys(this.userdepsToDelete, EntityName.userdep);
                    })
                  );
              }),
            );
        })
      ).subscribe(
        () => {
          this.acceptChanges();
          this.goBack();
        },
        (error) => {
          console.error(error);
          this.enableUI();
        }
      );
    }
  }
}
