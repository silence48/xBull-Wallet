import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalsService } from '~root/shared/modals/modals.service';
import { FormsComponentsModule } from '~root/shared/forms-components/forms-components.module';
import { LoadingModule } from '~root/shared/loading/loading.module';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { SignXdrComponent } from './components/sign-xdr/sign-xdr.component';
import { SignPasswordComponent } from './components/sign-password/sign-password.component';
import { HardConfirmComponent } from './components/hard-confirm/hard-confirm.component';
import { PressButtonModule } from '~root/shared/press-button/press-button.module';
import { SharedPipesModule } from '~root/shared/shared-pipes/shared-pipes.module';
import { ClipboardModule } from '~root/shared/clipboard/clipboard.module';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { XdrSignerComponent } from '~root/shared/modals/components/xdr-signer/xdr-signer.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {PasswordModalComponent} from "~root/shared/modals/components/password-modal/password-modal.component";
import {NzInputModule} from "ng-zorro-antd/input";

const COMPONENTS = [
  ModalContainerComponent,
  ModalWrapperComponent,
  SignXdrComponent,
  SignPasswordComponent,
  HardConfirmComponent,
  XdrSignerComponent,
  PasswordModalComponent,
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule,
    FormsComponentsModule,
    LoadingModule,
    PressButtonModule,
    SharedPipesModule,
    ClipboardModule,
    NzImageModule,
    NzMessageModule,
    NzButtonModule,
    NzInputModule,
  ],
})
export class ModalsModule {
  static forRoot(): ModuleWithProviders<ModalsModule> {
    return {
      ngModule: ModalsModule,
      providers: [
        ModalsService,
      ]
    };
  }
}
