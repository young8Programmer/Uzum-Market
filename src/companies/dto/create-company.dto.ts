import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Company name must be at least 3 characters long.',
  })
  name: string;
}
