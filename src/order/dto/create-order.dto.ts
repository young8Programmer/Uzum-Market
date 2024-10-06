import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsString,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsDateString()
  order_date: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  total_amount: number;
}
