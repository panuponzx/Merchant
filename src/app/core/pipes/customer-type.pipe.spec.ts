import { CustomerTypePipe } from './customer-type.pipe';

describe('CustomerTypePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomerTypePipe();
    expect(pipe).toBeTruthy();
  });
});
