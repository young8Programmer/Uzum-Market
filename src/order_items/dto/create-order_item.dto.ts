import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
    @IsNotEmpty()
    @IsNumber()
    order_id: number; 

    @IsNotEmpty()
    @IsNumber()
    product_id: number; 

    @IsNotEmpty()
    @IsNumber()
    @IsPositive() // Quantity manfiy bo'lmasligi kerak
    quantity: number; 

    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2' }) // Ikkita onlik raqamli narx
    price: number; 

    @IsOptional() 
    @IsString()
    color?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive() // Number manfiy bo'lmasligi kerak
    number?: number; 
}
