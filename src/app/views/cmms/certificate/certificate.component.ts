import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ColumnFormat, ColumnInfo } from '../../../components/at-grid/column-info';
import { FilterInfo } from '../../../components/at-grid/filter-info';
import { ModalContainerService } from '../../../components/modal-container-module/modal-container-service';
import { CertificateWoEditModalContainerStrategy } from '../../../components/modal-container-module/strategy/certificate-wo-edit-modal-container-strategy';
import { CmmsWo } from '../../../entities/cmms/cmms-wo';
import { CmmsWoSum } from '../../../entities/cmms/cmms-wo-sum';
import { EntityName } from '../../../entities/entity-name';
import { IUserDep } from '../../../interfaces/i-user-dep';
import { CancelFormDecorator } from '../../../lib/cancel-form-decorator';
import { IListComponent } from '../../../lib/i-list-component';
import { IReactiveForm } from '../../../lib/i-reactive-form';
import { InvalidControlFormDecorator } from '../../../lib/invalid-control-form-decorator';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { ReactiveFormDecorator } from '../../../lib/reactive-form-decorator';
import { NotificationService } from '../../../services/notification-service';
import { ServiceProvider } from '../../../services/service-provider';
import { CertificateWoEditComponent } from '../certificate-wo-edit/certificate-wo-edit.component';

@Component({
  templateUrl: 'certificate.component.html'
})
@ReactiveFormDecorator()
@CancelFormDecorator()
@InvalidControlFormDecorator()
export class CertificateComponent extends LifecycleComponent implements IListComponent<CmmsWo>, OnInit, IReactiveForm {

  formGroup = new FormGroup({
    dt_start: new FormControl('', Validators.required),
    dt_end: new FormControl('', Validators.required),
  });

  changed = false;

  constructor(public injector: Injector) {
    super();
  }

  positions: CmmsWo[] = [];
  positions2: CmmsWoSum[] = [];

  gridMetaData: ColumnInfo[] = [
    new ColumnInfo('work_order_no', 'Work Order No', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('attribute1', 'Attribute1', true, new FilterInfo(''), ColumnFormat.Default, false),
    // new ColumnInfo('work_order_type', 'work_order_type', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('attribute4', 'Complited by superwiser', true, new FilterInfo(''), ColumnFormat.Date, false),
    new ColumnInfo('asset_number', 'Asset Number', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('asset_description', 'Asset Description', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('department', 'Department', true, new FilterInfo(''), ColumnFormat.Default, false),
    // new ColumnInfo('wip_accounting_class', 'wip_accounting_class', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('qty', 'Qty', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('contract_line', 'Contract line', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('description', 'Description', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('activity', 'Activity', true, new FilterInfo(''), ColumnFormat.Default, false),
    // new ColumnInfo('unit_rate', 'unit_rate', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  gridMetaDataCert: ColumnInfo[] = [
    new ColumnInfo('attribute1', 'Attribute1', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('department', 'Department', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('wip_accounting_class', 'WIP Accounting Class', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('contract_line', 'Contract line', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('description', 'Description', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('activity', 'Activity', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('qty', 'Qty', true, new FilterInfo(''), ColumnFormat.Default, false),
    new ColumnInfo('unit_rate', 'unit_rate', true, new FilterInfo(''), ColumnFormat.Default, false),
  ];

  newItem() {
    throw new Error('Not implemented');
  }
  selectRow(entity) {
    // this.injector.get(Router).navigate([`${entityName}/${entity[entitiesMetadata.pkName]}`], { relativeTo: this.injector.get(ActivatedRoute).parent });
    this.injector.get(ModalContainerService).show({
      caption: 'Change WO form',
      style: 'primary',
      ctor: CertificateWoEditComponent,
      modalContainerStrategy: new CertificateWoEditModalContainerStrategy(entity)
    })
      .pipe(
        switchMap((cmmsWo: CmmsWo) => {
          return this.injector.get(NotificationService).dep.pipe(
            switchMap((dep: IUserDep) => {
              return this.injector.get(ServiceProvider).postEntity(cmmsWo, dep.iddep, EntityName.cmms_wo);
            })
          );
        })
      )
      .subscribe(() => {
        console.log('post cmms_wo ok');
      },
      (error) => {
        console.error(error);
      });
  }
  onInit(): void {
    this.positions = [];
  }

  loadCmmsWo() {
    this.positions2 = [];
    let serviceProvider = this.injector.get(ServiceProvider);
    serviceProvider.getEntityListUrl<CmmsWo>(`certificate_wo/${this.formGroup.get('dt_start').value}/${this.formGroup.get('dt_end').value}`)
      .pipe(
        map((entities: CmmsWo[]) => {
          return entities.map(x => serviceProvider.loadRawData(x, EntityName.cmms_wo));;
        })
      )
      .subscribe(
        (positions) => {
          this.positions = positions;
          this.acceptChanges();
        }
      );
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
    this.loadCmmsWo();
  }
  invalidControlClass(controlName: string) {
    throw new Error('Not implemented');
  }

  createCertificate() {
    let serviceProvider = this.injector.get(ServiceProvider);
    serviceProvider.getEntityListUrl<CmmsWoSum>(`certificate_wo_sum/${this.formGroup.get('dt_start').value}/${this.formGroup.get('dt_end').value}`)
      .pipe(
        map((entities: CmmsWoSum[]) => {
          return entities.map(x => serviceProvider.loadRawData(x, EntityName.cmms_wo_sum));;
        })
      )
      .subscribe(
        (positions) => {
          this.positions2 = positions;
          this.acceptChanges();
        }
      );
  }
}
