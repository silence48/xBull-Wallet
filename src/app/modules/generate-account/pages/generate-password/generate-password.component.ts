import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GenerateAccountService } from '~root/modules/generate-account/state';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss']
})
export class GeneratePasswordComponent implements OnInit {
  passwordFormControl: FormControlTyped<string> = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(
    private readonly generateAccountService: GenerateAccountService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onContinue(): void {
    if (this.passwordFormControl.invalid) {
      return;
    }

    this.generateAccountService.savePassword(this.passwordFormControl.value);
    this.router.navigate(['confirm-phrase-password'], {
      relativeTo: this.route.parent,
    }).then();
  }

}
