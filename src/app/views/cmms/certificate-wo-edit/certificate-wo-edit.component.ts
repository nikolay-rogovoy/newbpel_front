import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormDecorator } from '../../../lib/reactive-form-decorator';
import { IReactiveForm } from '../../../lib/i-reactive-form';
import { InvalidControlFormDecorator } from '../../../lib/invalid-control-form-decorator';
import { LifecycleComponent } from '../../../lib/lifecycle-component';
import { CmmsWo } from '../../../entities/cmms/cmms-wo';
import { CommonLib } from '../../../lib/common-lib';

@Component({
  templateUrl: 'certificate-wo-edit.component.html'
})
@ReactiveFormDecorator()
@InvalidControlFormDecorator()
export class CertificateWoEditComponent extends LifecycleComponent implements IReactiveForm, OnInit {

  formGroup = new FormGroup({
    work_order_no: new FormControl('', Validators.required),
    attribute4: new FormControl('', Validators.required),
  });

  private _cmmsWo: CmmsWo

  @Input()
  set cmmsWo(cmmsWo: CmmsWo) {
    this._cmmsWo = cmmsWo;
    let patchValue = <any>{ ...cmmsWo };
    patchValue.attribute4 = CommonLib.formatDate(cmmsWo.attribute4);

    this.formGroup.patchValue(patchValue);
  };

  @Output()
  submit = new EventEmitter<CmmsWo>();

  changed = false;

  constructor(public injector: Injector) {
    super();
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
    this.submit.next(null);
  }
  onSubmit() {
    this._cmmsWo.attribute4 = new Date(Date.parse(this.formGroup.getRawValue().attribute4));
    this.submit.next(this._cmmsWo);
  }
  invalidControlClass(controlName: string) {
    throw new Error('Not implemented');
  }
  isExistsEntity() {
    throw new Error('Not implemented');
  }
}
