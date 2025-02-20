import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { FormsComponentsModule } from '~root/shared/forms-components/forms-components.module';
import { LoadingModule } from '~root/shared/loading/loading.module';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { SignPasswordComponent } from './components/sign-password/sign-password.component';
import { HardConfirmComponent } from './components/hard-confirm/hard-confirm.component';
import { PressButtonModule } from '~root/shared/press-button/press-button.module';
import { SharedPipesModule } from '~root/shared/shared-pipes/shared-pipes.module';
import { ClipboardModule } from '~root/shared/clipboard/clipboard.module';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { XdrSignerComponent } from '~root/shared/shared-modals/components/xdr-signer/xdr-signer.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PasswordModalComponent } from '~root/shared/shared-modals/components/password-modal/password-modal.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { QrScanModalComponent } from '~root/shared/shared-modals/components/qr-scan-modal/qr-scan-modal.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TranslationModule } from '~root/translation.module';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {
  AirgappedXdrSignerComponent
} from '~root/shared/shared-modals/components/airgapped-xdr-signer/airgapped-xdr-signer.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {
  AirgappedPublicKeyComponent
} from '~root/shared/shared-modals/components/airgapped-public-key/airgapped-public-key.component';

const COMPONENTS = [
  ModalContainerComponent,
  ModalWrapperComponent,
  SignPasswordComponent,
  HardConfirmComponent,
  XdrSignerComponent,
  PasswordModalComponent,
  QrScanModalComponent,
  AirgappedXdrSignerComponent,
  AirgappedPublicKeyComponent,
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
    NzModalModule,
    NzSpinModule,
    NzCardModule,
    TranslationModule.forChild(),
    NzTreeModule,
    NzTabsModule,
    NzSwitchModule,
  ],
})
export class ModalsModule {}
