import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const user = await this.userService.findOne(createAdminDto.userId);
    if (!user) {
      throw new NotFoundException(`ID ${createAdminDto.userId} bo'lgan foydalanuvchi topilmadi`)
    }

    this.validatePermissions(createAdminDto.permissions)

    const admin = this.adminRepository.create({
      userId: createAdminDto.userId,
      permissions: createAdminDto.permissions,
    });
    return this.adminRepository.save(admin);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (updateAdminDto.userId) {
      const user = await this.userService.findOne(updateAdminDto.userId);
      if (!user) {
        throw new NotFoundException(`ID ${updateAdminDto.userId} bo'lgan foydalanuvchi topilmadi`);
      }
    }

    if (updateAdminDto.permissions) {
      this.validatePermissions(updateAdminDto.permissions)
    }

    Object.assign(admin, updateAdminDto);
    return this.adminRepository.save(admin);
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
    const invalidPermissions = permissions.filter(permission => !allowedRoles.includes(permission));

    if (invalidPermissions.length > 0) {
      throw new BadRequestException(`Quyidagi permissions to'g'ri emas: ${invalidPermissions.join(', ')}`);
    }
  }
}

