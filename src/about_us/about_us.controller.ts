import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about_us.dto';
import { AboutUsService } from './about_us.service';
import { AboutUs } from './entities/about_us.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('about-us')
@UseGuards(AuthGuard, RolesGuard )
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) { }

  @Roles(UserRole.ADMIN, UserRole.STORE_OWNER)
  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './src/uploads/about-us',
        filename(req, file, callback) {
          const fileName = `${Math.round(Math.random() * 1e6)}_${Date.now()}_${file.originalname}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAboutUsDto: CreateAboutUsDto,
  ): Promise<{ message: string; aboutUs: AboutUs }> {
    try {
      if (file) createAboutUsDto.photo = file.filename;
      const aboutUs = await this.aboutUsService.create(createAboutUsDto);
      return { message: 'About Us muvaffaqiyatli yaratildi!', aboutUs };
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        'About Us yaratishda xatolik yuz berdi!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.STORE_OWNER, UserRole.MANAGER, UserRole.USER)
  @Get()
  async findAll(): Promise<{ message: string; aboutUs: AboutUs[] }> {
    try {
      const aboutUsList = await this.aboutUsService.findAll();
      return {
        message:
          aboutUsList.length > 0
            ? "Barcha About Us ma'lumotlari"
            : 'Hozircha hech qanday About Us mavjud emas!',
        aboutUs: aboutUsList,
      };
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        "About Us ma'lumotlarini olishda xatolik yuz berdi!",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.USER, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.ADMIN)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; aboutUs?: AboutUs }> {
    try {
      const aboutUs = await this.aboutUsService.findOne(+id);
      if (aboutUs) {
        return { message: `About Us #${id} topildi`, aboutUs };
      } else {
        return { message: `About Us #${id} topilmadi!` };
      }
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        `About Us #${id} ni olishda xatolik yuz berdi!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAboutUsDto: CreateAboutUsDto,
  ): Promise<{ message: string; aboutUs?: AboutUs }> {
    try {
      const updatedAboutUs = await this.aboutUsService.update(+id, updateAboutUsDto);
      if (updatedAboutUs) {
        return {
          message: `About Us #${id} yangilandi`,
          aboutUs: updatedAboutUs,
        };
      } else {
        return {
          message: `About Us #${id} topilmadi! Yangilanish amalga oshirilmadi.`,
        };
      }
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        `About Us #${id} yangilashda xatolik yuz berdi!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.STORE_OWNER)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.aboutUsService.remove(+id);
      return { message: `About Us #${id} o'chirildi` };
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        `About Us #${id} ni o'chirishda xatolik yuz berdi!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
