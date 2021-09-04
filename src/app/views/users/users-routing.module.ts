import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckSaveGuard } from '../../lib/check-save-guard';
import { DepEditComponent } from './dep-edit/dep-edit.component';
import { DepsComponent } from './deps/deps.component';
import { OperationEditComponent } from './operation-edit/operation-edit.component';
import { OperationsComponent } from './operations/operations.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { ResourcesComponent } from './resources/resources.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RolesComponent } from './roles/roles.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'user/:id',
        component: UserEditComponent,
        data: {
          title: 'User'
        },
        canDeactivate: [CheckSaveGuard]
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Roles'
        }
      },
      {
        path: 'role/:id',
        component: RoleEditComponent,
        data: {
          title: 'Role'
        },
        canDeactivate: [CheckSaveGuard]
      },
      {
        path: 'deps',
        component: DepsComponent,
        data: {
          title: 'Departments'
        }
      },
      {
        path: 'dep/:id',
        component: DepEditComponent,
        data: {
          title: 'Department'
        },
        canDeactivate: [CheckSaveGuard]
      },

      {
        path: 'operations',
        component: OperationsComponent,
        data: {
          title: 'Operations'
        }
      },
      {
        path: 'operation/:id',
        component: OperationEditComponent,
        data: {
          title: 'Operation'
        },
        canDeactivate: [CheckSaveGuard]
      },

      {
        path: 'resources',
        component: ResourcesComponent,
        data: {
          title: 'Resources'
        }
      },
      {
        path: 'resource/:id',
        component: ResourceEditComponent,
        data: {
          title: 'Resource'
        },
        canDeactivate: [CheckSaveGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
