import { IsInt, IsNumber, IsDate, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDiscountDto {
  @IsInt()
  product_id: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount_percent: number;

  @IsDate()
  @Type(() => Date)
  valid_until: Date;
}
