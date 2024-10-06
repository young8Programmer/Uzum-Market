import { IsDate, IsInt, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCouponDto {
  @IsInt()
  code: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount_percent: number;

  @IsDate()
  @Type(() => Date)
  valid_until: Date;
}
