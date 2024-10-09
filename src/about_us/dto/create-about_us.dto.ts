import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAboutUsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  mission: string;

  @IsNotEmpty()
  @IsString()
  values: string;

  @IsNotEmpty()
  @IsString()
  history: string;

  @IsNotEmpty()
  @IsString()
  team: string;

  photo: string;
}
