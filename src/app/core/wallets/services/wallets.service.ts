import { Injectable } from '@angular/core';
import { Keypair } from 'stellar-base';
import { randomBytes, createHash } from 'crypto';

import { CryptoService } from '~root/core/crypto/services/crypto.service';
import {
  createWallet,
  createWalletsAccount,
  HorizonApisQuery, IHorizonApi,
  IWallet,
  IWalletsAccount,
  WalletsAccountsStore,
  WalletsStore,
} from '~root/state';
import { MnemonicPhraseService } from '~root/core/wallets/services/mnemonic-phrase.service';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {

  constructor(
    private readonly walletsStore: WalletsStore,
    private readonly walletsAccountsStore: WalletsAccountsStore,
    private readonly cryptoService: CryptoService,
    private readonly mnemonicPhraseService: MnemonicPhraseService,
    private readonly horizonApisQuery: HorizonApisQuery,
  ) { }

  async generateNewWallet(params: INewWalletType): Promise<string> {
    const activeHorizonApi = this.horizonApisQuery.getActive() as IHorizonApi;
    let keypair: Keypair;
    let newWallet: IWallet;
    let newWalletAccount: IWalletsAccount;
    const newWalletId: string = randomBytes(4).toString('hex');

    switch (params.type) {
      case 'mnemonic_phrase':
        keypair = await this.mnemonicPhraseService.getKeypairFromMnemonicPhrase(params.mnemonicPhrase, params.path);
        newWallet = createWallet({
          _id: newWalletId,
          type: 'mnemonic_phrase',
          name: newWalletId,
          mnemonicPhrase: this.cryptoService.encryptText(params.mnemonicPhrase, params.password),
        });

        newWalletAccount = createWalletsAccount({
          _id: createHash('md5')
            .update(`${activeHorizonApi.networkPassphrase}_${keypair.publicKey()}`)
            .digest('hex'),
          publicKey: keypair.publicKey(),
          secretKey: this.cryptoService.encryptText(keypair.secret(), params.password),
          streamCreated: false,
          name: randomBytes(4).toString('hex'),
          walletId: newWalletId,
          operationsStreamCreated: false,
          isCreated: false,  // We assume all accounts aren't created but then if it's actually created, we just set it correctly
        });

        this.walletsStore.upsert(newWallet._id, newWallet);
        this.walletsAccountsStore.upsert(newWalletAccount._id, newWalletAccount);
        break;

      default:
        throw new Error(`Can't handle wallet type`);
    }

    this.walletsStore.setActive(newWallet._id);
    this.walletsAccountsStore.setActive(newWalletAccount._id);

    return keypair.publicKey();
  }

  savePasswordHash(password: string): void {
    const hash = this.cryptoService.hashPassword(password);
    this.walletsStore.update(state => ({
      ...state,
      globalPasswordHash: hash,
    }));
  }

  updateWalletName(walletId: IWallet['_id'], name: string): void {
    this.walletsStore.upsert(walletId, { name });
  }

  async removeWallets(walletId: Array<IWallet['_id']>): Promise<void> {
    this.walletsStore.remove(walletId);
  }
}

export type INewWalletType = INewWalletMnemonicPhraseType;

export interface INewWalletMnemonicPhraseType {
  type: 'mnemonic_phrase';
  mnemonicPhrase: string;
  password: string;
  path?: string;
}
