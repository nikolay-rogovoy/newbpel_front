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
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, reduce, switchMap } from 'rxjs/operators';
import { ServiceProvider } from '../../../services/service-provider';
import { Room } from '../../../entities/room/room';
import { ColumnTypeMetadata, getEntitiesMetadata } from '../../../entities/metadata/entity-metadata';
import { CommonLib } from '../../../lib/common-lib';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { ModalContainerService } from '../../../components/modal-container-module/modal-container-service';
import { ListModalContainerStrategy } from '../../../components/modal-container-module/strategy/list-modal-container-strategy';
import { TemplateProviderComponent } from '../../../lib/template-provider-component/template-provider-component';
import { NotificationService } from '../../../services/notification-service';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { Roombathroom } from '../../../entities/room/roombathroom';
import { BathroomsSelectComponent } from '../bathroom-select/bathrooms-select.component';
import { Bathroom } from '../../../entities/room/bathroom';
import { IUserDep } from '../../../interfaces/i-user-dep';
import { BathrobesSelectComponent } from '../bathrobes-select/bathrobes-select.component';
import { Bathrobe } from '../../../entities/room/bathrobe';
import { RoomtypesSelectComponent } from '../roomtypes-select/roomtypes-select.component';
import { Roomtype } from '../../../entities/room/roomtype';
import { BedsSelectComponent } from '../bed-select/beds-select.component';
import { Bed } from '../../../entities/room/bed';
import { IsFormValueDecorator } from '../../../lib/is-form-value-decorator';
import { ExtrabedsSelectComponent } from '../extrabeds-select/extrabeds-select.component';
import { Extrabed } from '../../../entities/room/extrabed';
import { FridgesSelectComponent } from '../fridges-select/fridges-select.component';
import { Fridge } from '../../../entities/room/fridge';
import { KitchensSelectComponent } from '../kitchens-select/kitchens-select.component';
import { SafesSelectComponent } from '../safes-select/safes-select.component';
import { Safe } from '../../../entities/room/safe';
import { Kitchen } from '../../../entities/room/kitchen';
import { TvsSelectComponent } from '../tvs-select/tvs-select.component';
import { Tv } from '../../../entities/room/tv';
import { IronsSelectComponent } from '../irons-select/irons-select.component';
import { Iron } from '../../../entities/room/iron';
import { HygienekitsSelectComponent } from '../hygienekits-select/hygienekits-select.component';
import { Hygienekit } from '../../../entities/room/hygienekit';
import { TempcontrolsSelectComponent } from '../tempcontrols-select/tempcontrols-select.component';
import { Tempcontrol } from '../../../entities/room/tempcontrol';
import { InternetsSelectComponent } from '../internets-select/internets-select.component';
import { Internet } from '../../../entities/room/internet';
import { Roomextraroom } from '../../../entities/room/roomextraroom';
import { ExtraroomsSelectComponent } from '../extrarooms-select/extrarooms-select.component';
import { Extraroom } from '../../../entities/room/extraroom';
import { Roombathrobe } from '../../../entities/room/roombathrobe';
import { DisableUIDecorator, IDisableUIComponent } from '../../../lib/disable-ui-decorator';

@Component({
  templateUrl: 'room-edit.component.html',
  styleUrls: ['room-edit.component.scss']
})
@DisableUIDecorator()
@ReactiveFormDecorator()
@IsFormValueDecorator()
@DeleteFormDecorator(EntityName.room)
@ExistsEntityFormDecorator()
@CancelFormDecorator()
@InvalidControlFormDecorator()
export class RoomEditComponent extends LifecycleComponent implements IReactiveForm, IDisableUIComponent {

  formGroup = new FormGroup({
    idroom: new FormControl(''),
    name: new FormControl('', Validators.required),
    comment: new FormControl(''),
    active: new FormControl(''),
    dtcre: new FormControl({ value: '', disabled: true }),
    square: new FormControl(''),
    dishes: new FormControl(''),
    hairdryer: new FormControl(''),
    idroomtype: new FormControl(''),
    roomtype_name: new FormControl('', Validators.required),
    idbed: new FormControl(''),
    bed_name: new FormControl(''),
    idextrabed: new FormControl(''),
    extrabed_name: new FormControl(''),
    idfridge: new FormControl(''),
    fridge_name: new FormControl(''),
    idkitchen: new FormControl(''),
    kitchen_name: new FormControl(''),
    idsafe: new FormControl(''),
    safe_name: new FormControl(''),
    idtv: new FormControl(''),
    tv_name: new FormControl(''),
    idiron: new FormControl(''),
    iron_name: new FormControl(''),
    idhygienekit: new FormControl(''),
    hygienekit_name: new FormControl(''),
    idtempcontrol: new FormControl(''),
    tempcontrol_name: new FormControl(''),
    idinternet: new FormControl(''),
    internet_name: new FormControl(''),
  });

  @ViewChild(TemplateProviderComponent, { static: true })
  templateProvider: TemplateProviderComponent;

  roombathrooms: Roombathroom[] = [];
  roombathroomsToDelete: Roombathroom[] = [];

  roombathrobes: Roombathrobe[] = [];
  roombathrobesToDelete: Roombathrobe[] = [];

  roomextrarooms: Roomextraroom[] = [];
  roomextraroomsToDelete: Roomextraroom[] = [];

  changed = false;

  gridMetaData_bathroom: ColumnInfo[] = [
    new ColumnInfo('bathroom_name', 'Bathroom name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('dtcre', 'Creation date', true, new FilterInfo(''), ColumnFormat.Datetime, false),
    new ColumnInfo('actions', 'Actions', true, new FilterInfo(''), ColumnFormat.Template, false),
  ];
  gridMetaData_bathrobe: ColumnInfo[] = [
    new ColumnInfo('bathrobe_name', 'Bathrobe name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('dtcre', 'Creation date', true, new FilterInfo(''), ColumnFormat.Datetime, false),
    new ColumnInfo('actions', 'Actions', true, new FilterInfo(''), ColumnFormat.Template, false),
  ];
  gridMetaData_extraroom: ColumnInfo[] = [
    new ColumnInfo('extraroom_name', 'Extraroom name', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('dtcre', 'Creation date', true, new FilterInfo(''), ColumnFormat.Datetime, false),
    new ColumnInfo('actions', 'Actions', true, new FilterInfo(''), ColumnFormat.Template, false),
  ];

  constructor(public injector: Injector) {
    super();
  }

  onInit() {
    this.injector.get(ActivatedRoute).paramMap.pipe(
      switchMap(params => {
        if (params.get('id') === 'new') {
          return of({ idroom: null, dtcre: new Date(), active: true });
        } else {
          const id = Number(params.get('id'));
          return this.injector.get(ServiceProvider).getEntity<Room>(id, EntityName.room)
            .pipe(
              switchMap((entity) => {
                return forkJoin(
                  [
                    this.injector.get(ServiceProvider).getEntityForField<Roombathroom>('idroom', entity.idroom.toString(), EntityName.roombathroom)
                      .pipe(
                        switchMap((roombathrooms: Roombathroom[]) => {
                          roombathrooms.forEach((entity) => {
                            this.addControl_roombathroom(entity);
                          });
                          this.roombathrooms = roombathrooms;
                          return of(entity);
                        })
                      ),
                    this.injector.get(ServiceProvider).getEntityForField<Roombathrobe>('idroom', entity.idroom.toString(), EntityName.roombathrobe)
                      .pipe(
                        switchMap((roombathrobes: Roombathrobe[]) => {
                          roombathrobes.forEach((entity) => {
                            this.addControl_roombathrobe(entity);
                          });
                          this.roombathrobes = roombathrobes;
                          return of(entity);
                        })
                      ),
                    this.injector.get(ServiceProvider).getEntityForField<Roomextraroom>('idroom', entity.idroom.toString(), EntityName.roomextraroom)
                      .pipe(
                        switchMap((roomextrarooms: Roomextraroom[]) => {
                          roomextrarooms.forEach((entity) => {
                            this.addControl_roomextraroom(entity);
                          });
                          this.roomextrarooms = roomextrarooms;
                          return of(entity);
                        })
                      ),
                  ])
                  .pipe(
                    switchMap(() => {
                      return of(entity);
                    })
                  );
              })
            );
        }
      })
    ).subscribe((entity) => {
      const patchValue = <any>{ ...entity };
      const entityMetadata = getEntitiesMetadata().find(x => x.name === EntityName.room);
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
  isValue(propertyName: string) {
    throw new Error('Not implemented');
  }

  addControl_roombathroom(entity: Roombathroom) {
    entity['actions'] = {
      template: this.templateProvider.gridButtons,
      context: {
        data:
        {
          buttons: [
            {
              click: this.deleteRoombathroom.bind(this),
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
  addControl_roombathrobe(entity: Roombathrobe) {
    entity['actions'] = {
      template: this.templateProvider.gridButtons,
      context: {
        data:
        {
          buttons: [
            {
              click: this.deleteRoombathrobe.bind(this),
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
  addControl_roomextraroom(entity: Roomextraroom) {
    entity['actions'] = {
      template: this.templateProvider.gridButtons,
      context: {
        data:
        {
          buttons: [
            {
              click: this.deleteRoomextraroom.bind(this),
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

  deleteRoombathrobe(roomdep: { entity: Roombathrobe }) {
    this.roombathrobes.splice(this.roombathrobes.indexOf(roomdep.entity), 1);
    if (roomdep.entity.idroombathrobe) {
      this.roombathrobesToDelete.push(roomdep.entity);
    }
    this.changed = true;
  }

  deleteRoombathroom(roomdep: { entity: Roombathroom }) {
    this.roombathrooms.splice(this.roombathrooms.indexOf(roomdep.entity), 1);
    if (roomdep.entity.idroombathroom) {
      this.roombathroomsToDelete.push(roomdep.entity);
    }
    this.changed = true;
  }

  deleteRoomextraroom(roomdep: { entity: Roomextraroom }) {
    this.roomextrarooms.splice(this.roomextrarooms.indexOf(roomdep.entity), 1);
    if (roomdep.entity.idroomextraroom) {
      this.roomextraroomsToDelete.push(roomdep.entity);
    }
    this.changed = true;
  }

  addRoombathroom() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select Bathroom',
      style: 'primary',
      ctor: BathroomsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((bathroom: Bathroom) => {
          if (bathroom) {
            const roombathroom = <Roombathroom>{
              idbathroom: bathroom.idbathroom,
              dtcre: new Date(),
              bathroom_name: bathroom.name,
              idroom: this.formGroup.value.id,
            };
            this.addControl_roombathroom(roombathroom);
            this.roombathrooms.push(roombathroom);
            this.changed = true;
            return of(roombathroom);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  addRoombathrobe() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select Bathrobe',
      style: 'primary',
      ctor: BathrobesSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((bathrobe: Bathrobe) => {
          if (bathrobe) {
            const roombathrobe = <Roombathrobe>{
              idbathrobe: bathrobe.idbathrobe,
              dtcre: new Date(),
              bathrobe_name: bathrobe.name,
              idroom: this.formGroup.value.id,
            };
            this.addControl_roombathrobe(roombathrobe);
            this.roombathrobes.push(roombathrobe);
            this.changed = true;
            return of(roombathrobe);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  addRoomextraroom() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select Extraroom',
      style: 'primary',
      ctor: ExtraroomsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((extraroom: Extraroom) => {
          if (extraroom) {
            const roomextraroom = <Roomextraroom>{
              idextraroom: extraroom.idextraroom,
              dtcre: new Date(),
              extraroom_name: extraroom.name,
              idroom: this.formGroup.value.id,
            };
            this.addControl_roomextraroom(roomextraroom);
            this.roomextrarooms.push(roomextraroom);
            this.changed = true;
            return of(roomextraroom);
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
          value = CommonLib.removeEmptyPrimaryKey(value, EntityName.room);
          if (value.square === '') {
            value.square = null;
          } else {
            value.square = Number.parseFloat(value.square);
          }
          if (value.dishes === '') {
            value.dishes = null;
          }
          if (value.hairdryer === '') {
            value.hairdryer = null;
          }
          return this.injector.get(ServiceProvider).postEntity(value, dep.iddep, EntityName.room)
            .pipe(
              switchMap((id) => {
                return forkJoin(
                  [this.saveRoombathrooms(id, dep.iddep), this.saveRoombathrobes(id, dep.iddep), this.saveRoomextrarooms(id, dep.iddep)]
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

  saveRoombathrooms(id: number, iddep: number) {
    return from(this.roombathrooms.filter(x => x.idroombathroom == null))
      .pipe(
        mergeMap((roombathroom: Roombathroom) => {
          roombathroom.idroom = id;
          let value = { ...roombathroom };
          delete value['actions'];
          return this.injector.get(ServiceProvider).postEntity(value, iddep, EntityName.roombathroom);
        }),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        map(() => id),
        switchMap(() => {
          return this.injector.get(ServiceProvider).deleteEntitys(this.roombathroomsToDelete, EntityName.roombathroom);
        })
      );
  }

  saveRoombathrobes(id: number, iddep: number) {
    return from(this.roombathrobes.filter(x => x.idroombathrobe == null))
      .pipe(
        mergeMap((roombathrobe: Roombathrobe) => {
          roombathrobe.idroom = id;
          let value = { ...roombathrobe };
          delete value['actions'];
          return this.injector.get(ServiceProvider).postEntity(value, iddep, EntityName.roombathrobe);
        }),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        map(() => id),
        switchMap(() => {
          return this.injector.get(ServiceProvider).deleteEntitys(this.roombathrobesToDelete, EntityName.roombathrobe);
        })
      );
  }

  saveRoomextrarooms(id: number, iddep: number) {
    return from(this.roomextrarooms.filter(x => x.idroomextraroom == null))
      .pipe(
        mergeMap((roomextraroom: Roomextraroom) => {
          roomextraroom.idroom = id;
          let value = { ...roomextraroom };
          delete value['actions'];
          return this.injector.get(ServiceProvider).postEntity(value, iddep, EntityName.roomextraroom);
        }),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        map(() => id),
        switchMap(() => {
          return this.injector.get(ServiceProvider).deleteEntitys(this.roomextraroomsToDelete, EntityName.roomextraroom);
        })
      );
  }

  selectRoomtype() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select room type',
      style: 'primary',
      ctor: RoomtypesSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((roomtype: Roomtype) => {
          if (roomtype) {
            this.formGroup.patchValue({
              idroomtype: roomtype.idroomtype,
              roomtype_name: roomtype.name,
            });
            this.changed = true;
            return of(roomtype);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  selectBed() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select bed',
      style: 'primary',
      ctor: BedsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((bed: Bed) => {
          if (bed) {
            this.formGroup.patchValue({
              idbed: bed.idbed,
              bed_name: bed.name,
            });
            this.changed = true;
            return of(bed);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearBed() {
    this.formGroup.patchValue({
      idbed: null,
      bed_name: '',
    });
    this.changed = true;
  }

  selectExtrabed() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select extrabed',
      style: 'primary',
      ctor: ExtrabedsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((extrabed: Extrabed) => {
          if (extrabed) {
            this.formGroup.patchValue({
              idextrabed: extrabed.idextrabed,
              extrabed_name: extrabed.name,
            });
            this.changed = true;
            return of(extrabed);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearExtrabed() {
    this.formGroup.patchValue({
      idextrabed: null,
      extrabed_name: '',
    });
    this.changed = true;
  }

  selectFridge() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select fridge',
      style: 'primary',
      ctor: FridgesSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((fridge: Fridge) => {
          if (fridge) {
            this.formGroup.patchValue({
              idfridge: fridge.idfridge,
              fridge_name: fridge.name,
            });
            this.changed = true;
            return of(fridge);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearFridge() {
    this.formGroup.patchValue({
      idfridge: null,
      fridge_name: '',
    });
    this.changed = true;
  }

  selectKitchen() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select kitchen',
      style: 'primary',
      ctor: KitchensSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((kitchen: Kitchen) => {
          if (kitchen) {
            this.formGroup.patchValue({
              idkitchen: kitchen.idkitchen,
              kitchen_name: kitchen.name,
            });
            this.changed = true;
            return of(kitchen);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearKitchen() {
    this.formGroup.patchValue({
      idkitchen: null,
      kitchen_name: '',
    });
    this.changed = true;
  }

  selectSafe() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select safe',
      style: 'primary',
      ctor: SafesSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((safe: Safe) => {
          if (safe) {
            this.formGroup.patchValue({
              idsafe: safe.idsafe,
              safe_name: safe.name,
            });
            this.changed = true;
            return of(safe);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearSafe() {
    this.formGroup.patchValue({
      idsafe: null,
      safe_name: '',
    });
    this.changed = true;
  }

  selectTv() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select tv',
      style: 'primary',
      ctor: TvsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((tv: Tv) => {
          if (tv) {
            this.formGroup.patchValue({
              idtv: tv.idtv,
              tv_name: tv.name,
            });
            this.changed = true;
            return of(tv);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearTv() {
    this.formGroup.patchValue({
      idtv: null,
      tv_name: '',
    });
    this.changed = true;
  }

  selectIron() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select iron',
      style: 'primary',
      ctor: IronsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((iron: Iron) => {
          if (iron) {
            this.formGroup.patchValue({
              idiron: iron.idiron,
              iron_name: iron.name,
            });
            this.changed = true;
            return of(iron);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearIron() {
    this.formGroup.patchValue({
      idiron: null,
      iron_name: '',
    });
    this.changed = true;
  }

  selectHygienekit() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select hygienekit',
      style: 'primary',
      ctor: HygienekitsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((hygienekit: Hygienekit) => {
          if (hygienekit) {
            this.formGroup.patchValue({
              idhygienekit: hygienekit.idhygienekit,
              hygienekit_name: hygienekit.name,
            });
            this.changed = true;
            return of(hygienekit);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearHygienekit() {
    this.formGroup.patchValue({
      idhygienekit: null,
      hygienekit_name: '',
    });
    this.changed = true;
  }

  selectTempcontrol() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select tempcontrol',
      style: 'primary',
      ctor: TempcontrolsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((tempcontrol: Tempcontrol) => {
          if (tempcontrol) {
            this.formGroup.patchValue({
              idtempcontrol: tempcontrol.idtempcontrol,
              tempcontrol_name: tempcontrol.name,
            });
            this.changed = true;
            return of(tempcontrol);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearTempcontrol() {
    this.formGroup.patchValue({
      idtempcontrol: null,
      tempcontrol_name: '',
    });
    this.changed = true;
  }

  selectInternet() {
    this.injector.get(ModalContainerService).show({
      caption: 'Select internet',
      style: 'primary',
      ctor: InternetsSelectComponent,
      modalContainerStrategy: new ListModalContainerStrategy()
    })
      .pipe(
        switchMap((internet: Internet) => {
          if (internet) {
            this.formGroup.patchValue({
              idinternet: internet.idinternet,
              internet_name: internet.name,
            });
            this.changed = true;
            return of(internet);
          } else {
            return of(false);
          }
        })
      )
      .subscribe();
  }

  clearInternet() {
    this.formGroup.patchValue({
      idinternet: null,
      internet_name: '',
    });
    this.changed = true;
  }
  disableUI(): void { throw new Error('Not implemented'); }
  enableUI(): void { throw new Error('Not implemented'); }
  isDisabledUI(): boolean { throw new Error('Not implemented'); }

}
