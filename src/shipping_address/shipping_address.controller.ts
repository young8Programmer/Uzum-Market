import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ShippingAddressService } from './shipping_address.service';
import { CreateShippingAddressDto } from './dto/create-shipping_address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping_address.dto';
import { ShippingAddress } from './entities/shipping_address.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('shipping-address')
@UseGuards(AuthGuard, RolesGuard)
export class ShippingAddressController {
  constructor(
    private readonly shippingAddressService: ShippingAddressService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(
    @Body() createShippingAddressDto: CreateShippingAddressDto,
  ): Promise<{ message: string }> {
    try {
      await this.shippingAddressService.create(createShippingAddressDto);
      return { message: 'Shipping address successfully created!' };
    } catch {
      throw new HttpException(
        'Failed to create shipping address!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.USER)
  @Get()
  async findAll(): Promise<{ message: string; data: ShippingAddress[] }> {
    try {
      const addresses = await this.shippingAddressService.findAll();
      return {
        message:
          addresses.length > 0
            ? 'All shipping addresses retrieved!'
            : 'No addresses found!',
        data: addresses,
      };
    } catch {
      throw new HttpException(
        'Failed to retrieve shipping addresses!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.USER)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; data: ShippingAddress | null }> {
    try {
      const address = await this.shippingAddressService.findOne(+id);
      return { message: 'Shipping address found!', data: address };
    } catch {
      throw new HttpException(
        'Failed to retrieve the shipping address!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShippingAddressDto: UpdateShippingAddressDto,
  ): Promise<{ message: string }> {
    try {
      await this.shippingAddressService.update(+id, updateShippingAddressDto);
      return { message: 'Shipping address successfully updated!' };
    } catch {
      throw new HttpException(
        'Failed to update the shipping address!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.shippingAddressService.remove(+id);
      return { message: 'Shipping address successfully deleted!' };
    } catch {
      throw new HttpException(
        'Failed to delete the shipping address!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
