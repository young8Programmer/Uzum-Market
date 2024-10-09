import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutUsDto } from './create-about_us.dto';

export class UpdateAboutUsDto extends PartialType(CreateAboutUsDto) {}
