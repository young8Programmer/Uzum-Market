import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAboutUsDto } from './dto/create-about_us.dto';
import { UpdateAboutUsDto } from './dto/update-about_us.dto';
import { AboutUs } from './entities/about_us.entity';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectRepository(AboutUs)
    private readonly aboutUsRepository: Repository<AboutUs>,
  ) {}

  async create(createAboutUsDto: CreateAboutUsDto): Promise<AboutUs> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const aboutUs = this.aboutUsRepository.create(createAboutUsDto);
    await this.aboutUsRepository.save(aboutUs);

    return aboutUs;
  }

  async findAll(): Promise<AboutUs[]> {
    return this.aboutUsRepository.find();
  }

  async findOne(id: number): Promise<AboutUs> {
    const aboutUs = await this.aboutUsRepository.findOne({ where: { id } });
    if (!aboutUs) {
      throw new NotFoundException(`About Us #${id} topilmadi!`);
    }
    return aboutUs;
  }

  async update(
    id: number,
    updateAboutUsDto: UpdateAboutUsDto,
  ): Promise<AboutUs> {
    const aboutUs = await this.findOne(id);
    const updatedAboutUs = Object.assign(aboutUs, updateAboutUsDto);
    return this.aboutUsRepository.save(updatedAboutUs);
  }

  async remove(id: number): Promise<void> {
    const aboutUs = await this.findOne(id);
    await this.aboutUsRepository.delete(aboutUs.id);
  }
}
