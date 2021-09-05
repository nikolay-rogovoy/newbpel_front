import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AtGridModule } from '../../components/at-grid/at-grid-module';
import { TemplateProviderModule } from '../../lib/template-provider-component/template-provider-module';
import { CertificateWoEditComponent } from './certificate-wo-edit/certificate-wo-edit.component';
import { CertificateComponent } from './certificate/certificate.component';
import { CmmsRoutingModule } from './cmms-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CmmsRoutingModule,
    AtGridModule,
    ReactiveFormsModule,
    TemplateProviderModule,
  ],
  declarations: [
    CertificateComponent,
    CertificateWoEditComponent,
  ],
  entryComponents: [
    CertificateWoEditComponent
  ]
})
export class CmmsModule { }
