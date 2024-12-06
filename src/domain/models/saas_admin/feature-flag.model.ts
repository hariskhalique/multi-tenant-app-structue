export class FeatureFlag {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isEnable: boolean,
  ) {}
}
