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
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('payment')
@UseGuards(AuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    console.log('Received Payment DTO:', createPaymentDto);
    try {
      const payment = await this.paymentService.create(createPaymentDto);
      return { message: "To'lov muvaffaqiyatli amalga oshirildi!", payment };
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        "To'lov yaratishda xatolik yuz berdi!",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.USER)
  @Get()
  async findAll() {
    try {
      const payments = await this.paymentService.findAll();
      return {
        message:
          payments.length > 0
            ? "Barcha to'lovlar"
            : "Hozircha hech qanday to'lov mavjud emas!",
        payments,
      };
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        "To'lovlarni olishda xatolik yuz berdi!",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.USER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const payment = await this.paymentService.findOne(+id);
      if (payment) {
        return { message: `To'lov #${id} topildi`, payment };
      } else {
        return { message: `To'lov #${id} topilmadi!` };
      }
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        `To'lov #${id} ni olishda xatolik yuz berdi!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      const updatedPayment = await this.paymentService.update(
        +id,
        updatePaymentDto,
      );
      if (updatedPayment) {
        return { message: `To'lov #${id} yangilandi`, updatedPayment };
      } else {
        return {
          message: `To'lov #${id} topilmadi! Yangilanish amalga oshirilmadi.`,
        };
      }
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        `To'lov #${id} yangilashda xatolik yuz berdi!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.paymentService.remove(+id);
      return { message: `To'lov #${id} o'chirildi` };
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        `To'lov #${id} ni o'chirishda xatolik yuz berdi!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
