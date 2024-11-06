import { Module } from '@nestjs/common';
import { AboutUsService } from './about_us.service';
import { AboutUsController } from './about_us.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUs } from './entities/about_us.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUs]), JwtModule],
  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}
