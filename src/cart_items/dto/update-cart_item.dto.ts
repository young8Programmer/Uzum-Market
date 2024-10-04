import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateCartItemDto {
  @IsOptional()
  @IsString()
  product_name?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  user_id?: number;
}
