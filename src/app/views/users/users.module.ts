import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AtGridModule } from '../../components/at-grid/at-grid-module';
import { TemplateProviderModule } from '../../lib/template-provider-component/template-provider-module';
import { DepEditComponent } from './dep-edit/dep-edit.component';
import { DepsSelectComponent } from './deps-select/deps-select.component';
import { DepsComponent } from './deps/deps.component';
import { OperationEditComponent } from './operation-edit/operation-edit.component';
import { OperationsResourceSelectComponent } from './operations-resource-select/operations-resource-select.component';
import { OperationsSelectComponent } from './operations-select/operations-select.component';
import { OperationsComponent } from './operations/operations.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { ResourcesSelectComponent } from './resource-select/resource-select.component';
import { ResourcesComponent } from './resources/resources.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RolesSelectComponent } from './roles-select/roles-select.component';
import { RolesComponent } from './roles/roles.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    AtGridModule,
    ReactiveFormsModule,
    TemplateProviderModule,
  ],
  declarations: [
    UsersComponent,
    UserEditComponent,
    RolesComponent,
    RoleEditComponent,
    DepsComponent,
    DepEditComponent,
    DepsSelectComponent,
    RolesSelectComponent,
    OperationEditComponent,
    OperationsComponent,
    OperationsSelectComponent,
    OperationsResourceSelectComponent,
    ResourcesComponent,
    ResourceEditComponent,
    ResourcesSelectComponent,
  ],
  entryComponents: [
    RolesSelectComponent,
    DepsSelectComponent,
    OperationsSelectComponent,
    OperationsResourceSelectComponent,
    ResourcesComponent,
    ResourcesSelectComponent,
  ]
})
export class UsersModule { }
