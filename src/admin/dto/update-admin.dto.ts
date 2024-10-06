import {
  IsNumber,
  IsArray,
  IsString,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';


export class UpdateAdminDto {
  @IsNumber()
  userId?: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  permissions?: string[];
}
