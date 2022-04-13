import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentCreatorService } from '~root/core/services/component-creator.service';
import { SignXdrComponent } from '~root/shared/modals/components/sign-xdr/sign-xdr.component';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { XdrSignerComponent } from '~root/shared/modals/components/xdr-signer/xdr-signer.component';
import { StellarSdkService } from '~root/gateways/stellar/stellar-sdk.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-import-xdr',
  templateUrl: './import-xdr.component.html',
  styleUrls: ['./import-xdr.component.scss']
})
export class ImportXdrComponent implements OnInit {
  sendingTransaction$ = new BehaviorSubject<boolean>(false);

  componentDestroyed$: Subject<void> = new Subject<void>();
  signControl: FormControl = new FormControl('', Validators.required);
  signedControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private readonly router: Router,
    private readonly componentCreatorService: ComponentCreatorService,
    private readonly nzDrawerService: NzDrawerService,
    private readonly stellarSdkService: StellarSdkService,
    private readonly nzMessageService: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  async onSign(): Promise<void> {
    if (this.signControl.invalid) {
      throw new Error(`We can't continue, XDR value is invalid`);
    }

    const nzRef = this.nzDrawerService.create<XdrSignerComponent>({
      nzContent: XdrSignerComponent,
      nzWrapClassName: 'drawer-full-w-320',
      nzTitle: 'Remove LP Asset',
      nzContentParams: {
        xdr: this.signControl.value,
        acceptHandler: signedXdr => {
          this.signedControl.patchValue(signedXdr);
        }
      }
    });

    nzRef.open();

  }

  onBack(): void {
    this.router.navigate(['/lab']);
  }

  async onSubmit(): Promise<void> {
    if (this.signedControl.invalid) {
      return;
    }

    try {
      this.sendingTransaction$.next(true);
      await this.stellarSdkService.submitTransaction(this.signedControl.value);
      this.sendingTransaction$.next(false);
      this.nzMessageService.success('Transaction accepted by the network!');
    } catch (e) {
      this.sendingTransaction$.next(false);
      this.nzMessageService.error('Transaction was rejected by the network');
    }

    this.signedControl.reset();
  }

}
