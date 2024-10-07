import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly CompanyRepository: Repository<Company>,
  ) {}

  async create(CreateCompanyDto: CreateCompanyDto) {
    const existingCompany = await this.findOne(CreateCompanyDto.name as any);
    if (existingCompany) {
      throw new ConflictException(
        `Company name '${CreateCompanyDto.name}' is already taken`,
      );
    }
  }

  async findAll(): Promise<Company[]> {
    return await this.CompanyRepository.find();
  }

  async findOne(id: number) {
    return await this.CompanyRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Company | undefined> {
    return await this.CompanyRepository.findOne({ where: { name } });
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.findOne(id);

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    Object.assign(company, updateCompanyDto);

    return await this.CompanyRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    await this.CompanyRepository.delete(id);
  }
}
