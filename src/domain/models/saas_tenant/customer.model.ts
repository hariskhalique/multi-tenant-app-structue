import { Address } from './address.model';

export class Customer {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly addresses: Address[] = [],
  ) {}

  addAddress(address: Address) {
    this.addresses.push(address);
  }
}
