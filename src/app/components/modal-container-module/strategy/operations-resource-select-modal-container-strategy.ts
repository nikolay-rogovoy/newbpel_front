import { Operation } from '../../../entities/user/operation';
import { OperationsResourceSelectComponent } from '../../../views/users/operations-resource-select/operations-resource-select.component';
import { IModalContainerStrategy } from '../i-modal-container-strategy';
import { ModalContainerComponent } from '../modal-container-component/modal-container-component';

/***/
export class OperationsResourceSelectModalContainerStrategy implements IModalContainerStrategy<OperationsResourceSelectComponent> {

  /***/
  constructor(public idresource: number) {
  }

  /***/
  prepare(component: OperationsResourceSelectComponent, modalContainerComponent: ModalContainerComponent) {
    component.idresource.next(this.idresource);
    component.selection.subscribe((entity: Operation) => {
      modalContainerComponent.ok(entity);
    });
  }
}
