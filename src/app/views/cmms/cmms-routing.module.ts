import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckSaveGuard } from '../../lib/check-save-guard';
import { CertificateComponent } from './certificate/certificate.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'CMMS'
    },
    children: [
      {
        path: 'certificate',
        component: CertificateComponent,
        data: {
          title: 'Certificate'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmmsRoutingModule { }
