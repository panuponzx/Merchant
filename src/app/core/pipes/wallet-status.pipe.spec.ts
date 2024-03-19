import { WalletStatusPipe } from './wallet-status.pipe';

describe('WalletStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new WalletStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
