import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateAdministratorDto,
  UpdateAdministratorDto,
} from '../dtos/administrator.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdministratorService } from '../services/administrator.service';

@ApiTags('Administrator')
@Controller('administrator')
export class AdministratorController {
  constructor(private administratorService: AdministratorService) {}

  @Get()
  findAll() {
    console.log('Entro al get de admnistrador');
    return this.administratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administratorService.findOne(id);
  }

  @Get('correo/:correo')
  findOneByMail(@Param('correo') correo: string) {
    return this.administratorService.findOneByMail(correo);
  }
  @Get('idDiscord/:discord_id')
  findOneByDiscordID(@Param('discord_id') discord_id: string) {
    console.log(discord_id);
    return this.administratorService.findOneByDiscordID(discord_id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateAdministratorDto) {
    console.log('id: ' + id);
    console.log('datos: ' + payload.discord_id);
    return this.administratorService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administratorService.remove(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  // @UsePipes(new ValidationPipe({ transform: true }))
  createAdministrator(@Body() payload: CreateAdministratorDto) {
    console.log('payload admnistrador: ', payload);
    return this.administratorService.createAdministrator(payload);
  }
}
