import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart_item.entity';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class StoreOwnersService {
  constructor(
    @InjectRepository(CartItem)
    private storeOwnersRepository: Repository<CartItem>,
    private userService: UserService,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const user = await this.userService.findOne(createCartItemDto.user_id);
    if (!user) {
      throw new NotFoundException(
        `ID ${createCartItemDto.user_id} bo'lgan foydalanuvchi topilmadi`,
      );
    }

    const existingItem = await this.storeOwnersRepository.findOne({
      where: {
        user_id: createCartItemDto.user_id,
        product_id: createCartItemDto.product_id,
      },
    });

    if (existingItem) {
      throw new ConflictException(
        "Ushbu mahsulot ushbu foydalanuvchi uchun allaqachon qo'shilgan",
      );
    }

    const storeOwner = this.storeOwnersRepository.create(createCartItemDto);
    return this.storeOwnersRepository.save(storeOwner);
  }

  async findAll(): Promise<CartItem[]> {
    return this.storeOwnersRepository.find();
  }

  async findOne(id: number): Promise<CartItem> {
    const storeOwner = await this.storeOwnersRepository.findOne({
      where: { id },
    });
    if (!storeOwner) {
      throw new NotFoundException(`ID ${id} bo'lgan do'kon egasi topilmadi`);
    }
    return storeOwner;
  }

  async update(
    id: number,
    UpdateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    const storeOwner = await this.findOne(id);

    if (UpdateCartItemDto.user_id) {
      const user = await this.userService.findOne(UpdateCartItemDto.user_id);
      if (!user) {
        throw new NotFoundException(
          `ID ${UpdateCartItemDto.user_id} bo'lgan foydalanuvchi topilmadi`,
        );
      }
    }

    Object.assign(storeOwner, UpdateCartItemDto);
    return this.storeOwnersRepository.save(storeOwner);
  }

  async remove(id: number): Promise<void> {
    const storeOwner = await this.findOne(id);
    await this.storeOwnersRepository.remove(storeOwner);
  }
}
