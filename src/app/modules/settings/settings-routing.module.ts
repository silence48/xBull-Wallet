import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from '~root/modules/settings/settings.component';
import { RegisteredWalletsComponent } from '~root/modules/settings/pages/registered-wallets/registered-wallets.component';
import { RegisteredWalletDetailsComponent } from '~root/modules/settings/pages/registered-wallet-details/registered-wallet-details.component';
import { WalletsAccountsComponent } from '~root/modules/settings/pages/wallets-accounts/wallets-accounts.component';
import { HorizonApisComponent } from '~root/modules/settings/pages/horizon-apis/horizon-apis.component';
import { SitesConnectedComponent } from '~root/modules/settings/pages/sites-connected/sites-connected.component';
import { AboutComponent } from '~root/modules/settings/pages/about/about.component';
import { ActiveOperationsTypesComponent } from '~root/modules/settings/pages/active-operations-types/active-operations-types.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SettingsComponent,
  },
  {
    path: 'wallets',
    component: RegisteredWalletsComponent,
  },
  {
    path: 'wallets/:walletId',
    component: RegisteredWalletDetailsComponent,
  },
  {
    path: 'wallets/:walletId/accounts',
    component: WalletsAccountsComponent,
  },
  {
    path: 'horizon-apis',
    component: HorizonApisComponent,
  },
  {
    path: 'active-operations-types',
    component: ActiveOperationsTypesComponent,
  },
  {
    path: 'sites-connected',
    component: SitesConnectedComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
