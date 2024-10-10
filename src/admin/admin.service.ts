import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private userService: UserService,
  ) { }
  

  async create(createAdminDto: CreateAdminDto) {
    try {
      const user = await this.userService.findOne(createAdminDto.userId);
      if (!user) {
        throw new NotFoundException(`ID ${createAdminDto.userId} bo'lgan foydalanuvchi topilmadi`);
      }

      const existingAdmin = await this.adminRepository.findOne({
        where: { user: { id: createAdminDto.userId } },
        })
        if(existingAdmin) {
          throw new BadRequestException(`Foydalanuvchi allaqachon admin sifatida qo'shilgan`);
        }

      this.validatePermissions(createAdminDto.permissions);

        const admin = this.adminRepository.create(createAdminDto);
        return await this.adminRepository.save(admin);
      } catch (error) {
        console.error('Error creating admin:', error);
        throw new InternalServerErrorException('Adminni yaratishda xato');
      }
    }
  

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.findOne(id);

      if (updateAdminDto.userId) {
        const user = await this.userService.findOne(updateAdminDto.userId);
        if (!user) {
          throw new NotFoundException(`ID ${updateAdminDto.userId} bo'lgan foydalanuvchi topilmadi`);
        }
      }

      if (updateAdminDto.permissions) {
        this.validatePermissions(updateAdminDto.permissions);
      }

      Object.assign(admin, updateAdminDto);
      return await this.adminRepository.save(admin);
    } catch (error) {
      console.error('Error updating admin:', error);
      throw new InternalServerErrorException('Adminni yangilashda xato');
    }
  }

  findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`ID ${id} bo'lgan admin topilmadi`);
    }
    return admin;
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    return this.adminRepository.remove(admin);
  }

  private validatePermissions(permissions: string[]) {
    const allowedRoles = ['admin', 'store_owner', 'manager', 'user'];
    const invalidPermissions = permissions.filter(
      (permission) => !allowedRoles.includes(permission),
    );

    if (invalidPermissions.length > 0) {
      throw new BadRequestException(`Quyidagi permissions to'g'ri emas: ${invalidPermissions.join(', ')}`);
    }
  }


}


