import { CmmsWo } from '../../../entities/cmms/cmms-wo';
import { IEntity } from '../../../entities/i-entity';
import { IListSelectComponent } from '../../../lib/i-list-select-component';
import { CertificateWoEditComponent } from '../../../views/cmms/certificate-wo-edit/certificate-wo-edit.component';
import { IModalContainerStrategy } from '../i-modal-container-strategy';
import { ModalContainerComponent } from '../modal-container-component/modal-container-component';

/***/
export class CertificateWoEditModalContainerStrategy implements IModalContainerStrategy<CertificateWoEditComponent> {

  /***/
  constructor(private cmmsWo: CmmsWo) {
  }

  /***/
  prepare(component: CertificateWoEditComponent, modalContainerComponent: ModalContainerComponent) {
    component.cmmsWo = this.cmmsWo;
    component.submit.subscribe((entity: CmmsWo) => {
      modalContainerComponent.ok(entity);
    });
  }
}
