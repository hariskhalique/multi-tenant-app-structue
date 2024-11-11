export class Address {
  constructor(
    public readonly id: string,
    public readonly street: string,
    public readonly city: string,
    public readonly postalCode: string,
  ) {}
}
