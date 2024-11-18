import { IsString, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDto {
  @IsString()
  readonly street: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly postalCode: string;
}

export class CreateCustomerDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @ValidateNested()
  @Type(() => AddressDto)
  readonly addresses: AddressDto[];
}
