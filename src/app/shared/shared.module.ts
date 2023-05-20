import { ModuleWithProviders, NgModule } from '@angular/core';

import { TransferHttpModule } from '@gorniv/ngx-universal';

import { LayoutsModule } from './layouts/layouts.module';
import { SharedMetaModule } from './shared-meta';
import { SharedFormsModule } from '@shared/shared-forms/shared-forms.module';
import { CommonService } from './services/common.service';

@NgModule({
  exports: [LayoutsModule, SharedMetaModule, TransferHttpModule],
  providers: [
    CommonService
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return { ngModule: SharedModule };
  }
}
