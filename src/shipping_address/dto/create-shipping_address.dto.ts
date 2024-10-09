import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateShippingAddressDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  address_line: string;

  @IsString()
  address_line2?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsNumber()
  postal_code: number;

  @IsNotEmpty()
  @IsString()
  country: string;
}
