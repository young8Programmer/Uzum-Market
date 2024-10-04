import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
